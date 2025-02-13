/* eslint-disable prettier/prettier */

import { envConfig } from "./../../config/envConfig";

import { delay } from "@/src/utils/delay";

const getLatestPosts = async () => {
  const fetchOptions = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.backendUrl}/posts?sort=-createdAt`,
    fetchOptions
  );

  await delay(2000);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export default getLatestPosts;
