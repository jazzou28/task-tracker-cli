import { promises as fs } from 'fs';
import path from 'path';
import { Task, TaskStatus } from './domain/task.entity';

const TASKS_FILE_PATH = path.resolve(process.cwd(), 'tasks.json');

/**
 * Read all tasks from tasks.json.
 * If the file does not exist, it creates it and returns an empty array.
 */
export async function getTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(TASKS_FILE_PATH, 'utf-8');
    return JSON.parse(data) as Task[];
  } catch (error: any) {
    // If the error is that the file does not exist, we create it empty.
    if (error.code === 'ENOENT') {
      await saveTasks([]); // Creates the file with an empty array.
      return [];
    }
    // If it’s another mistake, we launch it.
    throw error;
  }
}

/**
 * Write a task array in tasks.json.
 */
async function saveTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(TASKS_FILE_PATH, JSON.stringify(tasks, null, 2));
}

/**
 * Add a new task to tasks.json.
 */

 export async function addTask(description: string): Promise<Task> {
  //Read the tasks from the file.
  const tasks = await getTasks();

  //Create a new task.
  const newTask: Task = {
    id: crypto.randomUUID(),
    description,
    status: 'todo',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  //Add the task to the list
  const updatedTasks = [...tasks, newTask];

  //Save the updated tasks to the file.
  await saveTasks(updatedTasks);

  return newTask;
}

export async function deleteTask(id: string): Promise<boolean>{
  const tasks = await getTasks();

  //We check if the task exists before trying to delete
  const trasExits = tasks.some(task => task.id === id);
  if (!trasExits) {
    return false;
  }

  // We filter the array, leaving only tasks that do NOT have that ID
  const updatedTasks = tasks.filter(task => task.id !== id);

  await saveTasks(updatedTasks);
  return true;
}

export async function updateTask (id: string, newDescription: string): Promise<Task | null> {
  const tasks = await getTasks();

  // We find the task to update
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return null;
  }

  // We update the task and modification date
  tasks[taskIndex].description = newDescription;
  tasks[taskIndex].updatedAt = new Date();

  await saveTasks(tasks);

  return tasks[taskIndex];
}

export async function updateTaskStatus(id: string, newStatus: TaskStatus): Promise<Task | null> {
  const tasks = await getTasks();

  // We find the task to update
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  // We update the task status
  tasks[taskIndex].status = newStatus;
  tasks[taskIndex].updatedAt = new Date();

  await saveTasks(tasks);

  return tasks[taskIndex];
}