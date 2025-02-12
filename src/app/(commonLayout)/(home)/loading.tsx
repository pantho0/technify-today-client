import PostSkeleton from "@/src/components/ui/PostSkeleton";

const loading = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {[...Array(9)].map((idx) => (
          <PostSkeleton key={idx} />
        ))}
      </div>
    </>
  );
};

export default loading;
