import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Banner } from "./components/banner";
import { CallToAction } from "./components/call-to-action";
import { Faqs } from "./components/faqs";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { LogoTicker } from "./components/logo-ticker";
import { ProductShowcase } from "./components/product-showcase";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar";

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white antialiased">
        {/* Fixed header */}
        <div className="fixed left-0 right-0 top-0 z-50">
          <Banner />
          <Navbar />
        </div>

        {/* Routes with top padding (account for Banner + Navbar height) */}
        <div className="pt-[120px]">
          <Routes>
            {/* Landing Page */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <LogoTicker />
                  <Features />
                  <ProductShowcase />
                  <Faqs />
                  <CallToAction />
                  <Footer />
                </>
              }
            />

            {/* Auth & Dashboard pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
