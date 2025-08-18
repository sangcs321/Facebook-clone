import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton } from "@mui/material";
import { Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
import styles from "./HeaderComponent.module.scss";

import { setUser } from "@Slice/UserSlice";
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
import { WindowRounded } from "@mui/icons-material";
import { LanguageApis } from "Apis/LanguageApis";

export const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const translate = useSelector(
    (state: RootState) => state.language.TranslateModel
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [language, setLanguage] = useState();
  useEffect(() => {
    const fetchChoice = async () => {
      const response = await LanguageApis.getChoiceLanguage();
      if (response.status === 200) {
        setLanguage(response.data.language);
      }
    };
    fetchChoice();
  }, [language]);
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        // Thông tin cá nhân
        window.location.href = `/profile`;
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
  const handleLanguageChange = async (e) => {
    setLanguage(e.key);
    const response = await LanguageApis.updateChoiceLanguage(e.key);
    if (response.status === 200) {
      window.location.reload();
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">{translate?.headerMenuInfo}</Menu.Item>
      <Menu.Item key="2">{translate?.headerMenuSettings}</Menu.Item>
      <Menu.Item key="4">{translate?.headerMenuManagement}</Menu.Item>
      <Menu.Item key="3">{translate?.headerMenuLogout}</Menu.Item>
    </Menu>
  );
  const menuLanguage = (
    <Menu onClick={handleLanguageChange}>
      <Menu.Item key="vi">Tiếng Việt</Menu.Item>
      <Menu.Item key="en">English</Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.header}>
      <div className={styles["headerLeft"]}>
        <img
          onClick={() => (window.location.href = "/")}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
          alt=""
        />

        <div
          className={`${styles["headerLeftInput"]} ${
            showSearch ? styles["show"] : ""
          }`}
        >
          <SearchIcon
            className="search-toggle"
            onClick={() => setShowSearch(!showSearch)}
          />
          <input placeholder={translate?.headerSearchInput} type="text" />
        </div>
      </div>

      <div className={styles["headerCenter"]}>
        <div
          className={`${styles["headerCenterOption"]} ${styles["headerCenterOption--active"]}`}
        >
          <Home2 size="32" color="#2e81f4" variant="Bold" />
        </div>

        <div className={styles["headerCenterOption"]}>
          <VideoSquare size="32" color="#000000" variant="Bold" />
        </div>

        <div className={styles["headerCenterOption"]}>
          <Card size="32" color="#000000" variant="Bold" />
        </div>

        <div className={styles["headerCenterOption"]}>
          {" "}
          <Flag size="32" color="#000000" variant="Bold" />
        </div>

        <div className={styles["headerCenterOption"]}>
          <People size="32" color="#000000" variant="Bold" />
        </div>
      </div>

      <div className={styles["headerRight"]}>
        <Dropdown
          overlay={menuLanguage}
          trigger={["click"]}
          placement="bottomRight"
        >
          {language === "vi" ? (
            <img
              className="flag"
              src="https://flagcdn.com/w40/vn.png"
              alt="Vietnamese"
              style={{
                cursor: "pointer",
                width: 48,
                height: 32,
                borderRadius: 2,
                marginRight: 8,
              }}
            />
          ) : (
            <img
              className="flag"
              src="https://flagcdn.com/w40/us.png"
              alt="English"
              style={{
                cursor: "pointer",
                width: 48,
                height: 32,
                borderRadius: 2,
                marginRight: 8,
              }}
            />
          )}
        </Dropdown>

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
          <div className="headerInfo" style={{ cursor: "pointer" }}>
            <Avatar src={user.avatarUrl} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
