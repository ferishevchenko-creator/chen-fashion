import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { discountPercent, formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { productWhatsAppUrl } from "@/lib/whatsapp";
import { CATEGORY_LABELS, type Product } from "@/types/product";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({
  product,
  open,
  onOpenChange,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!product) return null;

  const discount = product.originalPrice
    ? discountPercent(product.price, product.originalPrice)
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-ocid="product.modal"
        className="max-h-[90vh] overflow-y-auto rounded-2xl border-border bg-card p-0 shadow-elevated sm:max-w-2xl"
      >
        <div className="grid gap-0 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none">
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-cover"
            />
            {discount > 0 && (
              <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-elevated">
                {discount}% Off
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4 p-6">
            <DialogHeader className="text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {CATEGORY_LABELS[product.category]}
              </p>
              <DialogTitle className="font-display text-2xl font-bold leading-tight text-foreground">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-primary">
                {formatRupiah(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatRupiah(product.originalPrice)}
                </span>
              )}
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Ukuran
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    data-ocid="product.toggle"
                    className={cn(
                      "min-w-11 rounded-full border px-3 py-1.5 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/40",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Warna
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    aria-pressed={selectedColor === color}
                    data-ocid="product.toggle"
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selectedColor === color
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/40",
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={productWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="product.primary_button"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-whatsapp-foreground transition-smooth hover:brightness-95 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Beli Sekarang via WhatsApp
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
