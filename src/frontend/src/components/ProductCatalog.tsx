import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { SearchBar } from "@/components/SearchBar";
import { PRODUCTS } from "@/data/products";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  CATEGORY_LABELS,
  type Category,
  type Product,
  type SortOption,
} from "@/types/product";
import { PackageSearch } from "lucide-react";
import { useMemo, useState } from "react";

export function ProductCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useLocalStorage<Category | "semua">(
    "rumahmode.category",
    "semua",
  );
  const [sort, setSort] = useLocalStorage<SortOption>(
    "rumahmode.sort",
    "terbaru",
  );
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = PRODUCTS.filter((product) => {
      const matchesCategory =
        category === "semua" || product.category === category;
      if (!matchesCategory) return false;
      if (!normalized) return true;
      return (
        product.name.toLowerCase().includes(normalized) ||
        CATEGORY_LABELS[product.category].toLowerCase().includes(normalized)
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "termurah") return a.price - b.price;
      if (sort === "termahal") return b.price - a.price;
      return 0;
    });
  }, [query, category, sort]);

  return (
    <section
      id="produk"
      data-ocid="catalog.section"
      className="bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Katalog Produk
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Temukan Gaya Anda
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Jelajahi koleksi pilihan untuk pria, wanita, dan anak. Gunakan
            pencarian dan filter untuk menemukan favorit Anda lebih cepat.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <SearchBar
            value={query}
            onChange={setQuery}
            resultCount={filtered.length}
          />
          <CategoryFilter
            category={category}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
          />
        </div>

        {filtered.length > 0 ? (
          <div
            data-ocid="catalog.list"
            className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
          >
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onOpen={setSelected}
              />
            ))}
          </div>
        ) : (
          <div
            data-ocid="catalog.empty_state"
            className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <PackageSearch className="size-7" aria-hidden="true" />
            </span>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Produk tidak ditemukan
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Coba kata kunci lain seperti "kemeja", "gaun", atau "anak", atau
              ubah filter kategori untuk melihat koleksi lainnya.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("semua");
              }}
              data-ocid="catalog.secondary_button"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Tampilkan Semua Produk
            </button>
          </div>
        )}
      </div>

      <ProductModal
        product={selected}
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </section>
  );
}
