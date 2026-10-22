'use strict';

const messages = document.getElementById('messages');
const welcome = document.getElementById('welcome');
const form = document.getElementById('chat-form');
const input = document.getElementById('message');
const send = document.getElementById('send');
const status = document.getElementById('status');
let sessionId = sessionStorage.getItem('studybuddy-session') || crypto.randomUUID();
let busy = false;
sessionStorage.setItem('studybuddy-session', sessionId);

function appendMessage(role, text) {
  if (welcome?.isConnected) welcome.remove();
  const item = document.createElement('div');
  item.className = `message ${role}`;
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'user' ? 'Y' : '✳';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text; // Prevent injected HTML or scripts from AI responses.
  item.append(avatar, bubble);
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
  return item;
}

async function submitMessage(text) {
  const message = text.trim();
  if (!message || busy) return;
  busy = true;
  send.disabled = true;
  status.className = 'footnote';
  input.value = '';
  appendMessage('user', message);
  const pending = appendMessage('agent', 'Thinking…');
  status.textContent = 'StudyBuddy is responding…';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    pending.querySelector('.bubble').textContent = data.response;
    sessionId = data.sessionId;
    sessionStorage.setItem('studybuddy-session', sessionId);
    status.textContent = 'Connected to Amazon Bedrock AgentCore';
  } catch (error) {
    pending.querySelector('.bubble').textContent = 'Unable to contact StudyBuddy. ' + error.message;
    status.textContent = 'Connection error. Check Kiro’s server terminal.';
    status.className = 'footnote error';
  } finally {
    busy = false;
    send.disabled = false;
    input.focus();
    messages.scrollTop = messages.scrollHeight;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  submitMessage(input.value);
});
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    submitMessage(input.value);
  }
});

document.querySelectorAll('[data-prompt]').forEach((button) => {
  button.addEventListener('click', () => submitMessage(button.dataset.prompt));
});
function newChat() {
  if (busy) return;
  sessionId = crypto.randomUUID();
  sessionStorage.setItem('studybuddy-session', sessionId);
  messages.replaceChildren();
  appendMessage('agent', 'New conversation started. What would you like to learn?');
  status.className = 'footnote';
  status.textContent = 'New session created. Previous conversation history is not loaded.';
  input.focus();
}
document.getElementById('new-chat-side').addEventListener('click', newChat);
document.getElementById('new-chat-top').addEventListener('click', newChat);
