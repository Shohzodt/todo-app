import mongoose, { Document, Schema } from 'mongoose';

// Define the Task input interface (for creating tasks)
export interface TaskInput {
    title: string;
    description?: string;
    completed?: boolean;
}

// Define the Task interface (TypeScript types)
export interface Task extends Document {
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Task schema (MongoDB structure)
// Note: Validation is handled by Zod schemas at the API layer
// This schema only defines database-level constraints
const taskSchema = new Schema<Task>(
    {
        title: {
            type: String,
            required: true, // Basic requirement for data integrity
        },
        description: {
            type: String,
            required: false,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Create and export the model
const TaskModel = mongoose.model<Task>('Task', taskSchema);

export default TaskModel;
