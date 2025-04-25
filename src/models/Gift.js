import mongoose from 'mongoose';

const GiftSchema = new mongoose.Schema({
  productIndex: { type: Number, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  month: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Gift || mongoose.model('Gift', GiftSchema);
