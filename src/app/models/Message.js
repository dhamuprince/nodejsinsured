import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = Schema({
  message: { type: String, required: true },
  insertedAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;