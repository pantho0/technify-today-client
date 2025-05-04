"use client";
import PostSetttings from "@/src/components/PostSetttings";
import { useUser } from "@/src/context/user.provider";
import { IPost } from "@/src/types";
import { Button } from "@heroui/button";
import { FileText } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePDF } from "react-to-pdf";
import { toast } from "sonner";

export const PostDetails = ({ postData }: { postData: IPost }) => {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const { toPDF, targetRef } = usePDF({
    filename: `${postData?.title}.pdf` || `page.pdf+${Date.now()}`,
    resolution: 2,
    method: "save",
    page: {
      format: "a4",
      orientation: "portrait",
      margin: 10,
    },
    canvas: {
      mimeType: "image/jpeg",
    },
  });

  const handlePdf = async () => {
    setTheme("light");
    await new Promise((resolve) => setTimeout(resolve, 500));
    toPDF();
    setTheme("dark");
    toast.success("PDF Downloaded");
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-end gap-2 ">
        <Button className="bg-[#675DD2] text-white" onPress={handlePdf}>
          Download as PDF <FileText className="animate-ping" />
        </Button>
        {user?.userId === postData.user._id && (
          <div className="">
            <PostSetttings post={postData?._id} />
          </div>
        )}
      </div>
      <div ref={targetRef} className="space-y-8">
        <h2 className="text-2xlmd:text-4xl font-semibold leading-snug">
          {postData?.title}
        </h2>
        <Image
          alt={postData?.title}
          className="w-full md:h-[550px] object-cover rounded-lg"
          height={550}
          src={postData?.image}
          width={550}
          priority
        />
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: postData?.details }}
        />
      </div>
    </div>
  );
};
