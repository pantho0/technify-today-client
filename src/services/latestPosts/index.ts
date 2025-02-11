/* eslint-disable prettier/prettier */

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

  return res.json();
};

export default getLatestPosts;
