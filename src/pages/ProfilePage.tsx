import { useSelector, shallowEqual } from "react-redux";
import { useCallback, useMemo } from "react";
import Layout from "../components/Layout/Layout";
import type { RootState } from "../store/store";

import { logout } from "../services/authService";
import MenuProfile from "../components/User/MenuProfile";
import ContentProfile from "../components/User/ContentProfile";

function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth, shallowEqual);

  const handleLogout = useCallback(async () => {
    await logout();
  }, []);

  const profileContent = useMemo(() => {
    if (!user) return <div>Not found user</div>;

    return (
      <main className="main">
        <div className="user-view">
          {/* Menu  */}
          <MenuProfile user={user} handleLogout={handleLogout} />

          {/* Content  */}
          <ContentProfile user={user} />
        </div>
      </main>
    );
  }, [user, handleLogout]);

  return (
    <Layout>
      {profileContent}
    </Layout>
  );
}

export default ProfilePage;
