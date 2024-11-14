import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  company: { type: String },
  jobTitle: { type: String },
});

export default model('Contact', contactSchema);