export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function discountPercent(price: number, originalPrice: number): number {
  if (originalPrice <= 0 || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
