import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
    match: [/.+@.+\..+/, 'Please provide a valid email.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 6,
  },
  role: {
    type: String,
    required: [true, 'Please provide a role.'],
    enum: ['customer', 'driver', 'retailer'],
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
