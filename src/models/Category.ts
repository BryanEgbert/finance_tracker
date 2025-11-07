import type { User } from './User';

export type CategoryType = 'income' | 'expense';

export interface Category {
  id: string; // UUID
  user: User;
  name: string;
  type: CategoryType;
  createdAt: Date;
  updatedAt: Date;
}

export class CategoryModel implements Category {
  id: string;
  user: User;
  name: string;
  type: CategoryType;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Category) {
    this.id = data.id;
    this.user = data.user;
    this.name = data.name;
    this.type = data.type;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Check if category data is valid
   */
  isValid(): boolean {
    return (
      this.id.length > 0 &&
      this.user.id.length > 0 &&
      this.name.length > 0 &&
      (this.type === 'income' || this.type === 'expense')
    );
  }

  /**
   * Check if category is income type
   */
  isIncome(): boolean {
    return this.type === 'income';
  }

  /**
   * Check if category is expense type
   */
  isExpense(): boolean {
    return this.type === 'expense';
  }
}
