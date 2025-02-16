import { Spinner } from "@heroui/spinner";

const Loading = () => {
  return (
    <div className="h-screen fixed inset-0 bg-black/10 backdrop-blur-md z-[999] flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loading;
