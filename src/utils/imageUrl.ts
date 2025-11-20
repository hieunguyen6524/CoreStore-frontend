const API_BASE_URL = "http://127.0.0.1:3000";

export const getProductImageUrl = (thumbnail: string): string => {
  if (!thumbnail) return "";
  // Nếu đã là URL đầy đủ thì trả về nguyên
  if (thumbnail.startsWith("http://") || thumbnail.startsWith("https://")) {
    return thumbnail;
  }
  // Nếu chỉ là tên file thì thêm đường dẫn local
  return `${API_BASE_URL}/img/products/${thumbnail}`;
};

export const getUserImageUrl = (avatar: string): string => {
  if (!avatar) return `${API_BASE_URL}/img/users/default.jpg`;
  // Nếu đã là URL đầy đủ thì trả về nguyên
  if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
    return avatar;
  }
  // Nếu chỉ là tên file thì thêm đường dẫn local
  return `${API_BASE_URL}/img/users/${avatar}`;
};

export const getImageUrl = (path: string, type: "products" | "users" = "products"): string => {
  if (!path) return type === "users" ? `${API_BASE_URL}/img/users/default.jpg` : "";
  // Nếu đã là URL đầy đủ thì trả về nguyên
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Nếu chỉ là tên file thì thêm đường dẫn local
  return `${API_BASE_URL}/img/${type}/${path}`;
};

