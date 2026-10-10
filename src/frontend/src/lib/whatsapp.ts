import { formatRupiah } from "@/lib/format";
import type { Product } from "@/types/product";

/**
 * Nomor WhatsApp toko — konfigurasi di satu tempat.
 * Gunakan format internasional tanpa tanda "+" (mis. 6281234567890).
 */
export const STORE_WHATSAPP_NUMBER = "6281234567890";

export const STORE_NAME = "Rumah Mode";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppUrl(product: Product): string {
  const lines = [
    `Halo ${STORE_NAME}, saya ingin membeli:`,
    "",
    `Produk: ${product.name}`,
    `Kategori: ${product.category}`,
    `Harga: ${formatRupiah(product.price)}`,
    "",
    "Apakah stok masih tersedia?",
  ];
  return buildWhatsAppUrl(lines.join("\n"));
}

export function generalWhatsAppUrl(): string {
  return buildWhatsAppUrl(
    `Halo ${STORE_NAME}, saya ingin bertanya tentang koleksi baju terbaru.`,
  );
}
