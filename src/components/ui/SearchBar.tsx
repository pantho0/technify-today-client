"use client";

import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { SearchIcon } from "@/src/components/icons";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/useDebounce.hook";
import { useSearchPost } from "@/src/hooks/post.hooks";
import { useEffect, useState } from "react";
import { IPost } from "@/src/types";
import { Link } from "@heroui/link";

const SearchBar = () => {
  const { handleSubmit, watch, register } = useForm();
  const { mutate: handleSearch, data, isPending, isSuccess } = useSearchPost();
  const [searchResult, setSearchResult] = useState([]);

  const searchTerm = useDebounce(watch("search"));

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResult([]);
    }
    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResult(data?.data?.result);
    }
  }, [isPending, isSuccess, data, searchTerm]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div>
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
          autoComplete="off"
          placeholder="Search..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
        />

        {searchResult.length > 0 && (
          <div className="absolute  mx-6 right-0 mt-2  bg-gray-200 backdrop-blur-md border border-gray-200 shadow-lg rounded-md max-h-80 overflow-y-auto z-50 p-3">
            {searchResult.map((post: IPost, idx) => (
              <div key={post._id || idx}>
                <Link href={`/posts/${post._id}`} key={post._id || idx}>
                  <div className=" flex items-center gap-3 p-2 text-black hover:bg-primary hover:text-white cursor-pointer rounded-md transition-all">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-10 h-10 rounded object-cover border"
                    />
                    <p className="text-sm font-medium line-clamp-2">
                      {post?.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {isPending && (
          <div className="absolute  md:right-40 mt-2 md:mx-0 bg-gray-200 backdrop-blur-md border border-gray-200 shadow-lg rounded-md max-h-80 overflow-y-auto z-50 p-3">
            <div className="w-full block">
              <p className="text-sm text-black">Searching...</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
