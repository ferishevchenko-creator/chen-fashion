import { cn } from "@/lib/utils";
import {
  CATEGORY_LABELS,
  type Category,
  SORT_LABELS,
  type SortOption,
} from "@/types/product";
import { ArrowUpDown } from "lucide-react";

const CATEGORIES: Array<Category | "semua"> = [
  "semua",
  "pria",
  "wanita",
  "anak",
];

const SORT_OPTIONS: SortOption[] = ["terbaru", "termurah", "termahal"];

interface CategoryFilterProps {
  category: Category | "semua";
  onCategoryChange: (category: Category | "semua") => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function CategoryFilter({
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div
        role="tablist"
        aria-label="Filter kategori"
        className="flex flex-wrap gap-2"
      >
        {CATEGORIES.map((item) => {
          const isActive = item === category;
          const label = item === "semua" ? "Semua" : CATEGORY_LABELS[item];
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(item)}
              data-ocid={`catalog.filter.tab.${item}`}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-subtle"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <ArrowUpDown
          className="size-4 text-muted-foreground"
          aria-hidden="true"
        />
        <label htmlFor="sort-select" className="sr-only">
          Urutkan produk
        </label>
        <select
          id="sort-select"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          data-ocid="catalog.select"
          className="h-10 rounded-full border border-input bg-card px-4 text-sm font-medium text-foreground shadow-subtle transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {SORT_LABELS[option]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
