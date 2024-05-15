import axios, { HttpStatusCode } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === HttpStatusCode.Unauthorized) {
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
  }
);

export default apiClient;
