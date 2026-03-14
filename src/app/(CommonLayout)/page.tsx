import ChefStory from "@/src/components/ChefStory";
import Features from "@/src/components/Features";
import { HeroSection } from "@/src/components/HeroSection";
import MealGrid from "@/src/components/MealGrid";
import Newsletter from "@/src/components/Newsletter";
import Testimonials from "@/src/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen  items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <Features />
      <div className="max-w-6xl mx-auto">
        <MealGrid limit={6} />
      </div>
      <ChefStory />
      <Testimonials />
      <Newsletter />
    </div>
  );
}