import axios from "axios";

// export const getAllProducts = async () => {
//   const res = await axios.get("http://127.0.0.1:3000/api/products");
//   return res.data.data.data;
// };

export const getHomeProducts = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:3000/view");
    return res.data.data;
  } catch (error) {
    console.error("Erro get home product:", error);
    return null;
  }
};

export const getDetailProduct = async (slug: string) => {
  try {
    const res = await axios.get(`http://127.0.0.1:3000/view/${slug}`);

    return res.data.data.product;
  } catch (error) {
    console.error("Erro get product by slug:", error);
    return null;
  }
};
