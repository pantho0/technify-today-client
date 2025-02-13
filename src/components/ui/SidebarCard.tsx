import { IUser } from "@/src/types";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import Image from "next/image";

const SidebarCard = ({ authorInfo }: { authorInfo: IUser }) => {
  console.log(authorInfo);
  return (
    <Card className="max-w-[350px]">
      <CardHeader className="flex gap-3">
        <Image
          alt={authorInfo?.fullName}
          height={40}
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          width={40}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-md">{authorInfo?.fullName}</p>
          <p className="text-small text-default-500">Author</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>
          Technify Today delivers expert tech tips & tricks to simplify your
          digital experience. Stay ahead with our latest guides and insights!
        </p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/heroui-inc/heroui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SidebarCard;
