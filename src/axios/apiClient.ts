import { TOKEN } from "@/utils/constant";
import Axios from "axios";

const apiClient = Axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
