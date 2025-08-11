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
      <SidebarRow Icon={LocalHospital} title="COVID-19 Information Center" />
      <SidebarRow Icon={EmojiFlags} title="Pages" />
      <SidebarRow Icon={People} title="Friends" />
      <SidebarRow Icon={Chat} title="Messanger" />
      <SidebarRow Icon={Storefront} title="Marketplace" />
      <SidebarRow Icon={VideoLibrary} title="Videos" />
      <SidebarRow Icon={ExpandMoreOutlined} title="More" />
    </div>
  );
};
