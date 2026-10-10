import { FeaturesSection } from "@/components/FeaturesSection";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductCatalog } from "@/components/ProductCatalog";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <ProductCatalog />
        <FeaturesSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
