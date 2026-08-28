import FeaturedCollection from "@/components/ui/shared/FeaturedCollection";
import HeroSection from "@/components/ui/shared/HeroSection";
import NewArrivalsSection from "@/components/ui/shared/NewArrivalsSection";
import ShopByCategory from "@/components/ui/shared/ShopByCategory";
import DiscoverCollections from "@/components/ui/shared/DiscoverCollections";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <HeroSection />
      <ShopByCategory />
      <NewArrivalsSection />
      
      <FeaturedCollection/>
    </main>
  );
}
