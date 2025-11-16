import axios from "axios";

const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const api = axios.create({
  baseURL: "https://food-lover-api-server.vercel.app",
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export default api;
