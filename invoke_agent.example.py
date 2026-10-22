"""Manual invocation example for a separately configured workshop runtime.

This publication copy removes the local script's account-specific ARN.
Running it sends a real AWS request and can incur charges.
"""
import json
import os
import uuid

import boto3


def main():
    runtime_arn = os.environ.get("AGENT_RUNTIME_ARN")
    if not runtime_arn:
        raise SystemExit("Set AGENT_RUNTIME_ARN to your own authorized runtime first.")
    session_id = str(uuid.uuid4())
    client = boto3.client("bedrock-agentcore", region_name="us-east-1")
    response = client.invoke_agent_runtime(
        agentRuntimeArn=runtime_arn,
        runtimeSessionId=session_id,
        payload=json.dumps({
            "request": "Explain machine learning in simple terms",
            "session_id": session_id,
        }).encode("utf-8"),
    )
    body = response["response"]
    try:
        data = json.loads(body.read())
    finally:
        body.close()
    print(data.get("response", data))


if __name__ == "__main__":
    main()
