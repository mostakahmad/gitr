import { connectToDatabase } from '@/lib/mongoose';
import Chat from '@/models/Chat';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const { sessionId } = req.query;
  await connectToDatabase();
  const chat = await Chat.findOne({ sessionId });
  res.status(200).json(chat?.messages || []);
}