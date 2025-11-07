import type { Routine } from '@/models/Routine';
import type { Entry } from '@/models/Entry';
import { RoutineToggle } from '@/components/RoutineToggle';
import { FinancialSummary } from '@/components/FinancialSummary';

export interface RoutineCardProps {
  routine: Routine & { entries: Entry[] };
  onToggle: (id: string) => void;
  calculateTotals: (entries: Entry[]) => { totalIncome: number; totalExpense: number };
}

export function RoutineCard({ routine, onToggle, calculateTotals }: RoutineCardProps): React.ReactNode {
  const { totalIncome, totalExpense } = calculateTotals(routine.entries);

  return (
    <article
      className={`bg-slate rounded-xl shadow-lg p-6 border border-gray-100 transition-all duration-200 hover:shadow-xl hover:border-teal-100 ${routine.isActive ? 'ring-2 ring-teal-500/20' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{routine.name}</h3>
        <RoutineToggle
          routineId={routine.id}
          routineName={routine.name}
          isChecked={routine.isActive}
          onToggle={onToggle}
        />
      </div>

      <FinancialSummary totalIncome={totalIncome} totalExpense={totalExpense} />
    </article>
  );
}
