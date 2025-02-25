"use client";

import { Button } from "@heroui/button";

import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import TTSelect from "@/src/components/form/TTSelect";
import { postCategories, postStatus } from "@/src/constants";
import CkEditor from "@/src/components/form/CkEditor";
import { useState } from "react";

const CreatePostPage = () => {
  const [editorData, setEditorData] = useState<string>("");
  const [data, setData] = useState<string>("");

  const handleOnUpdate = (editor: string, field: string): void => {
    if (field === "description") {
      console.log("Editor data field:", editor);
      setData(editor);
    }
  };

  const onSubmit = (postInfo: any) => {
    postInfo.isPremium = postInfo?.isPremium === "true";

    const postData = {
      ...postInfo,
      details: data,
    };

    console.log(postData);
  };

  return (
    <div className="max-w-7xl mx-auto p-10">
      <TTForm onSubmit={onSubmit}>
        <div className="space-y-4">
          <TTInput label="Title" name="title" />
          <div className="grid grid-cols-2 gap-4">
            <TTSelect
              label="Category"
              name="category"
              options={postCategories}
            />
            <TTSelect
              label="Is Premium"
              name="isPremium"
              options={postStatus}
            />
          </div>

          <CkEditor
            editorData={editorData}
            setEditorData={setEditorData}
            handleOnUpdate={handleOnUpdate}
          />

          <div
            className="text-black"
            dangerouslySetInnerHTML={{ __html: data }}
          />

          <div className="w-1/2 mx-auto p-2">
            <Button className="w-full" size="lg" type="submit">
              Create
            </Button>
          </div>
        </div>
      </TTForm>
    </div>
  );
};

export default CreatePostPage;
