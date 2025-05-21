import mongoose from 'mongoose';

const { Schema } = mongoose;

const AccountSchema = Schema({
  account_name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }

}, { timestamps: true });

const Account = mongoose.model('Account', AccountSchema);

export default Account;