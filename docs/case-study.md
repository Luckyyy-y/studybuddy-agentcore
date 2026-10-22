# StudyBuddy case study

## Problem and scope

I wanted to complete a guided cloud AI workshop and understand how an agent can move from a local Python endpoint to AWS, keep a conversation, and answer through a browser. The result is a workshop prototype with recorded evidence, not a public tutoring product.

## My contribution

I followed the workshop with AI guidance, ran setup and deployment steps, shared failures and screenshots, tested the responses, and chose to preserve the completed work while reducing cloud costs. I worked through a tutor prompt, conversation memory, a current-time tool, and a local chat interface.

ChatGPT supplied substantial implementation and troubleshooting assistance. I do not claim that I independently wrote the Python/JavaScript implementation or designed the underlying AWS architecture. Codex's later work is documentation, source preparation, and portfolio integration, rather than a new chatbot implementation.

## What changed from the starting exercise

The first exercise accepted a request and created a Strands agent. The final local source explicitly selects `us.amazon.nova-pro-v1:0`, uses an educational prompt, loads AgentCore memory configuration, passes a session manager to Strands, and registers `current_time`. The local Express UI signs AWS requests on the server and reuses a session ID between browser messages.

## Decisions and tradeoffs

| Decision | Reason and tradeoff |
| --- | --- |
| Keep the final UI on localhost | Demonstrated integration without publishing credentials or an unfinished shared service. It still needs AWS access to answer. |
| Use short-term memory | Preserves turns in a conversation. It is not a knowledge base, model training, or a verified long-term user profile. |
| Render responses with `textContent` | Avoids executing model-generated HTML; Markdown remains visibly unformatted. |
| Preserve a documented demo instead of a public endpoint | Makes the work reviewable without restoring cloud resources for every visitor. It does not prove all cleanup completed. |
| Link to the larger reference implementation | Keeps public authentication and streaming features distinct from what this prototype actually demonstrated. |

## Evidence and results

The local endpoint returned an IAM explanation after the test moved from port 8080 to 8081. Saved AWS Console captures show tutor, memory, and time responses. The strongest public evidence is the browser conversation recalling Amazon VPC; see [verification](verification.md) for exact scope and screenshots.

A generated study answer incorrectly expands CCP, and raw Markdown is visible. Those are useful limitations to record: connecting a model successfully does not establish that its answers are reliable or the interface is finished.

## Remaining work

Before any public release: replace root-based development access with an appropriately scoped non-root identity, authenticate users, bind their identity to memory, verify session isolation, add request/cost controls, improve safe response rendering, and collect tool traces and factual evaluations. These are future tasks, not completed security features.
