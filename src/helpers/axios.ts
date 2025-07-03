import axios from "axios";

export const createAxios = () => {
  return axios.create({
    baseURL:
      import.meta.env.VITE_BACKEND_API_URL ||
      "https://task-manager-backend-gnlm.onrender.com",
  });
};
