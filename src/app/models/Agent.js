import mongoose from 'mongoose';

const { Schema } = mongoose;

const AgentSchema = Schema({
  agentName: String
}, { timestamps: true });

const Agent = mongoose.model('Agent', AgentSchema);
export default Agent;