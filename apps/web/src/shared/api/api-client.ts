import { API_URL } from '@/constants';
import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

const REFRESH_PATH = '/auth/refresh';

type RetryableRequest = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
});

const refreshSession = async (): Promise<void> => {
  await instance.post(`${REFRESH_PATH}`);
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequest | undefined;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry || originalRequest.url === REFRESH_PATH) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshSession();
      return instance(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

export { instance as apiClient };
