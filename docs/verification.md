# Verification and evidence

Reviewed October 21, 2026. This record separates historical demo evidence from checks made while preparing the repository.

## Historical workshop evidence

| Evidence | What is visible | What it does not establish |
| --- | --- | --- |
| [Local agent response](images/local-agent-response.png) | Failed 8080 request followed by a returned IAM explanation from port 8081 | Full answer correctness; cloud-hosted runtime at that early stage; root cause of port failure |
| [Browser memory recall](images/browser-memory-recall.png) | Assistant answers that the favorite AWS service is Amazon VPC | Full memory event audit, isolated users, independent-session separation, or a live public endpoint |
| [Browser study response](images/browser-study-response.png) | AWS-connected local UI displays a generated study response and raw Markdown | Factual reliability: the answer incorrectly expands CCP; polished rendering |

Console screenshots in the local folder were also reviewed for tutor responses, recall of networking, and a Houston time response. They contain AWS account details, so they are not published. Tool-call logs were not separately captured. A time response is not sufficient proof of successful `current_time` invocation.

The two browser screenshots had misleading original milestone filenames. They are renamed here according to their actual visible content; their image bytes are unchanged. `source-manifest.json` records the mapping and SHA-256 values.

## Repository preparation checks

See [preparation check results](preparation-checks.json) for the recorded result of JavaScript syntax checks, Python parsing, relative documentation/image links, screenshot/source hash comparison, and recognized credential/account-identifier pattern checks. These are offline/source checks and do not invoke a model, provision infrastructure, or verify a live cloud deployment.

Selected screenshots were visually inspected. Pattern checks cannot prove every secret is absent. Virtual environments, `node_modules`, deployment ZIPs, `.aws-sam`, local account-specific invocation code, and raw chat exports are excluded.

## Current service and cleanup status

There is no public demo URL for this project. After finishing the browser test, I chose cloud cleanup to reduce costs. The visible conversation ends with a SAM helper stack in `DELETE_FAILED`. Neither that failure nor the cleanup instructions prove all other resources were deleted. This repository makes no zero-cost or complete-teardown claim. No cloud resources were restored, changed, or deleted while preparing this documentation.

## Not yet verified

- Fresh end-to-end AWS redeployment from this repository.
- New Chat isolation and behavior across different authenticated users.
- Tool execution traces and clock correctness.
- Consistent suppression of thinking tags and safe formatted Markdown.
- Answer accuracy over a test set, latency, reliability, accessibility, or load limits.
- Production IAM, authentication, logging/privacy controls, request limits, or remaining billing.
