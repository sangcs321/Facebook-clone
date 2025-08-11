import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton } from "@mui/material";
import { Dropdown, Menu } from "antd";
import { useState } from "react";
import styles from "./HeaderComponent.module.scss";

import { clearUser, setUser } from "@Slice/UserSlice";
import { RootState } from "@Store";
import {
  Card,
  Category,
  Flag,
  Home2,
  Message,
  Notification,
  People,
  VideoSquare,
} from "iconsax-reactjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    console.log("Clicked menu item key:", e.key);
    switch (e.key) {
      case "1":
        // Thông tin cá nhân
        navigate("/profile");
        break;
      case "2":
        // Cài đặt
        break;
      case "3":
        navigate("/login");
        dispatch(setUser(undefined));
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        break;
      case "4":
        navigate("/languages");
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Thông tin cá nhân</Menu.Item>
      <Menu.Item key="2">Cài đặt</Menu.Item>
      <Menu.Item key="4">Quản lý</Menu.Item>
      <Menu.Item key="3">Đăng xuất</Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.header}>
      <div className={styles["header__left"]}>
        <img
          onClick={() => navigate("/")}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
          alt=""
        />

        <div
          className={`${styles["header__left__input"]} ${
            showSearch ? styles["show"] : ""
          }`}
        >
          <SearchIcon
            className="search-toggle"
            onClick={() => setShowSearch(!showSearch)}
          />
          <input placeholder="Search Facebook" type="text" />
        </div>
      </div>

      <div className={styles["header__center"]}>
        <div
          className={`${styles["header__center__option"]} ${styles["header__center__option--active"]}`}
        >
          <Home2 size="32" color="#2e81f4" variant="Bold" />
        </div>

        <div className={styles["header__center__option"]}>
          <VideoSquare size="32" color="#000000" variant="Bold" />
        </div>

        <div className={styles["header__center__option"]}>
          <Card size="32" color="#000000" variant="Bold" />
        </div>

        <div className={styles["header__center__option"]}>
          {" "}
          <Flag size="32" color="#000000" variant="Bold" />
        </div>

        <div className={styles["header__center__option"]}>
          <People size="32" color="#000000" variant="Bold" />
        </div>
      </div>

      <div className={styles["header__right"]}>
        <img
          className="flag"
          src="https://flagcdn.com/w40/vn.png"
          alt="Vietnamese"
          // onClick={() => handleLanguageChange('vi')}
          style={{
            cursor: "pointer",
            width: 48,
            height: 32,
            // opacity: language === 'vi' ? 1 : 0.5,
            // border: language === 'vi' ? '2px solid #1890ff' : 'none',
            borderRadius: 2,
            marginRight: 8,
          }}
        />
        <img
          className="flag"
          src="https://flagcdn.com/w40/us.png"
          alt="English"
          // onClick={() => handleLanguageChange('en')}
          style={{
            cursor: "pointer",
            width: 48,
            height: 32,
            // opacity: language === 'en' ? 1 : 0.5,
            // border: language === 'en' ? '2px solid #1890ff' : 'none',
            borderRadius: 2,
            marginRight: 8,
          }}
        />

        <IconButton className={styles.customIconButton}>
          <Category size="32" color="#808080" variant="Bold" />
        </IconButton>

        <IconButton className={styles.customIconButton}>
          <Message size="32" color="#808080" variant="Bold" />
        </IconButton>

        <IconButton className={styles.customIconButton}>
          <Notification size="32" color="#808080" variant="Bold" />
        </IconButton>

        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <div className="header_info" style={{ cursor: "pointer" }}>
            <Avatar src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
