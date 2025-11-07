export interface FinancialSummaryProps {
  totalIncome: number;
  totalExpense: number;
}

export function FinancialSummary({ totalIncome, totalExpense }: FinancialSummaryProps): React.ReactNode {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3" aria-hidden="true">
            <span className="text-green-600 text-lg">+</span>
          </div>
          <span className="text-green-800 font-medium">Income</span>
        </div>
        <span className="text-green-800 font-semibold" aria-label={`Total income: $${totalIncome.toFixed(2)}`}>
          ${totalIncome.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3" aria-hidden="true">
            <span className="text-red-600 text-lg">-</span>
          </div>
          <span className="text-red-800 font-medium">Expenses</span>
        </div>
        <span className="text-red-800 font-semibold" aria-label={`Total expenses: $${totalExpense.toFixed(2)}`}>
          ${totalExpense.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
