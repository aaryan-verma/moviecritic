import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://moviecritic-7u9x.onrender.com/",
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
