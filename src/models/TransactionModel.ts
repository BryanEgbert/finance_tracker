import type { User } from './User';
import type { Account } from './Account';
import type { Category } from './Category';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string; // UUID
  user: User;
  account: Account;
  category: Category;
  patternId?: string; // nullable
  type: TransactionType;
  amount: number;
  note: string;
  date: Date;
  isFromPattern: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class TransactionModel implements Transaction {
  id: string;
  user: User;
  account: Account;
  category: Category;
  patternId?: string;
  type: TransactionType;
  amount: number;
  note: string;
  date: Date;
  isFromPattern: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Transaction) {
    this.id = data.id;
    this.user = data.user;
    this.account = data.account;
    this.category = data.category;
    this.patternId = data.patternId;
    this.type = data.type;
    this.amount = data.amount;
    this.note = data.note;
    this.date = data.date;
    this.isFromPattern = data.isFromPattern;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Check if transaction data is valid
   */
  isValid(): boolean {
    return (
      this.id.length > 0 &&
      this.user.id.length > 0 &&
      this.account.id.length > 0 &&
      this.category.id.length > 0 &&
      (this.type === 'income' || this.type === 'expense') &&
      this.amount > 0 &&
      this.date instanceof Date
    );
  }

  /**
   * Check if transaction is income type
   */
  isIncome(): boolean {
    return this.type === 'income';
  }

  /**
   * Check if transaction is expense type
   */
  isExpense(): boolean {
    return this.type === 'expense';
  }

  /**
   * Get formatted amount with sign
   */
  getFormattedAmount(): string {
    const sign = this.type === 'income' ? '+' : '-';
    return `${sign}$${this.amount.toFixed(2)}`;
  }

  /**
   * Get formatted date as string
   */
  getFormattedDate(): string {
    return this.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * Check if transaction is from a pattern
   */
  isAutomatic(): boolean {
    return this.isFromPattern;
  }

  /**
   * Check if transaction occurred today
   */
  isToday(): boolean {
    const today = new Date();
    return (
      this.date.getDate() === today.getDate() &&
      this.date.getMonth() === today.getMonth() &&
      this.date.getFullYear() === today.getFullYear()
    );
  }

  /**
   * Check if transaction occurred in current month
   */
  isThisMonth(): boolean {
    const today = new Date();
    return (
      this.date.getMonth() === today.getMonth() &&
      this.date.getFullYear() === today.getFullYear()
    );
  }
}
