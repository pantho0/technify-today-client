import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { EllipsisVertical } from "lucide-react";
import { useUser } from "@/src/context/user.provider";

const PostSetttings = () => {
  const { user } = useUser();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="flat"
          className=" text-white bg-primary px-2 py-1 rounded-md"
        >
          <EllipsisVertical className="size-40" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit">Edit Post</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete Post
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostSetttings;
