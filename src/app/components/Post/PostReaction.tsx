import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Heart, ThumbsDown } from "lucide-react";

export const PostReaction = (props) => {
  return (
    <div className="flex items-center gap-2 gap-2">
      <Tooltip className="rounded-full" content="Up vote">
        <Button className="rounded-full" color="primary" variant="flat">
          <Heart />
        </Button>
      </Tooltip>
      <Tooltip className="rounded-full" content="Down vote">
        <Button className="rounded-full" color="primary" variant="flat">
          <ThumbsDown />
        </Button>
      </Tooltip>
    </div>
  );
};
