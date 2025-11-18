import { Injectable } from '@angular/core';
import { TASKS_KEY } from '../constants/keys';
import { CategoryStorageService } from './category.service';
import { Category } from '../models/category.interface';
import { NewTask, TaskTodo } from '../models/task.interface';
import { Priority } from '../models/priority.interface';

@Injectable({ providedIn: 'root' })
export class TaskStorageService {
  constructor(private categoryStorage: CategoryStorageService) { }

  private rawTasks(): TaskTodo[] {
    try {
      const raw = localStorage.getItem(TASKS_KEY);
      return raw ? JSON.parse(raw) as TaskTodo[] : [];
    } catch (err) {
      console.error('[TaskStorage] Error reading localStorage', err);
      return [];
    }
  }

  private saveRawTasks(tasks: TaskTodo[]): void {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('[TaskStorage] Error saving to localStorage', err);
    }
  }

  private getNextId(tasks: TaskTodo[]): number {
    if (!tasks.length) return 1;
    return Math.max(...tasks.map(t => t.id)) + 1;
  }

  private mapToTaskTodo(task: TaskTodo, categories: Category[]): TaskTodo {
    const cat = categories.find(c => c.id === task.category.id && !task.completed);
    return {
      ...task,
      category: cat ?? task.category,
    };
  }

  private mapManyToTaskTodo(tasks: TaskTodo[]): TaskTodo[] {
    const categories = this.categoryStorage.getCategories();
    const mapped = tasks
      .map(t => this.mapToTaskTodo(t, categories))
      .filter(t => t.completed === false);

    return this.sortTasksByPriority(mapped);
  }

  private sortTasksByPriority(tasks: TaskTodo[]): TaskTodo[] {
    const order: Record<Priority, number> = {
      high: 0,
      medium: 1,
      low: 2,
    };

    return [...tasks].sort((a, b) => {
      const diff = order[a.priority] - order[b.priority];
      if (diff !== 0) return diff;

      return b.id - a.id;
    });
  }

  getTasks(): TaskTodo[] {
    const raw = this.rawTasks();
    return this.mapManyToTaskTodo(raw);
  }

  getTasksByCategory(categoryId: number): TaskTodo[] {
    const raw = this.rawTasks().filter(t => t.category.id === categoryId);
    return this.mapManyToTaskTodo(raw);
  }

  getTaskById(id: number): TaskTodo | null {
    const raw = this.rawTasks().find(t => t.id === id);
    if (!raw) return null;
    const categories = this.categoryStorage.getCategories();
    return this.mapToTaskTodo(raw, categories);
  }

  updateTask(payload: TaskTodo): TaskTodo | null {
    const tasks = this.rawTasks();
    let updatedTask: TaskTodo | null = null;

    const updated = tasks.map(t => {
      if (t.id !== payload.id) return t;

      updatedTask = {
        ...t,
        title: payload.title,
        priority: payload.priority,
        completed: payload.completed,
        category: payload.category,
      };
      return updatedTask;
    });

    this.saveRawTasks(updated);

    if (!updatedTask) return null;
    const categories = this.categoryStorage.getCategories();
    return this.mapToTaskTodo(updatedTask, categories);
  }

  createTask(payload: NewTask): TaskTodo {
    const tasks = this.rawTasks();
    const newRaw: TaskTodo = {
      ...payload,
      id: this.getNextId(tasks),
      completed: false,
    };

    const updated = [...tasks, newRaw];
    this.saveRawTasks(updated);

    const categories = this.categoryStorage.getCategories();
    return this.mapToTaskTodo(newRaw, categories);
  }


  completeTask(taskId: number): TaskTodo | null {
    const tasks = this.rawTasks();
    let updatedTask;

    const updated = tasks.map(t => {
      if (t.id !== taskId) return t;

      updatedTask = {
        ...t,
        completed: true,
        completedAt: new Date().toISOString(),
      };
      return updatedTask;
    });

    this.saveRawTasks(updated);

    if (!updatedTask) return null;
    const categories = this.categoryStorage.getCategories();
    return this.mapToTaskTodo(updatedTask, categories);
  }

  deleteTask(taskId: number): void {
    const tasks = this.rawTasks().filter(t => t.id !== taskId);
    this.saveRawTasks(tasks);
  }
}
