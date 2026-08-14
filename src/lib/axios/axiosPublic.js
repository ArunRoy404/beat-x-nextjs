import axios from "axios";
import { env } from "@/config/env";
import { normalizeAxiosError } from "./normalizeAxiosError";

/**
 * For endpoints that don't require an access token (login, register, public
 * browse/search endpoints, etc). Never attaches an Authorization header.
 */
export const axiosPublic = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { "Content-Type": "application/json" },
});

axiosPublic.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeAxiosError(error))
);

export default axiosPublic;
