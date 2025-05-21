import mongoose from 'mongoose';

const { Schema } = mongoose;

const PolicyCarrierSchema = Schema({
  company_name: { type: String, required: true }
}, { timestamps: true 

});

const PolicyCarrier = mongoose.model('PolicyCarrier', PolicyCarrierSchema);
export default PolicyCarrier;