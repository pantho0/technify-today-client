"use client";

import { Button } from "@heroui/button";
import React from "react";

import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";

const CreatePostPage = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="p-10">
      <p className="text-center text-2xl font-bold">Create Post</p>
      <div>
        <TTForm onSubmit={onSubmit}>
          <div className="p-2">
            <TTInput label="Title" name="title" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            <TTInput label="Title" name="title" />
          </div>
          <div className="w-1/2 mx-auto p-2">
            <Button type="submit" size="lg" className="w-full">
              Create
            </Button>
          </div>
        </TTForm>
      </div>
    </div>
  );
};

export default CreatePostPage;
