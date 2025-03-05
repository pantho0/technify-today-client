"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";

const Tiptap = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline, Blockquote],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 bg-white text-black item-start w-full gap-3 font-medium text-[15px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor!} content={content} />
      <EditorContent editor={editor} style={{ whiteSpace: "pre-line" }} />
    </div>
  );
};

export default Tiptap;
