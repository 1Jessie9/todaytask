export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface NewCategory extends Omit<Category, 'id'> {}