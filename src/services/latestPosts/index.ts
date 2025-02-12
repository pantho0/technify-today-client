/* eslint-disable prettier/prettier */

import { delay } from "@/src/utils/delay";
import { envConfig } from "./../../config/envConfig";

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

  return res.json();
};

export default getLatestPosts;
