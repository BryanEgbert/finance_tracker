import type { User } from './User';
import type { Entry } from './Entry';

export interface Routine {
  id: string; // UUID
  user: User;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class RoutineModel implements Routine {
  id: string;
  user: User;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  entries: Entry[] = [];

  constructor(data: Routine, entries: Entry[] = []) {
    this.id = data.id;
    this.user = data.user;
    this.name = data.name;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.entries = entries;
  }

  /**
   * Check if routine data is valid
   */
  isValid(): boolean {
    return (
      this.id.length > 0 &&
      this.user.id.length > 0 &&
      this.name.length > 0 &&
      typeof this.isActive === 'boolean'
    );
  }

  /**
   * Add entry to routine
   */
  addEntry(entry: Entry): void {
    this.entries.push(entry);
    this.updatedAt = new Date();
  }

  /**
   * Remove entry from routine by ID
   */
  removeEntry(entryId: string): void {
    this.entries = this.entries.filter(e => e.id !== entryId);
    this.updatedAt = new Date();
  }

  /**
   * Get total income from all entries
   */
  getTotalIncome(): number {
    return this.entries
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);
  }

  /**
   * Get total expenses from all entries
   */
  getTotalExpense(): number {
    return this.entries
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);
  }

  /**
   * Get net total (income - expenses)
   */
  getNetTotal(): number {
    return this.getTotalIncome() - this.getTotalExpense();
  }

  /**
   * Toggle routine active status
   */
  toggleActive(): void {
    this.isActive = !this.isActive;
    this.updatedAt = new Date();
  }

  /**
   * Get entry count
   */
  getEntryCount(): number {
    return this.entries.length;
  }
}