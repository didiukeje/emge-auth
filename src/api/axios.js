import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com", // Base URL for all requests
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Add interceptors if needed (e.g., for handling errors globally)
api.interceptors.response.use(
  (response) => response.data, // Return only the data from the response
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;