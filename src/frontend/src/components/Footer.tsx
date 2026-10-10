import { STORE_NAME, generalWhatsAppUrl } from "@/lib/whatsapp";
import { Instagram, Mail, MapPin, Phone, ShoppingBag } from "lucide-react";
import { SiFacebook, SiWhatsapp } from "react-icons/si";

const QUICK_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Produk", href: "#produk" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="kontak"
      data-ocid="footer.section"
      className="bg-foreground text-background"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ShoppingBag className="size-4" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              {STORE_NAME}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/70">
            Toko baju online dengan koleksi pria, wanita, dan anak. Pilih gaya
            favorit Anda dan pesan langsung melalui WhatsApp.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={generalWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi kami di WhatsApp"
              data-ocid="footer.link"
              className="flex size-10 items-center justify-center rounded-full bg-background/10 text-background transition-smooth hover:bg-whatsapp hover:text-whatsapp-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <SiWhatsapp className="size-4" aria-hidden="true" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ikuti kami di Instagram"
              data-ocid="footer.link"
              className="flex size-10 items-center justify-center rounded-full bg-background/10 text-background transition-smooth hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Instagram className="size-4" aria-hidden="true" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ikuti kami di Facebook"
              data-ocid="footer.link"
              className="flex size-10 items-center justify-center rounded-full bg-background/10 text-background transition-smooth hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <SiFacebook className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-background/60">
            Tautan Cepat
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid="footer.link"
                  className="text-sm text-background/80 transition-smooth hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-background/60">
            Kontak
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-background/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>Jl. Merdeka No. 12, Jakarta</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>+62 812-3456-7890</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>halo@rumahmode.id</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-background/60 md:flex-row md:px-6">
          <p>
            © {year} {STORE_NAME}. Seluruh hak cipta dilindungi.
          </p>
          <p>
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-smooth hover:text-background"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
