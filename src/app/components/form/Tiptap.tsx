"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import { useEffect, useCallback } from "react";

const Tiptap = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) => {
  const handleChange = useCallback(
    (newContent: string) => {
      onChange(newContent);
    },
    [onChange]
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Blockquote,
      CodeBlock.configure({
        exitOnTripleEnter: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 bg-white text-black item-start w-full gap-3 font-medium text-[15px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      handleChange(html);
    },
    parseOptions: {
      preserveWhitespace: true,
    },
  });

  // Handle initial content and updates
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content, false, {
        preserveWhitespace: true,
      });
    }
  }, [editor, content]);

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor!} content={content} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
