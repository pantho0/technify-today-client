import BannerCard from "@/src/components/home/BannerCard";
import LatestPostPage from "./_components/LatestPostPage";

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="relative h-[70vh] md:h-screen bg-[url('/Banner.png')] bg-cover bg-center bg-no-repeat rounded-3xl">
        <div className="absolute inset-0 flex justify-center items-center">
          <BannerCard />
        </div>
      </div>

      <div className="container mx-auto">
        <LatestPostPage />
      </div>
    </div>
  );
}
