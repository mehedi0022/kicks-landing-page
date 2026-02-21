import Hero from "@/components/sections/Hero";
import NewDrops from "@/components/sections/NewDrops";
import Categories from "@/components/sections/Categories";
import Reviews from "@/components/sections/Reviews";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E7E7E3] selection:bg-blue-500 selection:text-white">
      <Hero />
      <NewDrops />
      <Categories />
      <Reviews />
    </div>
  );
}
