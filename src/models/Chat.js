import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({ sender: String, message: String, createdAt: { type: Date, default: Date.now } });
const ChatSchema = new mongoose.Schema({ sessionId: String, messages: [MessageSchema] });
export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema);