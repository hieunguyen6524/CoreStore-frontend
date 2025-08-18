import { useState, type FormEvent } from "react";
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

  async function handleSubmitUserData(e: FormEvent) {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("email", email);

    const photoInput = document.getElementById("photo") as HTMLInputElement;
    if (photoInput?.files && photoInput.files.length > 0) {
      form.append("photo", photoInput.files[0]);
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
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form className="form form-user-data" onSubmit={handleSubmitUserData}>
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              Name
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
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form__input"
              defaultValue={user.email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form__group form__photo-upload">
            <img
              src={user.avatar}
              alt="User photo"
              className="form__user-photo"
            />
            <input
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              className="form__upload"
            />
            <label htmlFor="photo">Choose new photo</label>
          </div>

          <div className="form__group right">
            <button className="btn btn--small btn--green">Save settings</button>
          </div>
        </form>
      </div>

      <div className="line"></div>

      {/* Đổi mật khẩu  */}
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Password change</h2>
        <form
          className="form form-user-password"
          onSubmit={handleSubmitUserPassword}
        >
          <div className="form__group">
            <label htmlFor="password-current" className="form__label">
              Current password
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
              New password
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
              Confirm password
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
              Save password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContentProfile;
