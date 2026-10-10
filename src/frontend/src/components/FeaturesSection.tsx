import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";

const FEATURES = [
  {
    id: "shipping",
    icon: Truck,
    title: "Pengiriman Cepat",
    description:
      "Pesanan diproses hari yang sama dan dikirim ke seluruh Indonesia dengan aman.",
  },
  {
    id: "quality",
    icon: BadgeCheck,
    title: "Kualitas Terjamin",
    description:
      "Setiap produk dipilih dengan teliti — bahan nyaman dan jahitan rapi.",
  },
  {
    id: "payment",
    icon: ShieldCheck,
    title: "Pembayaran Aman",
    description:
      "Transaksi langsung dengan admin toko melalui WhatsApp, tanpa perantara.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="tentang"
      data-ocid="features.section"
      className="border-y border-border bg-muted/40 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Kenapa Rumah Mode
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Belanja Tenang, Gaya Terjaga
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Kami percaya belanja baju seharusnya sederhana. Pilih produk, tanya
            admin, dan pesan langsung — tanpa langkah berbelit.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                data-ocid="features.card"
                className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-subtle transition-smooth hover:shadow-elevated"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
