import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { LocationSection } from "./components/LocationSection";
import { PhotoGallery } from "./components/PhotoGallery";
import { QuickLinks } from "./components/QuickLinks";
import { RestaurantInfo } from "./components/RestaurantInfo";
import { Seo } from "./components/Seo";

export default function App() {
  return (
    <>
      <Seo />
      <Hero />
      <main>
        <QuickLinks />
        <PhotoGallery />
        <RestaurantInfo />
        <LocationSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
