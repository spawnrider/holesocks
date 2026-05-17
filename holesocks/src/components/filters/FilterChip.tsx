interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function FilterChip({ label, isSelected, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-ui font-semibold text-xs uppercase tracking-wider transition-colors duration-150 whitespace-nowrap min-h-[44px] ${
        isSelected
          ? "bg-acidule text-charbon"
          : "bg-transparent text-charbon border border-charbon/30 hover:border-charbon"
      }`}
      aria-pressed={isSelected}
    >
      {label}
    </button>
  );
}
