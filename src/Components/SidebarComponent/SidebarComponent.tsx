import React from "react";
import { SidebarRow } from "@Components";
import "./SidebarComponent.scss";
import {
  ExpandMoreOutlined,
  LocalHospital,
  EmojiFlags,
  People,
  Chat,
  Storefront,
  VideoLibrary,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@Store";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const translate = useSelector(
    (state: RootState) => state.language.TranslateModel
  );
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <SidebarRow
        src={
          "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
        }
        title={user.name}
        onClick={() => navigate("/profile")}
      />
      <SidebarRow Icon={LocalHospital} title={translate?.sideBarMenu1} />
      <SidebarRow Icon={EmojiFlags} title={translate?.sideBarMenu2} />
      <SidebarRow Icon={People} title={translate?.sideBarMenu3} />
      <SidebarRow Icon={Chat} title={translate?.sideBarMenu4} />
      <SidebarRow Icon={Storefront} title={translate?.sideBarMenu5} />
      <SidebarRow Icon={VideoLibrary} title={translate?.sideBarMenu6} />
      <SidebarRow Icon={ExpandMoreOutlined} title="More" />
    </div>
  );
};
