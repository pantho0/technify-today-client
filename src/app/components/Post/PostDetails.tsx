"use client";
import { Button } from "@heroui/button";
import Image from "next/image";
import { usePDF } from "react-to-pdf";

export const PostDetails = ({ postData }: { postData: any }) => {
  const { toPDF, targetRef } = usePDF({
    filename: `${postData?.title}.pdf` || `page.pdf+${Date.now()}`,
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
  return (
    <div>
      <Button onPress={() => toPDF()}>Download as PDF</Button>
      <div ref={targetRef} className="space-y-8">
        <h2 className="text-4xl font-semibold leading-snug">
          {postData?.title}
        </h2>
        <Image
          alt={postData?.title}
          className="w-full h-[500px] object-cover rounded-lg"
          height={600}
          src={postData?.image}
          width={600}
        />
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: postData?.details }}
        />
      </div>
    </div>
  );
};
