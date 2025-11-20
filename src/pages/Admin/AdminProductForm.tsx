import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/Admin/AdminLayout";
import {
  adminGetAllCategories,
  adminGetAllBrands,
  adminCreateProduct,
  adminUpdateProduct,
  adminGetAllProducts,
} from "../../services/adminService";
import type { Category } from "../../types/category";
import type { Brand } from "../../types/brand";
import type { Product } from "../../types/product";
import Loading from "../../ui/Loading";
import { ArrowLeft } from "lucide-react";
import ImageUpload, { MultipleImageUpload } from "../../components/Admin/ImageUpload";
import { getProductImageUrl } from "../../utils/imageUrl";

function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [product, setProduct] = useState<Partial<Product>>({
    name: "",
    category: "" as any,
    brand: "" as any,
    price: 0,
    discount: 0,
    stock: 1,
    thumbnail: "",
    images: [],
    description: "",
    attributes: [],
    status: "active",
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    loadCategoriesAndBrands();
    if (isEdit) {
      loadProduct();
    }
  }, [id]);

  const loadCategoriesAndBrands = async () => {
    const [cats, brs] = await Promise.all([
      adminGetAllCategories(),
      adminGetAllBrands(),
    ]);
    setCategories(cats);
    setBrands(brs);
  };

  const loadProduct = async () => {
    if (!id) return;
    setLoading(true);
    const products = await adminGetAllProducts({ limit: 1000 });
    const found = products.find((p: Product) => p._id === id);
    if (found) {
      setProduct({
        ...found,
        category: (found.category as any)._id || found.category,
        brand: (found.brand as any)._id || found.brand,
      });
      setExistingImages(found.images || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate thumbnail for create
    if (!isEdit && !thumbnailFile) {
      alert("Vui lòng chọn ảnh thumbnail!");
      setLoading(false);
      return;
    }

    if (isEdit && id) {
      // For update, send JSON object (no file upload for update yet)
      const updateData: any = {
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        description: product.description,
        status: product.status,
        thumbnail: product.thumbnail,
      };

      if (product.attributes && product.attributes.length > 0) {
        updateData.attributes = product.attributes
          .filter((attr) => attr.key && attr.value)
          .map((attr) => ({
            key: attr.key,
            value: attr.value,
          }));
      }

      const success = await adminUpdateProduct(id, updateData);
      if (success) {
        navigate("/admin/products");
      }
    } else {
      // For create, send FormData with files
      const formData = new FormData();
      formData.append("name", product.name || "");
      formData.append("category", product.category as string);
      formData.append("brand", product.brand as string);
      formData.append("price", (product.price || 0).toString());
      formData.append("discount", (product.discount || 0).toString());
      formData.append("stock", (product.stock || 1).toString());
      formData.append("description", product.description || "");
      formData.append("status", product.status || "active");

      // Append thumbnail file
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      // Append image files
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      // Append attributes
      if (product.attributes && product.attributes.length > 0) {
        product.attributes
          .filter((attr) => attr.key && attr.value)
          .forEach((attr, index) => {
            formData.append(`attributes[${index}][key]`, attr.key);
            formData.append(`attributes[${index}][value]`, attr.value);
          });
      }

      const success = await adminCreateProduct(formData);
      if (success) {
        navigate("/admin/products");
      }
    }
    setLoading(false);
  };

  const addAttribute = () => {
    setProduct({
      ...product,
      attributes: [...(product.attributes || []), { key: "", value: "", _id: "", id: "" }],
    });
  };

  const removeAttribute = (index: number) => {
    const newAttrs = product.attributes?.filter((_, i) => i !== index) || [];
    setProduct({ ...product, attributes: newAttrs });
  };

  if (loading && isEdit) return <Loading />;

  return (
    <AdminLayout>
      <div className="admin-product-form">
        <div className="admin-page-header">
          <button
            className="btn btn--secondary"
            onClick={() => navigate("/admin/products")}
          >
            <ArrowLeft size={20} />
            Quay lại
          </button>
          <h1 className="admin-page-title">
            {isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Tên sản phẩm *</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Danh mục *</label>
              <select
                value={(product.category as any)?._id || product.category || ""}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Thương hiệu *</label>
              <select
                value={(product.brand as any)?._id || product.brand || ""}
                onChange={(e) =>
                  setProduct({ ...product, brand: e.target.value })
                }
                required
              >
                <option value="">Chọn thương hiệu</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Giá (VNĐ) *</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Giảm giá (%)</label>
              <input
                type="number"
                value={product.discount}
                onChange={(e) =>
                  setProduct({ ...product, discount: Number(e.target.value) })
                }
                min="0"
                max="100"
              />
            </div>

            <div className="form-group">
              <label>Tồn kho *</label>
              <input
                type="number"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: Number(e.target.value) })
                }
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Trạng thái</label>
              <select
                value={product.status}
                onChange={(e) =>
                  setProduct({ ...product, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out of stock">Out of stock</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <ImageUpload
              label="Thumbnail *"
              value={thumbnailFile}
              preview={isEdit && product.thumbnail ? getProductImageUrl(product.thumbnail) : undefined}
              onChange={(file) => setThumbnailFile(file)}
            />
          </div>

          <div className="form-group">
            <MultipleImageUpload
              label="Ảnh sản phẩm (tối đa 10 ảnh)"
              values={imageFiles}
              previews={
                isEdit && existingImages.length > 0
                  ? existingImages.map((img) => getProductImageUrl(img))
                  : []
              }
              onChange={(files) => setImageFiles(files)}
              onRemovePreview={(index) => {
                const newImages = existingImages.filter((_, i) => i !== index);
                setExistingImages(newImages);
                setProduct({ ...product, images: newImages });
              }}
            />
          </div>

          <div className="form-group">
            <label>Mô tả *</label>
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              required
              rows={5}
            />
          </div>

          <div className="form-group">
            <div className="form-group-header">
              <label>Thuộc tính</label>
              <button
                type="button"
                className="btn btn--small"
                onClick={addAttribute}
              >
                + Thêm thuộc tính
              </button>
            </div>
            {product.attributes?.map((attr, index) => (
              <div key={index} className="attribute-row">
                <input
                  type="text"
                  placeholder="Key (VD: RAM)"
                  value={attr.key}
                  onChange={(e) => {
                    const newAttrs = [...(product.attributes || [])];
                    newAttrs[index].key = e.target.value;
                    setProduct({ ...product, attributes: newAttrs });
                  }}
                />
                <input
                  type="text"
                  placeholder="Value (VD: 8GB)"
                  value={attr.value}
                  onChange={(e) => {
                    const newAttrs = [...(product.attributes || [])];
                    newAttrs[index].value = e.target.value;
                    setProduct({ ...product, attributes: newAttrs });
                  }}
                />
                <button
                  type="button"
                  className="btn btn--danger btn--small"
                  onClick={() => removeAttribute(index)}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => navigate("/admin/products")}
            >
              Hủy
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? "Đang lưu..." : isEdit ? "Cập nhật" : "Tạo mới"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminProductForm;

