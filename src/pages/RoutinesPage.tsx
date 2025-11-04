import { useState } from 'react';
import { H1 } from '@/components/ui/H1';
import type { Routine } from '@/models/Routine';

export function RoutinesPage(): React.ReactNode {
    const [routines, setRoutines] = useState<Routine[]>([
        {
            id: 1,
            name: 'Monthly Budget',
            checked: true,
            entries: [
                { name: 'Salary', type: 'income', frequency: 'monthly', times: 1, category: 'Income', amount: 5000 },
                { name: 'Rent', type: 'expense', frequency: 'monthly', times: 1, category: 'Housing', amount: 1500 },
            ]
        },
        {
            id: 2,
            name: 'Weekly Expenses',
            checked: true,
            entries: [
                { name: 'Groceries', type: 'expense', frequency: 'weekly', times: 1, category: 'Food', amount: 100 },
                { name: 'Transportation', type: 'expense', frequency: 'weekly', times: 5, category: 'Transport', amount: 50 },
            ]
        },
        {
            id: 3,
            name: 'Daily Tracking',
            checked: false,
            entries: [
                { name: 'Coffee', type: 'expense', frequency: 'daily', times: 1, category: 'Food', amount: 5 },
            ]
        },
    ]);

    const toggleRoutine = (id: number) => {
        console.log(id);
        setRoutines(prevRoutines => 
            prevRoutines.map(routine => 
                routine.id === id ? { ...routine, checked: !routine.checked } : routine
            )
        );
    };

    const calculateTotals = (entries: Routine['entries']) => {
        let totalIncome = 0;
        let totalExpense = 0;

        entries.forEach(entry => {
            if (entry.type === 'income') {
                totalIncome += entry.amount;
            } else {
                totalExpense += entry.amount;
            }
        });

        return { totalIncome, totalExpense };
    };

    return (
        <main className="min-h-screen min-w-screen bg-linear-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 py-12">
                <header className="text-center mb-12">
                    <H1 id="routines-heading" className="text-4xl font-bold text-gray-900 mb-4">
                        My Routines
                    </H1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Manage your financial routines with ease and clarity
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {routines.map((routine) => {
                        const { totalIncome, totalExpense } = calculateTotals(routine.entries);

                        return (
                            <div
                                key={routine.id}
                                className={`bg-slate rounded-xl shadow-lg p-6 border border-gray-100 transition-all duration-200 hover:shadow-xl hover:cursor-pointer hover:border-teal-100 ${routine.checked ? 'ring-2 ring-teal-500/20' : ''}`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">{routine.name}</h2>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={routine.checked}
                                            onChange={() => toggleRoutine(routine.id)}
                                            className="sr-only peer"
                                            id={`routine-${routine.id}`}
                                            aria-label={`Toggle ${routine.name}`}
                                        />
                                        <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                                <span className="text-green-600 text-lg">+</span>
                                            </div>
                                            <span className="text-green-800 font-medium">Income</span>
                                        </div>
                                        <span className="text-green-800 font-semibold">${totalIncome.toFixed(2)}</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                                <span className="text-red-600 text-lg">-</span>
                                            </div>
                                            <span className="text-red-800 font-medium">Expenses</span>
                                        </div>
                                        <span className="text-red-800 font-semibold">${totalExpense.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
