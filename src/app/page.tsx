import FeaturedCollection from "@/components/ui/shared/FeaturedCollection";
import HeroSection from "@/components/ui/shared/HeroSection";
import NewArrivalsSection from "@/components/ui/shared/NewArrivalsSection";
import ShopByCategory from "@/components/ui/shared/ShopByCategory";
import DiscoverCollections from "@/components/ui/shared/DiscoverCollections";
import BestSellers from "@/components/ui/shared/BestSellers";
import DealsSection from "@/components/ui/shared/DealsSection";
import Testimonials from "@/components/ui/shared/Testimonials";
import Newsletter from "@/components/ui/shared/Newsletter";
import Partnership from "@/components/ui/shared/Partnership";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 overflow-x-hidden">
      <HeroSection />
      <ShopByCategory />
      <NewArrivalsSection />
      
      <FeaturedCollection/>
      <BestSellers/>
      <DealsSection/>
      <Testimonials/>
      <Partnership/>
      <Newsletter/>
    </main>
  );
}
