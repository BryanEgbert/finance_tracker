import type { Category } from './Category';
import type { Account } from './Account';

export type EntryType = 'income' | 'expense';
export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Entry {
  id: string; // UUID
  category: Category;
  account: Account;
  type: EntryType;
  amount: number;
  description: string;
  frequency: Frequency;
  daysOfWeek?: string[]; // e.g., ["monday", "tuesday"]
  dayOfMonth?: number; // e.g., 1 = 1st day of month
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class EntryModel implements Entry {
  id: string;
  category: Category;
  account: Account;
  type: EntryType;
  amount: number;
  description: string;
  frequency: Frequency;
  daysOfWeek?: string[];
  dayOfMonth?: number;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Entry) {
    this.id = data.id;
    this.category = data.category;
    this.account = data.account;
    this.type = data.type;
    this.amount = data.amount;
    this.description = data.description;
    this.frequency = data.frequency;
    this.daysOfWeek = data.daysOfWeek;
    this.dayOfMonth = data.dayOfMonth;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Check if entry data is valid
   */
  isValid(): boolean {
    return (
      this.id.length > 0 &&
      this.category.id.length > 0 &&
      this.account.id.length > 0 &&
      (this.type === 'income' || this.type === 'expense') &&
      this.amount > 0 &&
      this.description.length > 0 &&
      ['daily', 'weekly', 'monthly', 'yearly'].includes(this.frequency)
    );
  }

  /**
   * Check if entry is income type
   */
  isIncome(): boolean {
    return this.type === 'income';
  }

  /**
   * Check if entry is expense type
   */
  isExpense(): boolean {
    return this.type === 'expense';
  }

  /**
   * Check if entry is currently active and within date range
   */
  isCurrentlyActive(): boolean {
    if (!this.isActive) return false;

    const now = new Date();
    const isAfterStart = now >= this.startDate;
    const isBeforeEnd = !this.endDate || now <= this.endDate;

    return isAfterStart && isBeforeEnd;
  }

  /**
   * Check if entry occurs on a specific day of week
   */
  occursOnDayOfWeek(dayName: string): boolean {
    if (this.frequency !== 'weekly' || !this.daysOfWeek) return false;
    return this.daysOfWeek.includes(dayName.toLowerCase());
  }

  /**
   * Check if entry occurs on a specific day of month
   */
  occursOnDayOfMonth(day: number): boolean {
    if (this.frequency !== 'monthly' || !this.dayOfMonth) return false;
    return this.dayOfMonth === day;
  }

  /**
   * Get formatted amount with sign
   */
  getFormattedAmount(): string {
    const sign = this.type === 'income' ? '+' : '-';
    return `${sign}$${this.amount.toFixed(2)}`;
  }

  /**
   * Toggle entry active status
   */
  toggleActive(): void {
    this.isActive = !this.isActive;
    this.updatedAt = new Date();
  }
}