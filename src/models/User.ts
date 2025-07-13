import mongoose, { Document, Schema } from 'mongoose';

export type UserRole = 'customer' | 'retailer' | 'driver';

export interface IUser extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

const UserSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['customer', 'retailer', 'driver'],
      required: true,
      default: 'customer' 
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
