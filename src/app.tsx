import { Banner } from "./components/banner";
import { CallToAction } from "./components/call-to-action";
import { Faqs } from "./components/faqs";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { LogoTicker } from "./components/logo-ticker";
import { Navbar } from "./components/navbar";
import { ProductShowcase } from "./components/product-showcase";

export function App() {
  return (
    <div className="min-h-screen antialiased">
      {/* Fixed header */}
      <div className="fixed left-0 right-0 top-0 z-50">
        <Banner />
        <Navbar />
      </div>

      {/* Main content with top padding (height of Banner + Navbar) */}
      <div className="pt-[120px]">
        <Hero />
        <LogoTicker />
        <Features />
        <ProductShowcase />
        <Faqs />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}
