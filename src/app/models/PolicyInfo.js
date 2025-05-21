import mongoose from 'mongoose';

const { Schema } = mongoose;

const PolicyInfoSchema = Schema({
  policy_number: { type: String, required: true },
  policy_start_date: { type: Date, required: true },
  policy_end_date: { type: Date, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'PolicyCategory', required: true },
  carrierId: { type: Schema.Types.ObjectId, ref: 'PolicyCarrier', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const PolicyInfo = mongoose.model('PolicyInfo', PolicyInfoSchema);

export default PolicyInfo;