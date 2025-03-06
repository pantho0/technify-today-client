import Image from "next/image";

const CommentCard = ({ comment }: { comment: any }) => {
  return (
    <div className="flex gap-3 border border-foreground/20 rounded-lg p-3">
      <div className="w-14 h-14">
        <Image
          alt="user"
          className="rounded-full"
          height={40}
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          width={40}
        />
      </div>
      <div className="flex-1">
        <p className="font-semibold">John Does</p>
        <p>{comment?.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
