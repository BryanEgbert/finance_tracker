export interface User {
  id: string; // UUID
  email: string;
  passwordHash: string;
  timezone: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserModel implements User {
  id: string;
  email: string;
  passwordHash: string;
  timezone: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: User) {
    this.id = data.id;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
    this.timezone = data.timezone;
    this.currency = data.currency;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Check if user data is valid
   */
  isValid(): boolean {
    return (
      this.id.length > 0 &&
      this.email.includes('@') &&
      this.passwordHash.length > 0 &&
      this.timezone.length > 0 &&
      this.currency.length > 0
    );
  }

  /**
   * Get user display name (email without domain)
   */
  getDisplayName(): string {
    return this.email.split('@')[0];
  }
}
