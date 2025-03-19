import axios from "axios";
import { cookies } from "next/headers";

import { envConfig } from "@/src/config/envConfig";
import { getNewAccessToken } from "@/src/services/auth";

const axiosInstance = axios.create({
  baseURL: envConfig.backendUrl,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;
    if (error?.response?.status === 401 && !config.sent) {
      config.sent = true;
      const res = await getNewAccessToken();
      const accessToken = res?.data;
      config.headers["Authorization"] = accessToken;
      (await cookies()).set("accessToken", accessToken);
      return await axiosInstance(config);
    } else if (error?.response?.status === 403) {
      (await cookies()).delete("accessToken");
      (await cookies()).delete("refreshToken");
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
