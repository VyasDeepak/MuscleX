import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://194.163.183.111:8000',
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 👉 Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get token from Zustand store

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 👉 Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear session and redirect to login
      // const store = useUserStore.getState();
      // store.logout();
      // console.warn("Unauthorized - redirecting to login");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
