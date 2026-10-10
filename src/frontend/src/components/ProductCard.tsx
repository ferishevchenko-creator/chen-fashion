import { discountPercent, formatRupiah } from "@/lib/format";
import { productWhatsAppUrl } from "@/lib/whatsapp";
import { CATEGORY_LABELS, type Product } from "@/types/product";
import { MessageCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
  onOpen: (product: Product) => void;
}

export function ProductCard({ product, index, onOpen }: ProductCardProps) {
  const discount = product.originalPrice
    ? discountPercent(product.price, product.originalPrice)
    : 0;

  return (
    <article
      data-ocid={`catalog.item.${index + 1}`}
      className="group flex animate-float-in flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        type="button"
        onClick={() => onOpen(product)}
        aria-label={`Lihat detail ${product.name}`}
        data-ocid={`catalog.open_modal_button.${index + 1}`}
        className="relative block aspect-[4/5] w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-smooth group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-elevated">
            {discount}% Off
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {CATEGORY_LABELS[product.category]}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-foreground">
            {product.name}
          </h3>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-primary">
            {formatRupiah(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatRupiah(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onOpen(product)}
            data-ocid={`catalog.secondary_button.${index + 1}`}
            className="flex-1 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-smooth hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Detail
          </button>
          <a
            href={productWhatsAppUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid={`catalog.primary_button.${index + 1}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-whatsapp-foreground transition-smooth hover:brightness-95 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Beli
          </a>
        </div>
      </div>
    </article>
  );
}
