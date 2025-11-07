import { useState } from 'react';
import { H1 } from '@/components/ui/H1';
import { RoutineCard } from '@/components/RoutineCard';
import type { Routine } from '@/models/Routine';
import type { Entry } from '@/models/Entry';

/**
 * Frontend-only routine display interface
 * Combines Routine model with entries for UI display
 */
interface RoutineDisplay extends Routine {
  entries: Entry[];
}

export function RoutinesPage(): React.ReactNode {
    // Mock user for demo purposes
    const mockUser = {
        id: 'user-123',
        email: 'user@example.com',
        passwordHash: 'hashed',
        timezone: 'UTC',
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    // Mock categories for demo purposes
    const mockCategories = {
        income: {
            id: 'cat-income',
            user: mockUser,
            name: 'Income',
            type: 'income' as const,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        housing: {
            id: 'cat-housing',
            user: mockUser,
            name: 'Housing',
            type: 'expense' as const,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        food: {
            id: 'cat-food',
            user: mockUser,
            name: 'Food',
            type: 'expense' as const,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        transport: {
            id: 'cat-transport',
            user: mockUser,
            name: 'Transport',
            type: 'expense' as const,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    };

    // Mock account for demo purposes
    const mockAccount = {
        id: 'acc-123',
        user: mockUser,
        name: 'Main Account',
        balance: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const [routines, setRoutines] = useState<RoutineDisplay[]>([
        {
            id: '1',
            user: mockUser,
            name: 'Monthly Budget',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            entries: [
                {
                    id: 'entry-1',
                    category: mockCategories.income,
                    account: mockAccount,
                    type: 'income',
                    amount: 5000,
                    description: 'Monthly Salary',
                    frequency: 'monthly',
                    startDate: new Date(),
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 'entry-2',
                    category: mockCategories.housing,
                    account: mockAccount,
                    type: 'expense',
                    amount: 1500,
                    description: 'Rent Payment',
                    frequency: 'monthly',
                    startDate: new Date(),
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]
        },
        {
            id: '2',
            user: mockUser,
            name: 'Weekly Expenses',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            entries: [
                {
                    id: 'entry-3',
                    category: mockCategories.food,
                    account: mockAccount,
                    type: 'expense',
                    amount: 100,
                    description: 'Groceries',
                    frequency: 'weekly',
                    startDate: new Date(),
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 'entry-4',
                    category: mockCategories.transport,
                    account: mockAccount,
                    type: 'expense',
                    amount: 50,
                    description: 'Transportation',
                    frequency: 'weekly',
                    startDate: new Date(),
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]
        },
        {
            id: '3',
            user: mockUser,
            name: 'Daily Tracking',
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            entries: [
                {
                    id: 'entry-5',
                    category: mockCategories.food,
                    account: mockAccount,
                    type: 'expense',
                    amount: 5,
                    description: 'Coffee',
                    frequency: 'daily',
                    startDate: new Date(),
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]
        },
    ]);

    const toggleRoutine = (id: string) => {
        setRoutines(prevRoutines => 
            prevRoutines.map(routine => 
                routine.id === id ? { ...routine, isActive: !routine.isActive } : routine
            )
        );
    };

    const calculateTotals = (entries: Entry[]) => {
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

    const activeRoutines = routines.filter(routine => routine.isActive);
    const inactiveRoutines = routines.filter(routine => !routine.isActive);

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

                {activeRoutines.length > 0 && (
                    <section aria-labelledby="active-routines-heading" className="mb-12">
                        <h2 id="active-routines-heading" className="text-2xl font-bold text-gray-900 mb-6">
                            Active Routines
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeRoutines.map((routine: RoutineDisplay) => (
                                <RoutineCard
                                    key={routine.id}
                                    routine={routine}
                                    onToggle={toggleRoutine}
                                    calculateTotals={calculateTotals}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {inactiveRoutines.length > 0 && (
                    <section aria-labelledby="inactive-routines-heading">
                        <h2 id="inactive-routines-heading" className="text-2xl font-bold text-gray-900 mb-6">
                            Inactive Routines
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {inactiveRoutines.map((routine: RoutineDisplay) => (
                                <RoutineCard
                                    key={routine.id}
                                    routine={routine}
                                    onToggle={toggleRoutine}
                                    calculateTotals={calculateTotals}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
