import mongoose, { Document, Schema } from 'mongoose';

// Define the User input interface (for creating users)
export interface UserInput {
  name: string;
  email: string;
}

// Define the User interface (TypeScript types)
export interface User extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema (MongoDB structure)
// Note: Validation is handled by Zod schemas at the API layer
// This schema only defines database-level constraints
const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true, // Basic requirement for data integrity
    },
    email: {
      type: String,
      required: true,
      unique: true, // Database constraint - prevents duplicates
      index: true, // Index for faster queries
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create and export the model
const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;