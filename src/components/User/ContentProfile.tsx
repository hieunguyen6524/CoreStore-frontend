import { useState, type ChangeEvent, type FormEvent } from "react";
import type { User } from "../../types/user";
import { updateSetting } from "../../services/userService";

interface ContextProfileProps {
  user: User;
}

function ContentProfile({ user }: ContextProfileProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currenthPassword, setCurrenthPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [preview, setPreview] = useState<string>(user.avatar);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d")!;
          const size = 500;

          canvas.width = size;
          canvas.height = size;

          // crop hình vuông ở giữa
          const side = Math.min(img.width, img.height);
          const startX = (img.width - side) / 2;
          const startY = (img.height - side) / 2;

          ctx.drawImage(img, startX, startY, side, side, 0, 0, size, size);

          resolve(canvas.toDataURL(file.type));
        };
      };

      reader.onerror = (err) => reject(err);
    });
  };

  async function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // lưu file gốc để upload
    setPhotoFile(file);

    // tạo preview resize từ file gốc
    try {
      const previewUrl = await createPreview(file);
      setPreview(previewUrl);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmitUserData(e: FormEvent) {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("email", email);

    if (photoFile) {
      form.append("photo", photoFile);
    }

    await updateSetting("profile", form, true);
  }

  async function handleSubmitUserPassword(e: FormEvent) {
    e.preventDefault();
    await updateSetting("password", {
      currenthPassword,
      password,
      passwordConfirm,
    });
  }

  return (
    <div className="user-view__content">
      {/* Cập nhật thông tin  */}
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Tùy chỉnh tài khoản</h2>
        <form className="form form-user-data" onSubmit={handleSubmitUserData}>
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              Tên người dùng
            </label>
            <input
              id="name"
              type="text"
              className="form__input"
              defaultValue={user.name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form__group ma-bt-md">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form__input"
              defaultValue={user.email}
              required
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form__group form__photo-upload">
            <img src={preview} alt="User photo" className="form__user-photo" />
            <input
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              className="form__upload"
              onChange={handlePhotoChange}
            />
            <label htmlFor="photo">Chọn ảnh</label>
          </div>

          <div className="form__group right">
            <button className="btn btn--small btn--green">Lưu thay đổi</button>
          </div>
        </form>
      </div>

      <div className="line"></div>

      {/* Đổi mật khẩu  */}
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Thay đổi mật khẩu</h2>
        <form
          className="form form-user-password"
          onSubmit={handleSubmitUserPassword}
        >
          <div className="form__group">
            <label htmlFor="password-current" className="form__label">
              Mật khẩu hiện tại
            </label>
            <input
              id="password-current"
              type="password"
              className="form__input"
              placeholder="••••••••"
              required
              minLength={8}
              onChange={(e) => setCurrenthPassword(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Mật khảu mới
            </label>
            <input
              id="password"
              type="password"
              className="form__input"
              placeholder="••••••••"
              required
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form__group ma-bt-lg">
            <label htmlFor="password-confirm" className="form__label">
              Nhập lại mật khẩu mới
            </label>
            <input
              id="password-confirm"
              type="password"
              className="form__input"
              placeholder="••••••••"
              required
              minLength={8}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <div className="form__group right">
            <button
              className="btn btn--small btn--green btn--save-password"
              type="submit"
            >
              Thay đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContentProfile;
