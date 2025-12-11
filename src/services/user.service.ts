import UserModel, { User, UserInput } from '../models/user.model';

// Get all users from the database
export const getAllUsers = async (): Promise<User[]> => {
  return await UserModel.find();
};

// Create a new user in the database
export const createNewUser = async (userData: UserInput): Promise<User> => {
  const newUser = new UserModel(userData);
  return await newUser.save();
};

// Get a user by ID from the database
export const getUserById = async (id: string): Promise<User | null> => {
  return await UserModel.findById(id);
};
