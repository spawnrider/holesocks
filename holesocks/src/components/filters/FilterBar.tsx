import { FilterChip } from "./FilterChip";
import type { FilterState } from "@/types/product";

interface FilterBarProps {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: any) => void;
  clearFilters: () => void;
}

const LEVEL_OPTIONS = [
  { value: 1, label: "Léger" },
  { value: 2, label: "Aéré" },
  { value: 3, label: "Catastrophe" },
];

const STYLE_OPTIONS = [
  { value: "orteil", label: "Orteil" },
  { value: "talon", label: "Talon" },
  { value: "semelle", label: "Semelle" },
];

const COLOR_OPTIONS = [
  { value: "red", label: "Rouge" },
  { value: "blue", label: "Bleu" },
  { value: "black", label: "Noir" },
  { value: "white", label: "Blanc" },
];

const SIZE_OPTIONS = ["S", "M", "L", "XL"];

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-ui font-bold text-xs uppercase tracking-widest text-gris mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function FilterBar({ filters, setFilter, clearFilters }: FilterBarProps) {
  return (
    <div className="bg-creme border border-charbon/15 rounded p-5 space-y-6">
      <h2 className="font-display text-2xl tracking-wide text-charbon">
        Affiner
      </h2>

      <FilterSection title="Niveau de trou">
        <FilterChip
          label="Tous"
          isSelected={filters.level === undefined}
          onClick={() => setFilter("level", undefined)}
        />
        {LEVEL_OPTIONS.map((o) => (
          <FilterChip
            key={o.value}
            label={o.label}
            isSelected={filters.level === o.value}
            onClick={() => setFilter("level", o.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Couleur">
        <FilterChip
          label="Toutes"
          isSelected={filters.color === undefined}
          onClick={() => setFilter("color", undefined)}
        />
        {COLOR_OPTIONS.map((o) => (
          <FilterChip
            key={o.value}
            label={o.label}
            isSelected={filters.color === o.value}
            onClick={() => setFilter("color", o.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Style de trou">
        <FilterChip
          label="Tous"
          isSelected={filters.style === undefined}
          onClick={() => setFilter("style", undefined)}
        />
        {STYLE_OPTIONS.map((o) => (
          <FilterChip
            key={o.value}
            label={o.label}
            isSelected={filters.style === o.value}
            onClick={() => setFilter("style", o.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Taille">
        <FilterChip
          label="Toutes"
          isSelected={filters.size === undefined}
          onClick={() => setFilter("size", undefined)}
        />
        {SIZE_OPTIONS.map((o) => (
          <FilterChip
            key={o}
            label={o}
            isSelected={filters.size === o}
            onClick={() => setFilter("size", o)}
          />
        ))}
      </FilterSection>

      <button
        onClick={clearFilters}
        className="w-full border border-charbon/30 text-charbon font-ui font-semibold text-xs uppercase tracking-wider py-3 px-4 rounded hover:bg-charbon hover:text-creme transition-colors duration-150 min-h-[44px]"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}
