import { Category } from "./category.interface";
import { Priority } from "./priority.interface";

export interface TaskTodo {
  id: number;
  title: string;
  category: Category;
  priority: Priority;
  completed: boolean;
  completedAt?: string;
}

export interface NewTask extends Omit<TaskTodo, 'id' | 'completed'> {}