import axiosClient from "../utils/axiosClient";

// export const getAllProducts = async () => {
//   const res = await axios.get("http://127.0.0.1:3000/api/products");
//   return res.data.data.data;
// };

export const getHomeProducts = async () => {
  try {
    const res = await axiosClient.get("/view");
    return res.data.data;
  } catch (error) {
    console.error("Erro get home product:", error);
    return null;
  }
};

export const getDetailProduct = async (slug: string) => {
  try {
    const res = await axiosClient.get(`/view/${slug}`);

    return res.data.data.product;
  } catch (error) {
    console.error("Erro get product by slug:", error);
    return null;
  }
};

export const getProductByCategory = async (slug: string) => {
  try {
    const res = await axiosClient.get(`/api/products/category/${slug}`);
    return res.data.data.products;
  } catch (error) {
    console.error("Erro get product by slug:", error);
    return null;
  }
};
