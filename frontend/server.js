'use strict';

const path = require('node:path');
const express = require('express');
const { randomUUID } = require('node:crypto');
const {
  BedrockAgentCoreClient,
  InvokeAgentRuntimeCommand,
} = require('@aws-sdk/client-bedrock-agentcore');

const app = express();
const host = '127.0.0.1'; // Local-only: do not expose this workshop app to the Internet.
const port = 3000;
const region = process.env.AWS_REGION || 'us-east-1';
const runtimeArn = process.env.AGENT_RUNTIME_ARN;

if (!runtimeArn || !/^arn:aws:bedrock-agentcore:us-east-1:\d{12}:runtime\//.test(runtimeArn)) {
  console.error('Missing/invalid AGENT_RUNTIME_ARN. Copy the complete Runtime ARN from AWS AgentCore Runtime in us-east-1.');
  process.exit(1);
}

const client = new BedrockAgentCoreClient({ region });
app.disable('x-powered-by');
app.use(express.json({ limit: '12kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  const message = req.body?.message;
  let sessionId = req.body?.sessionId;

  if (typeof message !== 'string' || message.trim().length < 1 || message.length > 3000) {
    return res.status(400).json({ error: 'Enter a message between 1 and 3,000 characters.' });
  }
  if (sessionId === undefined || sessionId === null) sessionId = randomUUID();
  if (typeof sessionId !== 'string' || !/^[0-9a-fA-F-]{36}$/.test(sessionId)) {
    return res.status(400).json({ error: 'Invalid conversation session ID.' });
  }

  try {
    const command = new InvokeAgentRuntimeCommand({
      agentRuntimeArn: runtimeArn,
      runtimeSessionId: sessionId,
      qualifier: 'DEFAULT',
      contentType: 'application/json',
      accept: 'application/json',
      payload: Buffer.from(JSON.stringify({
        request: message.trim(),
        session_id: sessionId,
        user_id: 'workshop-student',
      }), 'utf8'),
    });

    const result = await client.send(command);
    if (!result.response) throw new Error('Empty AgentCore response stream');
    const bodyText = await result.response.transformToString();
    const agentResult = JSON.parse(bodyText);
    if (typeof agentResult.response !== 'string') {
      throw new Error('AgentCore returned no response text');
    }
    res.json({ response: agentResult.response, sessionId });
  } catch (err) {
    console.error('AgentCore request failed:', err.name || 'Error', err.message || err);
    res.status(502).json({ error: 'StudyBuddy could not respond. Check the server terminal and AWS credentials.' });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON request.' });
  }
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request too large.' });
  }
  next(err);
});

app.listen(port, host, () => {
  console.log(`StudyBuddy chat is ready at http://${host}:${port}`);
  console.log(`AWS profile: ${process.env.AWS_PROFILE || '(default)'} | Region: ${region}`);
  console.log('Only open this local server on your own computer.');
});
