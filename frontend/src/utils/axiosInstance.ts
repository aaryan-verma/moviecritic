import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "http://13.202.230.102/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
