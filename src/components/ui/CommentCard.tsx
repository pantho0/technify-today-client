import Image from "next/image";

const CommentCard = ({ comment }: { comment: any }) => {
  return (
    <div className="flex gap-3 border border-foreground/20 rounded-lg p-3">
      <div className="w-14 h-14">
        <Image
          alt="user"
          className="rounded-full"
          height={40}
          src={comment?.user?.profileImage}
          width={40}
        />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{comment?.user?.fullName}</p>
        <p>{comment?.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
