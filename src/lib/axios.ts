import axios from "axios";

// Tạo instance Axios để tái sử dụng
const API = axios.create({
  baseURL: "https://e-commerce-api-mock.vercel.app/api/v1",
  timeout: 5000,
});

export default API;
