# Learning and interview notes

These are explanations to practice, not a claim that I can already reproduce the whole system independently.

## A short, accurate project explanation

> I completed a guided AWS workshop with AI help. StudyBuddy is a Python tutor agent hosted on Bedrock AgentCore, using Nova Pro and short-term conversation memory. I connected a local Express browser interface and saved a test where it recalled Amazon VPC. I worked through setup and deployment problems, and preserved the project as documentation rather than a public chatbot. Authentication, session-isolation testing, and production cost controls would need more work before public release.

## Explain the pieces

| Question | Explanation to understand |
| --- | --- |
| What is Bedrock doing? | Providing managed access to the model that generates the answer. |
| What is Strands doing? | Running the agent logic around the model, prompt, session manager, and registered tools. |
| What is AgentCore Runtime doing? | Hosting and invoking the Python application in AWS. The earlier local SDK server was a different stage. |
| Why is Express between the browser and AWS? | It handles the signed SDK request using server-side AWS credentials rather than embedding them in browser JavaScript. |
| Why reuse a session ID? | It lets the memory session manager associate later messages with the same conversation. |
| Is it training a model or doing RAG? | Neither is shown here. It uses a prompt, an existing model, and short-term conversation events. |
| What did S3 do? | Stored the packaged code and dependencies for deployment; it did not run the agent. |
| What did I personally do? | Followed the guided workflow, ran and tested it, shared errors, and directed the learning process. AI supplied substantial code and troubleshooting. |

## Trace a message

Say this in your own words: the browser posts a message to Express; Express sends a signed runtime invocation; the Python agent uses its memory session manager and Nova Pro; the result comes back through Express to the browser. Credentials stay out of browser code, but user authentication is still missing.

## Three useful lessons

1. A local application can call a cloud model; that is different from hosting the application in the cloud.
2. A successful answer or a current-time sentence does not prove factual correctness or tool execution. Keep the evidence and the claim separate.
3. Stopping a terminal stops that local process. It does not prove that cloud resources and ongoing charges are gone.

## Questions to practice before an interview

- Which files did AI supply, and which steps did I run or test?
- How did the browser test demonstrate recall, and what would a stronger isolation test look like?
- Why was changing to port 8081 a workaround rather than a diagnosis?
- What would need to change before strangers could safely use this service?

If I cannot explain a detail, I should describe it as guided exposure and refer to the documented source rather than claim independent proficiency.
