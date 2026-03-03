import ChefStory from "@/src/components/ChefStory";
import Features from "@/src/components/Features";
import { HeroSection } from "@/src/components/HeroSection";

export default function Home() {
  return (
    <div className=" min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection></HeroSection>
      <Features></Features>
      <ChefStory></ChefStory>
    </div>
  );
}




