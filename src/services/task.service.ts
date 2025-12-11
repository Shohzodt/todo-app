import TaskModel, { Task, TaskInput } from '../models/task.model';

// Get all tasks from the database
export const getAllTasks = async (): Promise<Task[]> => {
    return await TaskModel.find().sort({ createdAt: -1 }); // Sort by newest first
};

// Create a new task in the database
export const createNewTask = async (taskData: TaskInput): Promise<Task> => {
    const newTask = new TaskModel(taskData);
    return await newTask.save();
};

// Get a task by ID from the database
export const getTaskById = async (id: string): Promise<Task | null> => {
    return await TaskModel.findById(id);
};

// Update a task by ID
export const updateTaskById = async (
    id: string,
    taskData: Partial<TaskInput>
): Promise<Task | null> => {
    return await TaskModel.findByIdAndUpdate(id, taskData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
    });
};

// Delete a task by ID
export const deleteTaskById = async (id: string): Promise<Task | null> => {
    return await TaskModel.findByIdAndDelete(id);
};

// Toggle task completion status
export const toggleTaskCompletion = async (id: string): Promise<Task | null> => {
    const task = await TaskModel.findById(id);
    if (!task) return null;

    task.completed = !task.completed;
    return await task.save();
};
