import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = Schema({
  firstName: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  userType: { type: String, required: true } // e.g., 'Individual', 'Business'

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;