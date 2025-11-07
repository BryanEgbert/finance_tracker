import { useState } from 'react';
import { H1 } from '@/components/ui/H1';
import { Button } from '@/components/ui/Button';
import { TextButton } from '@/components/ui/TextButton';

/**
 * Frontend-only Entry form interface for creating routines
 * This is separate from the backend Entry model
 */
interface FormEntry {
  name: string;
  type: 'income' | 'expense';
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  description: string;
  amount: number;
}

export function CreateRoutinePage(): React.ReactNode {
  const [routineName, setRoutineName] = useState('');
  const [entries, setEntries] = useState<FormEntry[]>([{
    name: '',
    type: 'income',
    frequency: 'monthly',
    description: '',
    amount: 0
  }]);

  const addEntry = () => {
    setEntries([...entries, {
      name: '',
      type: 'income',
      frequency: 'monthly',
      description: '',
      amount: 0
    }]);
  };

  const removeEntry = (index: number) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  const handleEntryChange = (index: number, field: keyof FormEntry, value: string | number) => {
    const newEntries = [...entries];
    newEntries[index][field] = value as never;
    setEntries(newEntries);
  };

  return (
    <main className="min-h-screen min-w-screen flex items-center justify-center bg-white">
      <section className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl ring-2 ring-teal-500/20" aria-labelledby="create-heading" role="region">
        <header className="text-center mb-8">
          <H1 id="create-heading">Create Routine</H1>
          <p className="text-gray-600 mt-2">Create a routine to manage your finances</p>
        </header>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="routineName" className="block text-sm font-medium text-gray-700">Routine Name</label>
            <input
              type="text"
              id="routineName"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g. Monthly Budget"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Entries</h2>
              <TextButton
                variant="primary"
                size="small"
                onClick={addEntry}
              >
                <span className="mr-1">+</span>
                Add Entry
              </TextButton>
            </div>

            {entries.map((entry, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex justify-end mb-3">
                  <TextButton
                    variant="danger"
                    size="small"
                    onClick={() => removeEntry(index)}
                  >
                    Remove
                  </TextButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={entry.name}
                      onChange={(e) => handleEntryChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      placeholder="e.g. Salary, Rent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={entry.type}
                      onChange={(e) => handleEntryChange(index, 'type', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 hover:cursor-pointer"
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Frequency</label>
                    <select
                      value={entry.frequency}
                      onChange={(e) => handleEntryChange(index, 'frequency', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                      type="text"
                      value={entry.description}
                      onChange={(e) => handleEntryChange(index, 'description', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      placeholder="e.g. Monthly salary, Rent payment"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={entry.amount}
                      onChange={(e) => handleEntryChange(index, 'amount', parseFloat(e.target.value) || 0)}
                      onFocus={(e) => e.target.select()}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="default"
            >
              Save Routine
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}