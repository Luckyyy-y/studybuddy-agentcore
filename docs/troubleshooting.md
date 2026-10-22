# Troubleshooting record

These notes distinguish a recorded workaround from a proven root cause. They are based on the workshop conversation, source, and saved evidence; they are not a new live AWS diagnostic run.

| Observation | Action or finding | Verification boundary |
| --- | --- | --- |
| Local port 8080 failed to bind/connect | Ran the local entrypoint on port 8081 and sent the test there | The screenshot shows a returned IAM response. The original port conflict was not conclusively diagnosed. |
| Python packages/authentication needed adjustment | Workshop moved to a Python 3.13 environment, updated SDK versions, and added `botocore[crt]` | Current requirements record the final dependencies; current AWS credentials were not refreshed for this documentation task. |
| SAM or uv was not recognized in PowerShell | Used the appropriate installed tools and WSL environment for Bash packaging | Windows and WSL do not share every installed executable or environment variable. |
| PowerShell commands were attempted in Ubuntu | Returned to PowerShell for the local Express setup | Shell syntax and paths must match the terminal being used. |
| Cloud artifact/model invocation required troubleshooting | Repackaged code/dependencies and tested runtime responses in the Console | Do not infer a single root cause for every earlier deployment error. Saved successful responses establish the later result. |
| Agent forgot a previous request | Added the memory session manager and reused the session ID | Browser VPC recall is saved. A response in one session does not prove long-term memory or user isolation. |
| Raw Markdown and occasional thinking tags appeared | UI displays response text literally; final prompt asks the model to omit internal tags | Markdown formatting remains unfinished. A prompt instruction is not a reliable output filter. |
| Time question returned a timestamp | Registered `current_time` and tested a time prompt | No saved tool execution trace; the timestamp alone does not establish tool use or accuracy. |
| SAM helper stack reported `DELETE_FAILED` | Chat deferred further cleanup pending a resource-level failure review | Complete cleanup and absence of future charges remain unverified. |

The public snapshots exclude AWS Console captures containing account identifiers. The original evidence remains in the local project folder.
