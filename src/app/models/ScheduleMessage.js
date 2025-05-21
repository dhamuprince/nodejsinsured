import mongoose from 'mongoose';

const { Schema } = mongoose;

const scheduledMessageSchema = Schema({
  message: { type: String, required: true },
  scheduledFor: { type: Date, required: true },
}, { timestamps: true });

const ScheduledMessage = mongoose.model('ScheduledMessage', scheduledMessageSchema);
export default ScheduledMessage;
