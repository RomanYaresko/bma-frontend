import { BACKEND_BASE_URL } from "@/constants";
import { tokenService } from "@/services/token";
import type {
  AxiosInstance,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

const useTokenService = tokenService();
const apiBaseURL = BACKEND_BASE_URL;

const apiInstance: AxiosInstance = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
} as CreateAxiosDefaults);

apiInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await useTokenService.get();

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  }
);

export { apiBaseURL, apiInstance };
