import { Card, CardBody } from "@heroui/card";

const BannerCard = () => {
  return (
    <Card className="max-w-[500px]  bg-black/30 backdrop-blur-md">
      <CardBody className="text-center space-y-3 p-10">
        <h2 className="text-5xl font-bold">Technify Today</h2>
        <h4 className="text-lg">Your Ultimate Tech Tips & Tricks Hub</h4>
        <p>
          Discover the latest tech trends, tips, and tricks to enhance your
          digital experience.
        </p>
      </CardBody>
    </Card>
  );
};

export default BannerCard;
