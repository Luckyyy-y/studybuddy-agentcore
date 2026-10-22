# Setup and controlled rerun notes

## Safe local inspection

You can read all documentation and screenshots without AWS access. Check the frontend syntax without sending model requests:

```powershell
cd frontend
npm ci --ignore-scripts
npm run check
```

The published source snapshot targets the workshop environment: Python 3.13 for the cloud package and Node.js for Express. The original guide begins at Python 3.10+, but the final code and packaging were updated during troubleshooting. Core Python versions are pinned in `requirements.txt`; not every transitive dependency or tool package is locked.

## Before trying a real conversation

The documented cloud demo is not an advertised live endpoint. A future live test needs an AWS account, authorized Nova Pro access, a configured AgentCore Runtime and Memory resource in `us-east-1`, and an appropriately scoped **non-root** development identity. A profile name alone does not establish its permissions. Model, runtime, memory, storage, and logging usage may incur charges.

The root-level AWS template and backend reference helpers from the local workshop folder are not republished here. See [provenance](provenance.md) and the [upstream reference](https://github.com/andmoredev/study-buddy). Treat the source snapshot as a record of the demo, not a complete one-command deployment distribution.

## Start the local browser interface with an existing runtime

After configuring your own non-root AWS profile and an authorized runtime:

```powershell
$env:AWS_PROFILE = 'YOUR_NON_ROOT_PROFILE'
$env:AWS_REGION = 'us-east-1'
$env:AGENT_RUNTIME_ARN = 'YOUR_OWN_RUNTIME_ARN'
cd frontend
npm ci --ignore-scripts
npm start
```

Replace the placeholder values; do not paste credentials into source. Open `http://127.0.0.1:3000`. Do not expose this local server through a tunnel or public port as-is. It has no user authentication or rate limiting.

## Memory and test messages

The deployed Python agent requires `AGENTCORE_MEMORY_ID` in its runtime environment. Setting it only in the Express shell does not configure the remote agent. Without it, the handler returns a configuration error. A fresh local Python run also requires this resource; the earlier pre-memory IAM test is a historical milestone, not a memory-free mode in the final code.

For a future controlled test:

1. Say, "My favorite AWS service is Amazon VPC."
2. Ask, "What is my favorite AWS service?" using the same conversation.
3. Start New Chat and repeat the question to test separation. Record the result rather than assuming it passes.
4. Ask for Houston time and inspect actual tool logs, not only the generated answer.

## Packaging companion

From a suitable Bash/WSL environment, `./package-and-upload.sh --package-only` prepares a Python 3.13 Linux ARM64 ZIP without AWS writes. It installs dependencies from package registries and is not an offline check. Passing a bucket name instead performs an upload; the script refuses a root upload identity. It does not deploy the stack or prove that all policies are least-privilege.

## Stopping and cleanup

Ctrl+C stops the local server; it does not remove AWS resources. For any future deployment, review that project's CloudFormation resources, retained storage/logs, and billing before claiming cleanup. Check the exact failure reason before retrying a failed deletion, and do not remove shared SAM resources used by other projects. No cleanup was performed by this documentation pass.
