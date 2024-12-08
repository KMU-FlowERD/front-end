import axios from 'axios';

import { useAuthStore } from '@/features/auth';

axios.interceptors.request.use(
  (config) => {
    const nextConfig = { ...config };
    const { accessToken } = useAuthStore.getState();
    if (accessToken) nextConfig.headers.Authorization = `Bearer ${accessToken}`;
    return nextConfig;
  },
  (error) => Promise.reject(error),
);
