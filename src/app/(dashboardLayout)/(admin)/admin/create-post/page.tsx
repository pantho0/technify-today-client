"use client";

import { Button } from "@heroui/button";
import React from "react";

import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import TTSelect from "@/src/components/form/TTSelect";
import { postCategories } from "@/src/constants";
import { Select, SelectItem } from "@heroui/select";


export const animals = [
  {key: "cat", label: "Cat"},
  {key: "dog", label: "Dog"},
  {key: "elephant", label: "Elephant"},
  {key: "lion", label: "Lion"},
  {key: "tiger", label: "Tiger"},
  {key: "giraffe", label: "Giraffe"},
  {key: "dolphin", label: "Dolphin"},
  {key: "penguin", label: "Penguin"},
  {key: "zebra", label: "Zebra"},
  {key: "shark", label: "Shark"},
  {key: "whale", label: "Whale"},
  {key: "otter", label: "Otter"},
  {key: "crocodile", label: "Crocodile"},
];


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
            <TTSelect
              label="Category"
              name="category"
              options={postCategories}
            />
            <TTSelect
              label="Category"
              name="premium"
              options={postCategories}
            />

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
