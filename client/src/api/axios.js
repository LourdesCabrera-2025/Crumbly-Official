import axios from "axios";
import { auth } from "../firebase/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Interceptor para agregar el token
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

