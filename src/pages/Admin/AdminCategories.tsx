import { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import {
  adminGetAllCategories,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
} from "../../services/adminService";
import type { Category } from "../../types/category";
import Loading from "../../ui/Loading";
import { Plus, Edit, Trash2, X, Check } from "lucide-react";

interface CategoryWithId extends Category {
  _id: string;
}

function AdminCategories() {
  const [categories, setCategories] = useState<CategoryWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");

  const loadCategories = useCallback(async () => {
    setLoading(true);
    const data = await adminGetAllCategories();
    setCategories(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleCreate = useCallback(async () => {
    if (!newCategoryName.trim()) return;
    const success = await adminCreateCategory({ name: newCategoryName });
    if (success) {
      setNewCategoryName("");
      setIsAdding(false);
      loadCategories();
    }
  }, [newCategoryName, loadCategories]);

  const handleUpdate = useCallback(async (id: string) => {
    if (!editCategoryName.trim()) return;
    const success = await adminUpdateCategory(id, { name: editCategoryName });
    if (success) {
      setEditingId(null);
      setEditCategoryName("");
      loadCategories();
    }
  }, [editCategoryName, loadCategories]);

  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      const success = await adminDeleteCategory(id);
      if (success) {
        loadCategories();
      }
    }
  }, [loadCategories]);

  if (loading) return <Loading />;

  return (
    <AdminLayout>
      <div className="admin-categories">
        <div className="admin-page-header">
          <h1 className="admin-page-title">Quản lý Danh mục</h1>
          <button
            className="btn btn--primary"
            onClick={() => setIsAdding(true)}
          >
            <Plus size={20} />
            Thêm danh mục
          </button>
        </div>

        {isAdding && (
          <div className="admin-form-card">
            <input
              type="text"
              placeholder="Tên danh mục"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
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
                  setNewCategoryName("");
                }}
              >
                <X size={16} />
                Hủy
              </button>
            </div>
          </div>
        )}

        <div className="admin-list">
          {categories.map((category) => (
            <div key={category._id} className="admin-list-item">
              {editingId === category._id ? (
                <>
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="form-input"
                  />
                  <div className="action-buttons">
                    <button
                      className="btn-icon btn-icon--save"
                      onClick={() => handleUpdate(category._id)}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="btn-icon btn-icon--cancel"
                      onClick={() => {
                        setEditingId(null);
                        setEditCategoryName("");
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="list-item-content">
                    <h3>{category.name}</h3>
                    <span className="slug-text">{category.slug}</span>
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn-icon btn-icon--edit"
                      onClick={() => {
                        setEditingId(category._id);
                        setEditCategoryName(category.name);
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-icon btn-icon--delete"
                      onClick={() => handleDelete(category._id)}
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

export default AdminCategories;

