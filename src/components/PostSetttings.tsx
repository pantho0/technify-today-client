import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { EllipsisVertical } from "lucide-react";
import { useUser } from "@/src/context/user.provider";
import { useDeletePost } from "../hooks/post.hooks";

const PostSetttings = ({ post }: { post: string }) => {
  const { user } = useUser();
  const { mutate: deletePost } = useDeletePost();
  const handleDelete = (id: string) => {
    deletePost(id);
  };
  return (
    <Dropdown backdrop="blur">
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
        <DropdownItem key="edit" href={`/${user?.role}/update-post/${post}`}>
          Edit Post
        </DropdownItem>
        <DropdownItem
          onPress={() => handleDelete(post)}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Delete Post
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostSetttings;
