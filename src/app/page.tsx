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
import TrendingNow from "@/components/ui/shared/TrendingNow";
import PromoBanner from "@/components/ui/shared/PromoBanner";
import OurBrands from "@/components/ui/shared/OurBrands";
import JustForYou from "@/components/ui/shared/JustForYou";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 overflow-x-hidden">
      <HeroSection />
      <DealsSection/>
      <ShopByCategory />
      <TrendingNow />
      <PromoBanner />
      <NewArrivalsSection />
      
      {/* <FeaturedCollection/> */}
      <BestSellers/>
      <JustForYou/>
      {/* <OurBrands/> */}
      <Testimonials/>
      <Partnership/>
      <Newsletter/>
    </main>
  );
}
