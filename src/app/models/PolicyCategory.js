import mongoose from 'mongoose';

const { Schema }  = mongoose;

const PolicyCategorySchema = Schema({
  category_name: { type: String, required: true }
}, { timestamps: true });

const PolicyCategory = mongoose.model('PolicyCategory', PolicyCategorySchema);

export default PolicyCategory;