import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import CornOrigin from "../components/CornOrigin";
import VideoScene from "../components/VideoScene";
import NutritionCard from "../components/NutritionCard";
import ImageGallery1 from "../components/ImageGallery1";
import Varieties from "../components/Varieties";
import HealthBenefits from "../components/HealthBenefits";
import FullBleedImage from "../components/FullBleedImage";
import DidYouKnow from "../components/DidYouKnow";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";

export default function Home() {
  const [nutritionData, setNutritionData] = useState(null);
  const [recipesData, setRecipesData] = useState([]);
  const [varietiesData, setVarietiesData] = useState([]);

  useEffect(() => {
    // Fetch data — gracefully fall back to static data if API unavailable
    axios.get("/api/nutrition").then((r) => setNutritionData(r.data)).catch(() => {});
    axios.get("/api/recipes").then((r) => setRecipesData(r.data)).catch(() => {});
    axios.get("/api/varieties").then((r) => setVarietiesData(r.data)).catch(() => {});
  }, []);

  return (
    <main>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Origin */}
      <CornOrigin />

      {/* 3. Video Scene 1 */}
      <VideoScene
        id="video-1"
        src="/media/videos/corn-growth.mp4"
        caption="From seed to stalk — 60 to 100 days of transformation"
        textAlign="left"
      />

      {/* 4. Nutrition Facts */}
      <NutritionCard nutritionData={nutritionData} />

      {/* 5. Image Gallery 1 */}
      <ImageGallery1 />

      {/* 6. Varieties Carousel */}
      <Varieties varietiesData={varietiesData} />

      {/* 7. Video Scene 2 */}
      <VideoScene
        id="video-2"
        src="/media/videos/hero-loop.mp4"
        caption="Harvested by hand, grown with purpose"
        textAlign="right"
      />

      {/* 8. Health Benefits */}
      <HealthBenefits />

      {/* 9. Full Bleed Image */}
      <FullBleedImage />

      {/* 10. Did You Know */}
      <DidYouKnow />

      {/* 11. Recipes */}
      <RecipeCard recipesData={recipesData} />

      {/* 12. Footer */}
      <Footer />
    </main>
  );
}
