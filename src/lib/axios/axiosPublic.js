import axios from "axios";
import { normalizeAxiosError } from "./normalizeAxiosError";
import { getApiBaseUrl } from "./getApiBaseUrl";

/**
 * For endpoints that don't require an access token (login, register, public
 * browse/search endpoints, etc). Never attaches an Authorization header.
 */
export const axiosPublic = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { "Content-Type": "application/json" },
});

axiosPublic.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeAxiosError(error))
);

export default axiosPublic;
