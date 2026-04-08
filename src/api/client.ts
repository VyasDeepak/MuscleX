import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useUserStore } from '../zustand/userStore';
import { isNetworkAvailable } from './network';

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
    const store = useUserStore.getState();
    store.setLoading(true);
    const token = store.refreshToken;

    // Check network availability
    const isConnected = await isNetworkAvailable();
    if (!isConnected) {
      store.setLoading(false);
      return Promise.reject({ message: 'No network connection' });
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => {
    useUserStore.getState().setLoading(false);
    return Promise.reject(error);
  },
);

// 👉 Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    useUserStore.getState().setLoading(false);
    return response;
  },
  (error: any) => {
    useUserStore.getState().setLoading(false);

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
