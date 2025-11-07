export interface RoutineToggleProps {
  routineId: string;
  routineName: string;
  isChecked: boolean;
  onToggle: (id: string) => void;
}

export function RoutineToggle({ routineId, routineName, isChecked, onToggle }: RoutineToggleProps): React.ReactNode {
  return (
    <label htmlFor={`routine-${routineId}`} className="relative cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onToggle(routineId)}
        className="sr-only"
        id={`routine-${routineId}`}
        aria-label={`${isChecked ? 'Deactivate' : 'Activate'} ${routineName} routine`}
      />
      <div
        className={`w-10 h-6 rounded-full transition-all ${isChecked ? 'bg-teal-600' : 'bg-gray-200'}`}
        role="presentation"
        aria-hidden="true"
      >
        <div className={`w-5 h-5 rounded-full bg-white absolute top-[2px] transition-all ${isChecked ? 'left-[22px]' : 'left-[2px]'}`}></div>
      </div>
    </label>
  );
}
