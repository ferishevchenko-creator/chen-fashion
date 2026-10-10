import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { SiWhatsapp } from "react-icons/si";

export function FloatingWhatsApp() {
  return (
    <a
      href={generalWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi toko melalui WhatsApp"
      data-ocid="whatsapp.primary_button"
      className="fixed bottom-6 right-6 z-50 inline-flex size-14 animate-pulse-soft items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elevated transition-smooth hover:scale-105 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <SiWhatsapp className="size-6" aria-hidden="true" />
    </a>
  );
}
