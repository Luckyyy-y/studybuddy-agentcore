
import os
import uuid

from strands_tools import current_time
from bedrock_agentcore.runtime import BedrockAgentCoreApp
from bedrock_agentcore.memory.integrations.strands.config import AgentCoreMemoryConfig
from bedrock_agentcore.memory.integrations.strands.session_manager import AgentCoreMemorySessionManager
from strands import Agent
from strands.models import BedrockModel

app = BedrockAgentCoreApp()

SYSTEM_PROMPT = """
You are StudyBuddy, a friendly educational tutor.

Explain concepts clearly and step by step.
Use simple examples to help students understand.
Ask short practice questions when useful.
Encourage students to think instead of simply memorizing.
Keep explanations accurate and concise.
Do not include internal reasoning, analysis, or thinking tags in your responses.
"""

@app.entrypoint
def invoke(payload):
    request = payload.get("request", "")

    if not request:
        return {"error": "Please provide a request."}

    memory_id = os.environ.get("AGENTCORE_MEMORY_ID")

    if not memory_id:
        return {"error": "AgentCore Memory is not configured."}

    session_id = payload.get("session_id") or str(uuid.uuid4())
    actor_id = payload.get("user_id") or "workshop-student"

    memory_config = AgentCoreMemoryConfig(
        memory_id=memory_id,
        session_id=session_id,
        actor_id=actor_id,
    )

    with AgentCoreMemorySessionManager(
        agentcore_memory_config=memory_config,
        region_name="us-east-1",
    ) as session_manager:
        agent = Agent(
            agent_id="studybuddy",
            model=BedrockModel(model_id="us.amazon.nova-pro-v1:0"),
            system_prompt=SYSTEM_PROMPT,
            session_manager=session_manager,
            tools=[current_time],
        )

        result = agent(request)

    return {
        "request": request,
        "response": str(result),
        "session_id": session_id,
    }

if __name__ == "__main__":
    app.run()

