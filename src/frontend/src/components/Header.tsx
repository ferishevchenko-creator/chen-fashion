import { cn } from "@/lib/utils";
import { STORE_NAME } from "@/lib/whatsapp";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Produk", href: "#produk" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-ocid="header.section"
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur transition-smooth",
        isScrolled && "shadow-subtle",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <a
          href="#beranda"
          data-ocid="header.link"
          className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ShoppingBag className="size-4" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            {STORE_NAME}
          </span>
        </a>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid="header.link"
              className="text-sm font-medium text-muted-foreground transition-smooth hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full px-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#produk"
            data-ocid="header.primary_button"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline-flex"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            Lihat Koleksi
          </a>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
            data-ocid="header.toggle"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-smooth hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            {isOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          aria-label="Navigasi seluler"
          className="border-t border-border bg-card px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  data-ocid="header.link"
                  className="block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-smooth hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
