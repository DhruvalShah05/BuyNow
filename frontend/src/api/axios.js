// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend API
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token automatically if you store it in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // assuming token is stored here
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
