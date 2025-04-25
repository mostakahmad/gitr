import { connectToDatabase } from '@/lib/mongoose';
import Chat from '@/models/Chat';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { sessionId, userMessage } = req.body;
  await connectToDatabase();
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model: "openchat/openchat-3.5-0106", messages: [{ role: 'user', content: userMessage }] })
  });
  const data = await response.json();
  const botReply = data.choices?.[0]?.message?.content || "Sorry, I can't answer that.";
  let chat = await Chat.findOne({ sessionId });
  if (!chat) chat = new Chat({ sessionId, messages: [] });
  chat.messages.push({ sender: 'user', message: userMessage });
  chat.messages.push({ sender: 'bot', message: botReply });
  await chat.save();
  res.status(200).json({ reply: botReply });
}