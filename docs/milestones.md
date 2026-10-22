# Workshop milestones

The student guide has seven steps. The chat grouped steps 1 and 2 into a first local milestone, then used six milestone checkpoints overall. This table records the progression without treating instructions alone as proof of completion.

| Guide step | Work reviewed | Evidence and limits |
| --- | --- | --- |
| 1. First agent | Python AgentCore entrypoint and Strands response | Local screenshot shows an IAM response; PowerShell truncates the returned text. |
| 2. Specific model | Explicit Nova Pro selection | Final source uses `us.amazon.nova-pro-v1:0`; this differs from the guide's direct model ID. |
| 3. Cloud deployment | Dependency packaging, S3 artifact, SAM/CloudFormation, runtime invocation | Saved console responses support cloud invocation. This documentation pass did not redeploy or independently confirm stack deletion. |
| 4. Tutor purpose | Educational system prompt | Source contains teaching instructions; saved console response explains Lambda. A prompt is not an accuracy guarantee. |
| 5. Memory | Session manager and stable session ID | Console and browser recall examples were reviewed. No long-term memory or isolated-user test is claimed. |
| 6. Tool | `current_time` registration and time question | A timestamp response was captured; separate tool-call tracing remains missing. |
| 7. Chat UI | Browser → local Express → AWS runtime | Public screenshots show a response and VPC recall. Browser access was local, not public hosting. |

## After the workshop

The conversation moved to removing cloud resources to reduce costs. The final visible cleanup note reports `DELETE_FAILED` for the SAM-managed helper stack. It does not independently confirm successful deletion of every application resource, retained bucket, log, or memory resource. The portfolio offers evidence and source, without a live-chat link.
