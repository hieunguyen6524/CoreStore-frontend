import axios from "axios";

export const getAllCategories = async () => {
  const res = await axios.get("http://127.0.0.1:3000/api/categories");
  return res.data.data.data;
};
