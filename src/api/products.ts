import API from "../lib/axios";

export const getProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data; // trả về mảng products
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // fallback khi lỗi
  }
};
