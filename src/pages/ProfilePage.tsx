import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import type { RootState } from "../../store";

import { logout } from "../services/authService";
import MenuProfile from "../components/User/MenuProfile";
import ContentProfile from "../components/User/ContentProfile";

function ProfilePage() {
  const user = useSelector((state: RootState) => state.user.user);

  async function handleLogout() {
    await logout();
  }

  if (!user) return <div>Not found user</div>;

  return (
    <Layout>
      <main className="main">
        <div className="user-view">
          {/* Menu  */}
          <MenuProfile user={user} handleLogout={handleLogout} />

          {/* Content  */}
          <ContentProfile user={user} />
        </div>
      </main>
    </Layout>
  );
}

export default ProfilePage;
