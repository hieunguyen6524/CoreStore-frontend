import { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import {
  adminGetAllBrands,
  adminCreateBrand,
  adminUpdateBrand,
  adminDeleteBrand,
} from "../../services/adminService";
import type { Brand } from "../../types/brand";
import Loading from "../../ui/Loading";
import { Plus, Edit, Trash2, X, Check } from "lucide-react";

interface BrandWithId extends Brand {
  _id: string;
}

function AdminBrands() {
  const [brands, setBrands] = useState<BrandWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newBrandName, setNewBrandName] = useState("");
  const [editBrandName, setEditBrandName] = useState("");

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    setLoading(true);
    const data = await adminGetAllBrands();
    setBrands(data);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newBrandName.trim()) return;
    const success = await adminCreateBrand({ name: newBrandName });
    if (success) {
      setNewBrandName("");
      setIsAdding(false);
      loadBrands();
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editBrandName.trim()) return;
    const success = await adminUpdateBrand(id, { name: editBrandName });
    if (success) {
      setEditingId(null);
      setEditBrandName("");
      loadBrands();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      const success = await adminDeleteBrand(id);
      if (success) {
        loadBrands();
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <AdminLayout>
      <div className="admin-brands">
        <div className="admin-page-header">
          <h1 className="admin-page-title">Quản lý Thương hiệu</h1>
          <button
            className="btn btn--primary"
            onClick={() => setIsAdding(true)}
          >
            <Plus size={20} />
            Thêm thương hiệu
          </button>
        </div>

        {isAdding && (
          <div className="admin-form-card">
            <input
              type="text"
              placeholder="Tên thương hiệu"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              className="form-input"
            />
            <div className="form-actions">
              <button className="btn btn--success" onClick={handleCreate}>
                <Check size={16} />
                Thêm
              </button>
              <button
                className="btn btn--secondary"
                onClick={() => {
                  setIsAdding(false);
                  setNewBrandName("");
                }}
              >
                <X size={16} />
                Hủy
              </button>
            </div>
          </div>
        )}

        <div className="admin-list">
          {brands.map((brand) => (
            <div key={brand._id} className="admin-list-item">
              {editingId === brand._id ? (
                <>
                  <input
                    type="text"
                    value={editBrandName}
                    onChange={(e) => setEditBrandName(e.target.value)}
                    className="form-input"
                  />
                  <div className="action-buttons">
                    <button
                      className="btn-icon btn-icon--save"
                      onClick={() => handleUpdate(brand._id)}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="btn-icon btn-icon--cancel"
                      onClick={() => {
                        setEditingId(null);
                        setEditBrandName("");
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="list-item-content">
                    <h3>{brand.name}</h3>
                    <span className="slug-text">{brand.slug}</span>
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn-icon btn-icon--edit"
                      onClick={() => {
                        setEditingId(brand._id);
                        setEditBrandName(brand.name);
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-icon btn-icon--delete"
                      onClick={() => handleDelete(brand._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminBrands;

