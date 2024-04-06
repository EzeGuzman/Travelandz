import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    emailToken: {
      type: String,
      trim: true,
      required: false,
      unique: true,
      sparse: true,
    }, // Usar sparse index
    password: { type: String, trim: true },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('users', userSchema);
export default User;
