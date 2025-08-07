import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});
//gắn token tự động
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
    }
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

export const ApiService = {
  get<T = any>(api: string, config?: AxiosRequestConfig) {
    return apiClient.get<T>(api, config);
  },
  post<T = any>(api: string, data?: any, config?: AxiosRequestConfig) {
    return apiClient.post<T>(api, data, config);
  },
  put<T = any>(api: string, data?: any, config?: AxiosRequestConfig) {
    return apiClient.put<T>(api, data, config);
  },
  delete<T = any>(api: string, config?: AxiosRequestConfig) {
    return apiClient.delete<T>(api, config);
  },
};
