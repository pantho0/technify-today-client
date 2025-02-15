import axios from "axios";

import { envConfig } from "@/src/config/envConfig";

const axiosInstance = axios.create({
  baseURL: envConfig.backendUrl,
});

export default axiosInstance;
