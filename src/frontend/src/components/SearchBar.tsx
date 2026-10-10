import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="product-search"
        className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground"
      >
        Cari Produk
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id="product-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Cari nama atau kategori baju…"
          data-ocid="catalog.search_input"
          className="h-12 w-full rounded-full border border-input bg-card pl-11 pr-11 text-sm text-foreground shadow-subtle transition-smooth placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Hapus kata kunci pencarian"
            data-ocid="catalog.secondary_button"
            className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
      <p
        data-ocid="catalog.success_state"
        className="mt-2 text-sm text-muted-foreground"
        aria-live="polite"
      >
        {resultCount} produk ditemukan
      </p>
    </div>
  );
}
