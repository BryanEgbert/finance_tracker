import type { User } from './User';

export interface Account {
  id: string; // UUID
  user: User;
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export class AccountModel implements Account {
  id: string;
  user: User;
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Account) {
    this.id = data.id;
    this.user = data.user;
    this.name = data.name;
    this.balance = data.balance;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Check if account data is valid
   */
  isValid(): boolean {
    return (
      this.id.length > 0 &&
      this.user.id.length > 0 &&
      this.name.length > 0 &&
      typeof this.balance === 'number'
    );
  }

  /**
   * Update account balance
   */
  updateBalance(amount: number): void {
    this.balance += amount;
    this.updatedAt = new Date();
  }

  /**
   * Set account balance
   */
  setBalance(amount: number): void {
    this.balance = amount;
    this.updatedAt = new Date();
  }

  /**
   * Get formatted balance with currency
   */
  getFormattedBalance(currency: string = 'USD'): string {
    return `${currency} ${this.balance.toFixed(2)}`;
  }
}
