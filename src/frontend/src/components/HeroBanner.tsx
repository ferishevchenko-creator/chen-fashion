import { cn } from "@/lib/utils";
import { ArrowRight, Tag } from "lucide-react";
import { useEffect, useState } from "react";

interface Slide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
}

const SLIDES: Slide[] = [
  {
    id: "promo-50",
    badge: "Diskon 50%",
    title: "Koleksi Musim Ini",
    subtitle:
      "Tampil percaya diri dengan koleksi terbaru Rumah Mode. Potongan rapi, bahan nyaman, harga bersahabat.",
    cta: "Belanja Sekarang",
  },
  {
    id: "promo-baru",
    badge: "Baru Tiba",
    title: "Gaya Editorial",
    subtitle:
      "Padukan atasan dan bawahan pilihan untuk tampilan yang selalu relevan, dari kasual hingga formal.",
    cta: "Lihat Koleksi",
  },
  {
    id: "promo-keluarga",
    badge: "Untuk Keluarga",
    title: "Pria, Wanita & Anak",
    subtitle:
      "Satu toko untuk seluruh keluarga. Pilih gaya favorit dan pesan langsung melalui WhatsApp.",
    cta: "Jelajahi Katalog",
  },
];

export function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const slide = SLIDES[active];

  return (
    <section
      id="beranda"
      data-ocid="hero.section"
      className="relative overflow-hidden"
    >
      <img
        src="/assets/generated/hero-banner.dim_1600x900.jpg"
        alt="Model mengenakan blazer terracotta dari koleksi Rumah Mode di studio dengan latar kain krem"
        className="absolute inset-0 size-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[520px] max-w-6xl flex-col justify-center px-4 py-20 md:min-h-[600px] md:px-6">
        <div key={slide.id} className="max-w-xl animate-slide-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-elevated">
            <Tag className="size-3.5" aria-hidden="true" />
            {slide.badge}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            {slide.subtitle}
          </p>
          <a
            href="#produk"
            data-ocid="hero.primary_button"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {slide.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div
          className="mt-10 flex gap-2"
          role="tablist"
          aria-label="Slide promosi"
        >
          {SLIDES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Tampilkan slide ${item.title}`}
              onClick={() => setActive(index)}
              data-ocid={`hero.tab.${index + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                index === active
                  ? "w-10 bg-primary-foreground"
                  : "w-5 bg-primary-foreground/40 hover:bg-primary-foreground/70",
              )}
            />
          ))}
        </div>
      </div>

      <div
        className="absolute right-6 top-8 hidden size-28 rotate-6 items-center justify-center rounded-full bg-primary text-center font-display text-lg font-bold leading-tight text-primary-foreground shadow-elevated md:flex lg:right-16 lg:top-16 lg:size-32"
        aria-hidden="true"
      >
        Diskon
        <br />
        50%
      </div>
    </section>
  );
}
