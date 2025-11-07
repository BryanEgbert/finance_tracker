import type { User } from './User';

export interface Budget {
  id: string; // UUID
  user: User;
  name: string;
  allocationPercentage: number;
  targetAmount: number;
  currentAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BudgetModel implements Budget {
  id: string;
  user: User;
  name: string;
  allocationPercentage: number;
  targetAmount: number;
  currentAmount: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Budget) {
    this.id = data.id;
    this.user = data.user;
    this.name = data.name;
    this.allocationPercentage = data.allocationPercentage;
    this.targetAmount = data.targetAmount;
    this.currentAmount = data.currentAmount;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Check if budget data is valid
   */
  isValid(): boolean {
    return (
      this.id.length > 0 &&
      this.user.id.length > 0 &&
      this.name.length > 0 &&
      this.allocationPercentage > 0 &&
      this.allocationPercentage <= 100 &&
      this.targetAmount > 0 &&
      this.currentAmount >= 0
    );
  }

  /**
   * Get remaining budget amount
   */
  getRemainingAmount(): number {
    return Math.max(0, this.targetAmount - this.currentAmount);
  }

  /**
   * Get percentage of budget spent
   */
  getSpentPercentage(): number {
    if (this.targetAmount === 0) return 0;
    return (this.currentAmount / this.targetAmount) * 100;
  }

  /**
   * Check if budget is exceeded
   */
  isExceeded(): boolean {
    return this.currentAmount > this.targetAmount;
  }

  /**
   * Check if budget is near limit (>= 80%)
   */
  isNearLimit(): boolean {
    return this.getSpentPercentage() >= 80;
  }

  /**
   * Add amount to current spending
   */
  addSpending(amount: number): void {
    this.currentAmount += amount;
    this.updatedAt = new Date();
  }

  /**
   * Subtract amount from current spending
   */
  subtractSpending(amount: number): void {
    this.currentAmount = Math.max(0, this.currentAmount - amount);
    this.updatedAt = new Date();
  }

  /**
   * Reset current spending to zero
   */
  resetSpending(): void {
    this.currentAmount = 0;
    this.updatedAt = new Date();
  }

  /**
   * Get formatted remaining amount
   */
  getFormattedRemaining(): string {
    return `$${this.getRemainingAmount().toFixed(2)}`;
  }

  /**
   * Get formatted target amount
   */
  getFormattedTarget(): string {
    return `$${this.targetAmount.toFixed(2)}`;
  }

  /**
   * Get formatted current amount
   */
  getFormattedCurrent(): string {
    return `$${this.currentAmount.toFixed(2)}`;
  }
}
