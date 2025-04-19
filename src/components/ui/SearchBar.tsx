"use client";

import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { SearchIcon } from "@/src/components/icons";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchBar = () => {
  const { handleSubmit, watch, register } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("search")}
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          endContent={
            <Kbd className="hidden lg:inline-block" keys={["command"]}>
              K
            </Kbd>
          }
          labelPlacement="outside"
          placeholder="Search..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
        />
      </form>
    </>
  );
};

export default SearchBar;
