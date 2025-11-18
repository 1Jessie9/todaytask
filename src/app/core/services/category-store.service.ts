import { Injectable, computed, inject, signal } from '@angular/core';
import { Category, NewCategory } from '../models/category.interface';
import { CategoryStorageService } from './category.service';

@Injectable({ providedIn: 'root' })
export class CategoryStoreService {
  private readonly storage = inject(CategoryStorageService);
  private readonly _categories = signal<Category[]>(this.storage.getCategories());
  readonly categories = computed(() => this._categories());

  refresh() {
    this._categories.set(this.storage.getCategories());
  }

  createCategory(payload: NewCategory): Category {
    const newCat = this.storage.createCategory(payload);
    this._categories.update(prev => [...prev, newCat]);
    return newCat;
  }

  updateCategory(payload: Category): Category | null {
    const updated = this.storage.updateCategory(payload);
    if (!updated) return null;

    this._categories.update(prev =>
      prev.map(c => (c.id === updated.id ? updated : c)),
    );
    return updated;
  }

  getCategoryById(id: number): Category | null {
    return this.categories().find(c => c.id === id) ?? null;
  }

  deleteCategory(id: number) {
    this._categories.update(prev => prev.filter(c => c.id !== id));
  }
}
