import axios from 'axios';

type TokenProvider = () => Promise<string | null>;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let tokenProvider: TokenProvider | null = null;

/**
 * Clerk session tokens are short-lived. Keep the provider rather than a
 * token value so every request can use Clerk's current (possibly refreshed)
 * session token.
 */
export const setTokenProvider = (provider: TokenProvider | null) => {
  tokenProvider = provider;
};

axiosInstance.interceptors.request.use(async (config) => {
  if (!tokenProvider) return config;

  const token = await tokenProvider();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  } else {
    config.headers.delete('Authorization');
  }

  return config;
});

axiosInstance.interceptors.response.use(undefined, async (error) => {
  const config = error.config as (typeof error.config & {
    _clerkRetried?: boolean;
  }) | undefined;

  if (
    error.response?.status !== 401 ||
    !config ||
    config._clerkRetried ||
    !tokenProvider
  ) {
    return Promise.reject(error);
  }

  const token = await tokenProvider();
  if (!token) return Promise.reject(error);

  config._clerkRetried = true;
  config.headers.set('Authorization', `Bearer ${token}`);
  return axiosInstance(config);
});

export default axiosInstance;
