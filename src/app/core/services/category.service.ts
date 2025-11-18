import { Injectable } from '@angular/core';
import { Category, NewCategory } from '../models/category.interface';
import { CATEGORIES_KEY } from '../constants/keys';
import { DEFAULT_CATEGORY } from '../constants/category-default';

@Injectable({ providedIn: 'root' })
export class CategoryStorageService {

  private categories(): Category[] {
    try {
      const raw = localStorage.getItem(CATEGORIES_KEY);
      return raw ? JSON.parse(raw) as Category[] : [];
    } catch (err) {
      console.error('[CategoryStorage] Error reading localStorage', err);
      return [];
    }
  }

  private saveCategory(categories: Category[]): void {
    try {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    } catch (err) {
      console.error('[CategoryStorage] Error saving to localStorage', err);
    }
  }

  private getIdCategory(categories: Category[]): number {
    if (!categories.length) return 1;
    return Math.max(...categories.map(c => c.id)) + 1;
  }

  private ensureDefaultCategory(): Category[] {
    const categories = this.categories();

    if (!categories.length) {
      const created = this.createCategory(DEFAULT_CATEGORY);
      return [created];
    }

    return categories;
  }

  createCategory(payload: NewCategory): Category {
    const categories = this.categories();
    const newCategory: Category = {
      id: this.getIdCategory(categories),
      name: payload.name,
      color: payload.color,
      icon: payload.icon,
    };

    const updated = [...categories, newCategory];
    this.saveCategory(updated);
    return newCategory;
  }

  updateCategory(payload: Category): Category | null {
    const categories = this.categories();
    let updatedCategory: Category | null = null;

    const updated = categories.map(cat => {
      if (cat.id !== payload.id) return cat;

      updatedCategory = {
        ...cat,
        name: payload.name ?? cat.name,
        color: payload.color ?? cat.color,
        icon: payload.icon ?? cat.icon,
      };
      return updatedCategory;
    });

    this.saveCategory(updated);
    return updatedCategory;
  }

  getCategories(): Category[] {
    return this.ensureDefaultCategory();
  }

  getCategoryById(id: number): Category | null {
    const categories = this.categories();
    return categories.find(c => c.id === id) ?? null;
  }

  deleteCategory(id: number): void {
    const categories = this.categories();
    const updated = categories.filter(c => c.id !== id);
    this.saveCategory(updated);
  }
}
