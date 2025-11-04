import { useState } from 'react';
import { H1 } from '@/components/ui/H1';
import type { Entry } from '@/models/Entry';

export function CreateRoutinePage(): React.ReactNode {
  const [routineName, setRoutineName] = useState('');
  const [entries, setEntries] = useState<Entry[]>([{
    name: '',
    type: 'income',
    frequency: 'monthly',
    times: 1,
    category: '',
    amount: 0
  }]);

  const addEntry = () => {
    setEntries([...entries, {
      name: '',
      type: 'income',
      frequency: 'monthly',
      times: 1,
      category: '',
      amount: 0
    }]);
  };

  const removeEntry = (index: number) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  const handleEntryChange = (index: number, field: keyof Entry, value: string | number) => {
    const newEntries = [...entries];
    newEntries[index][field] = value as never;
    setEntries(newEntries);
  };

  return (
    <main className="min-h-screen min-w-screen flex items-center justify-center bg-linear-to-br from-teal-100 to-gray-100">
      <section className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl" aria-labelledby="create-heading" role="region">
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
              <button
                type="button"
                onClick={addEntry}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Add Entry
              </button>
            </div>

            {entries.map((entry, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex justify-end mb-3">
                  <button
                    type="button"
                    onClick={() => removeEntry(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
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
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
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
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Times per Frequency</label>
                    <input
                      type="number"
                      min="1"
                      value={entry.times}
                      onChange={(e) => handleEntryChange(index, 'times', parseInt(e.target.value) || 1)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      value={entry.category}
                      onChange={(e) => handleEntryChange(index, 'category', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      placeholder="e.g. Housing, Food"
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
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Save Routine
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}