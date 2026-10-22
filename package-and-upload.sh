#!/usr/bin/env bash
# Recreated companion to the AgentCore workshop Step 3 packaging instructions.
# This is not a verbatim file from the facilitator's GitHub repository.
# Usage:
#   ./package-and-upload.sh --package-only
#   ./package-and-upload.sh YOUR_PRIVATE_S3_BUCKET
# Optional: AGENT_SOURCE_DIR=/path/to/agent ./package-and-upload.sh --package-only

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="${AGENT_SOURCE_DIR:-$SCRIPT_DIR}"
REGION="${AWS_REGION:-${AWS_DEFAULT_REGION:-us-east-1}}"
MODE="${1:-}"

if [[ "$MODE" != "--package-only" && -z "$MODE" ]]; then
  echo "Usage: $0 --package-only | YOUR_PRIVATE_S3_BUCKET" >&2
  exit 2
fi

for command_name in uv zip python3; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Missing '$command_name' in this Bash environment." >&2
    exit 1
  fi
done

for filename in agent.py requirements.txt; do
  if [[ ! -f "$SOURCE_DIR/$filename" ]]; then
    echo "Missing $SOURCE_DIR/$filename" >&2
    exit 1
  fi
done

# Refuse root AWS authentication before any S3 operation.
if [[ "$MODE" != "--package-only" ]]; then
  if ! command -v aws >/dev/null 2>&1; then
    echo "Missing AWS CLI in this Bash environment." >&2
    exit 1
  fi
  IDENTITY_ARN="$(aws sts get-caller-identity --query Arn --output text --region "$REGION")"
  if [[ "$IDENTITY_ARN" == *":root" ]]; then
    echo "Refusing S3 upload with root credentials. Configure a non-root AWS profile first." >&2
    exit 1
  fi
  echo "AWS upload identity: $IDENTITY_ARN"
fi

STAGING_DIR="$(mktemp -d)"
trap 'rm -rf -- "$STAGING_DIR"' EXIT

printf 'Packaging Python 3.13 dependencies for Linux ARM64...\n'
uv pip install \
  --python-platform aarch64-manylinux2014 \
  --python-version 3.13 \
  --target "$STAGING_DIR" \
  --only-binary=:all: \
  --no-compile \
  -r "$SOURCE_DIR/requirements.txt"

cp -- "$SOURCE_DIR/agent.py" "$STAGING_DIR/agent.py"
find "$STAGING_DIR" -type d -exec chmod 755 {} +
find "$STAGING_DIR" -type f -exec chmod 644 {} +

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
ZIP_FILE="$SCRIPT_DIR/study-buddy-agent-$STAMP.zip"
(cd "$STAGING_DIR" && zip -q -r "$ZIP_FILE" . -x '*/__pycache__/*' '*.pyc')

python3 - "$ZIP_FILE" <<'PY'
import pathlib
import sys
import zipfile

path = pathlib.Path(sys.argv[1])
with zipfile.ZipFile(path) as archive:
    if 'agent.py' not in archive.namelist():
        raise SystemExit('ERROR: agent.py missing at ZIP root')
    uncompressed = sum(item.file_size for item in archive.infolist())
    if path.stat().st_size > 250 * 1024**2 or uncompressed > 750 * 1024**2:
        raise SystemExit('ERROR: ZIP exceeds AgentCore 250 MB/750 MB package limits')
print(f'ZIP verified: {path.name} ({path.stat().st_size / 1024**2:.1f} MiB)')
PY

if [[ "$MODE" == "--package-only" ]]; then
  echo "Local package ready: $ZIP_FILE"
  echo "No AWS resources were changed."
  exit 0
fi

KEY="agents/$(basename "$ZIP_FILE")"
echo "Uploading artifact to s3://$MODE/$KEY ..."
aws s3 cp "$ZIP_FILE" "s3://$MODE/$KEY" --region "$REGION"
echo "Upload complete. Use these parameters when deploying the advanced template:"
echo "  ArtifactsBucketName=$MODE"
echo "  AgentDirectDeployKey=$KEY"
echo "  EnvironmentHash=<your-unique-environment-suffix>"
echo "Note: advanced template also requires other backend files; this script does not deploy the stack."
