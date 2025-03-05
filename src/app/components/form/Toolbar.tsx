"use client";
import React from "react";
import { Editor } from "@tiptap/react";
import { Bold } from "lucide-react";

interface ToolbarOptionsProps {
  editor: Editor;
  content: string;
}

const Toolbar: React.FC<ToolbarOptionsProps> = ({ editor, content }) => {
  if (!editor) return null;

  return (
    <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700">
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
