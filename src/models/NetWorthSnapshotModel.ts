import type { User } from './User';

export type CalculationFrequency = 'daily' | 'monthly' | 'yearly';

export interface NetWorthSnapshot {
  id: string; // UUID
  user: User;
  date: Date;
  totalIncome: number;
  totalExpense: number;
  netWorth: number;
  calculatedFrom: CalculationFrequency;
  createdAt: Date;
  updatedAt: Date;
}

export class NetWorthSnapshotModel implements NetWorthSnapshot {
  id: string;
  user: User;
  date: Date;
  totalIncome: number;
  totalExpense: number;
  netWorth: number;
  calculatedFrom: CalculationFrequency;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: NetWorthSnapshot) {
    this.id = data.id;
    this.user = data.user;
    this.date = data.date;
    this.totalIncome = data.totalIncome;
    this.totalExpense = data.totalExpense;
    this.netWorth = data.netWorth;
    this.calculatedFrom = data.calculatedFrom;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Check if snapshot data is valid
   */
  isValid(): boolean {
    return (
      this.id.length > 0 &&
      this.user.id.length > 0 &&
      this.date instanceof Date &&
      typeof this.totalIncome === 'number' &&
      typeof this.totalExpense === 'number' &&
      typeof this.netWorth === 'number' &&
      ['daily', 'monthly', 'yearly'].includes(this.calculatedFrom)
    );
  }

  /**
   * Verify that netWorth equals totalIncome - totalExpense
   */
  isCalculationCorrect(): boolean {
    return Math.abs(this.netWorth - (this.totalIncome - this.totalExpense)) < 0.01;
  }

  /**
   * Get formatted net worth
   */
  getFormattedNetWorth(): string {
    const sign = this.netWorth >= 0 ? '+' : '-';
    return `${sign}$${Math.abs(this.netWorth).toFixed(2)}`;
  }

  /**
   * Get formatted total income
   */
  getFormattedIncome(): string {
    return `$${this.totalIncome.toFixed(2)}`;
  }

  /**
   * Get formatted total expense
   */
  getFormattedExpense(): string {
    return `$${this.totalExpense.toFixed(2)}`;
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
   * Check if snapshot is from today
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
   * Check if snapshot is from current month
   */
  isThisMonth(): boolean {
    const today = new Date();
    return (
      this.date.getMonth() === today.getMonth() &&
      this.date.getFullYear() === today.getFullYear()
    );
  }

  /**
   * Check if snapshot is from current year
   */
  isThisYear(): boolean {
    const today = new Date();
    return this.date.getFullYear() === today.getFullYear();
  }

  /**
   * Calculate savings rate (income - expense) / income * 100
   */
  getSavingsRate(): number {
    if (this.totalIncome === 0) return 0;
    return ((this.totalIncome - this.totalExpense) / this.totalIncome) * 100;
  }

  /**
   * Get formatted savings rate
   */
  getFormattedSavingsRate(): string {
    return `${this.getSavingsRate().toFixed(2)}%`;
  }
}
