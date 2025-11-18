import { Injectable, computed, inject, signal } from '@angular/core';
import { TaskTodo, NewTask } from '../models/task.interface';
import { TaskStorageService } from './task.service';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  private readonly storage = inject(TaskStorageService);

  private readonly _tasks = signal<TaskTodo[]>(this.storage.getTasks());

  readonly tasks = computed(() => this._tasks());
  readonly pendingTasks = computed(() =>
    this._tasks().filter(t => !t.completed)
  );

  refresh() {
    this._tasks.set(this.storage.getTasks());
  }

  createTask(payload: NewTask): TaskTodo {
    const task = this.storage.createTask(payload);
    this._tasks.update(prev => [...prev, task]);
    return task;
  }

  updateTask(payload: TaskTodo): TaskTodo | null {
    const updated = this.storage.updateTask(payload);
    if (!updated) return null;

    this._tasks.update(prev =>
      prev.map(t => (t.id === updated.id ? updated : t)),
    );
    return updated;
  }

  completeTask(id: number) {
    const updated = this.storage.completeTask(id);
    if (!updated) return;

    this._tasks.update(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: true, completedAt: updated.completedAt } : t)),
    );
  }

  deleteTask(id: number) {
    this.storage.deleteTask(id);
    this._tasks.update(prev => prev.filter(t => t.id !== id));
  }

  getTaskById(id: number): TaskTodo | null {
    return this.tasks().find(t => t.id === id) ?? null;
  }

  getTasksByCategory(categoryId: number): TaskTodo[] {
    return this.tasks().filter(t => t.category.id === categoryId && !t.completed);
  }
}
