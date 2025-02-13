import Image from "next/image";

const CommentCard = () => {
  return (
    <div className="flex gap-3 border border-foreground/20 rounded-lg p-3">
      <div className="w-14 h-14">
        <Image
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          alt="user"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex-1">
        <p className="font-semibold">John Does</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus possimus sequi ipsam inventore aperiam distinctio
          placeat excepturi illum tenetur expedita
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
