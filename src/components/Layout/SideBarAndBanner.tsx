import { memo } from "react";
import ListBanner from "../../ui/ListBanner";
import SideBar from "../../ui/SideBar";

function SideBarAndBanner() {
  return (
    <div className="home-container">
      <SideBar />
      <ListBanner />
    </div>
  );
}

export default memo(SideBarAndBanner);
