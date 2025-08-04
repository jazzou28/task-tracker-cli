export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}