export interface Entry {
  name: string;
  type: 'income' | 'expense';
  frequency: 'daily' | 'weekly' | 'monthly';
  times: number;
  category: string;
  amount: number;
}