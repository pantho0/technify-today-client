import BannerCard from "@/src/components/home/BannerCard";

export default function Home() {
  return (
    <div className="bg-[url('/Banner.png')] bg-cover bg-center bg-no-repeat h-screen rounded-3xl inset-0">
      <div className="flex justify-center items-center h-screen">
        <BannerCard />
      </div>
    </div>
  );
}
