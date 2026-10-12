import { dbFindPopularReview } from "@/lib/repositories/profile.repo";
import ExploreWithUs from "./(public)/home/ExploreWithUs";
import FAQ from "./(public)/home/FAQ";
import FeelComfort from "./(public)/home/FeelComfort";
import HomeHero from "./(public)/home/HomeHero";
import KeepInTouch from "./(public)/home/KeepInTouch";
import PopularTours from "./(public)/home/PopularTours";
import Reviews from "./(public)/home/Reviews";
import TravelWithUs from "./(public)/home/TravelWithUs";
import WhyChooseUs from "./(public)/home/WhyChooseUs";
import { dbFindPopularTours } from "@/lib/repositories/tour.repo";

export default async function Home() {
  const popularTours = await dbFindPopularTours();
  const tourReviews = await dbFindPopularReview();
  // console.log("tourReviews", tourReviews);
  return (
    <main>
      <HomeHero popularTours={popularTours} />
      <ExploreWithUs />
      <WhyChooseUs />
      <TravelWithUs popularTours={popularTours} />
      <FeelComfort />
      <PopularTours popularTours={popularTours} />
      <Reviews tourReviews={tourReviews} />
      <KeepInTouch />
      <FAQ />
    </main>
  );
}
