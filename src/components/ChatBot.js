'use client';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    let id = localStorage.getItem('chat-session-id');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('chat-session-id', id);
    }
    setSessionId(id);
    fetch(`/api/chat/history?sessionId=${id}`)
      .then(res => res.json())
      .then(setMessages);
  }, []);

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = { sender: 'user', message: input };
    setMessages([...messages, userMsg]);
    setInput('');
    const res = await fetch('/api/chat/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, userMessage: input })
    });
    const data = await res.json();
    const botMsg = { sender: 'bot', message: data.reply };
    setMessages(msgs => [...msgs, botMsg]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', border: '1px solid #ddd', borderRadius: '10px', padding: '20px', backgroundColor: '#fff5f9' }}>
      <h3 style={{ textAlign: 'center', color: '#e91e63' }}>Ask Anything 💬</h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', padding: '8px 12px', backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#fce4ec', borderRadius: '8px', margin: '5px 0' }}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px 0 0 5px', border: '1px solid #ccc' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px', backgroundColor: '#e91e63', color: '#fff', border: 'none', borderRadius: '0 5px 5px 0' }}>
          Send
        </button>
      </div>
    </div>
  );
}