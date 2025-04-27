import { Card, CardBody } from "@heroui/card";

const BannerCard = () => {
  return (
    <Card className="max-w-[500px] bg-black/30 backdrop-blur-md mx-2 md:mx-0">
      <CardBody className="p-4 text-center space-y-3 md:p-10 ">
        <h2 className="text-[26px] md:text-5xl font-bold text-white">
          Technify Today
        </h2>
        <h4 className="text-base md:text-lg text-white">
          Your Ultimate Tech Tips & Tricks Hub
        </h4>
        <p className="text-white text-base">
          Discover the latest tech trends, tips, and tricks to enhance your
          digital experience.
        </p>
      </CardBody>
    </Card>
  );
};

export default BannerCard;
