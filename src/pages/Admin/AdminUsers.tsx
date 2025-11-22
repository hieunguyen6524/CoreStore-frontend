import { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import {
  adminGetAllUsers,
  adminDeleteUser,
  adminUpdateUser,
} from "../../services/adminService";
import type { User } from "../../types/user";
import Loading from "../../ui/Loading";
import { Edit, Trash2, User as UserIcon } from "lucide-react";
import { getUserImageUrl } from "../../utils/imageUrl";

interface UserWithId extends User {
  _id: string;
}

function AdminUsers() {
  const [users, setUsers] = useState<UserWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<UserWithId | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const data = await adminGetAllUsers({ page: 1, limit: 50 });
    setUsers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      const success = await adminDeleteUser(id);
      if (success) {
        loadUsers();
      }
    }
  }, [loadUsers]);

  const handleUpdateRole = useCallback(async (user: UserWithId, newRole: string) => {
    const success = await adminUpdateUser(user._id, { role: newRole });
    if (success) {
      loadUsers();
      setEditingUser(null);
    }
  }, [loadUsers]);

  if (loading) return <Loading />;

  return (
    <AdminLayout>
      <div className="admin-users">
        <h1 className="admin-page-title">Quản lý Người dùng</h1>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    Không có người dùng nào
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-avatar">
                        <img
                          src={getUserImageUrl(user.avatar)}
                          alt={user.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              getUserImageUrl("default.jpg");
                          }}
                        />
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {editingUser?._id === user._id ? (
                        <select
                          value={editingUser.role}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              role: e.target.value,
                            })
                          }
                          className="role-select"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span
                          className={`role-badge role-badge--${user.role}`}
                        >
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        {editingUser?._id === user._id ? (
                          <>
                            <button
                              className="btn-icon btn-icon--save"
                              onClick={() =>
                                handleUpdateRole(editingUser, editingUser.role)
                              }
                            >
                              ✓
                            </button>
                            <button
                              className="btn-icon btn-icon--cancel"
                              onClick={() => setEditingUser(null)}
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn-icon btn-icon--edit"
                              onClick={() => setEditingUser(user as UserWithId)}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="btn-icon btn-icon--delete"
                              onClick={() => handleDelete(user._id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;

