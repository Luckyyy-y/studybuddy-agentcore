# Origin, attribution, and published scope

## Workshop foundation

This project follows **Build an AI Agent with AWS Bedrock AgentCore: Student Guide**, dated October 18, 2026, and the workshop attributed to Andres in the StudyBuddy learning conversation. The local guide links to [andmoredev/study-buddy](https://github.com/andmoredev/study-buddy). Reference head checked during review: `8ad1fb9fc181cbc02773085b6e000e69ec4352ae`. This identifies the inspected reference version, not a claim that the local project was cloned at that commit.

The reference includes a larger React/Cognito/WebSocket architecture. This student implementation instead demonstrates a small local Express interface and a synchronous HTTP agent invocation. Public authentication, streaming, and other reference features are not credited as completed student work.

## Assistance

- **Gerardo Vera:** learning goals, following workshop steps, executing commands, reporting errors, testing, supplying evidence, and deciding how to present the result.
- **Workshop and reference materials:** the underlying architecture, exercises, and reference backend patterns.
- **ChatGPT:** substantial code generation/adaptation, environment guidance, troubleshooting, explanations, and milestone documentation drafts.
- **Kiro:** editor and terminal used for the workshop. No claim that Kiro independently generated this StudyBuddy implementation.
- **Codex:** reviewed available chat content and local files; created this documentation, safe publication snapshot, and portfolio project entry. Local application source was preserved rather than redesigned.

## Included

The Python agent, requirements, recreated packaging companion, Express UI source/lockfile, three unchanged screenshots, and documentation. Exact copied-source hashes and screenshot filename mappings are in [source-manifest.json](../source-manifest.json).

The helper `invoke_agent.example.py` is a publication-only adaptation: it reads the runtime ARN from an environment variable instead of publishing the account-specific value from the local invocation script. It was not used to rerun AWS during documentation preparation.

## Excluded

- Virtual environments, dependency folders, generated deployment archives, `.aws-sam`, zero-byte accidental command-named files, and caches.
- Raw chat exports, authentication information, AWS account identifiers, and private deployment configuration.
- Console captures containing account details; originals remain local.
- The guide PDF and root template/OpenAPI/Lambda reference helpers. The upstream reference had no detected repository license during review; these unnecessary reference copies are linked rather than republished or relicensed here.

The repository is a documented student snapshot, not a complete distribution of the workshop's full deployment stack. Original reference material remains subject to its author's terms. No blanket license is asserted for third-party material.
