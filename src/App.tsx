import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Footer } from "./components/Footer";
import { LocationSection } from "./components/LocationSection";
import { PhotoGallery } from "./components/PhotoGallery";
import { QuickLinks } from "./components/QuickLinks";
import { RestaurantInfo } from "./components/RestaurantInfo";
import { Seo } from "./components/Seo";

export default function App() {
  return (
    <>
      <Seo />
      <main>
        <QuickLinks />
        <RestaurantInfo />
        <PhotoGallery />
        <LocationSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
