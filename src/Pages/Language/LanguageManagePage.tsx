import axios from "axios";
import { useEffect, useState } from "react";

import { LanguageForm, LanguageList } from "@Components";
import { Layout, Menu } from "antd";
const { Header, Content } = Layout;
export const LanguageManage = () => {
  const [language, setLanguage] = useState("");
  const [languages, setLanguages] = useState([]);
  const [languageCustom, setLanguageCustom] = useState([]);
  const [MenuTitle, setMenuTitle] = useState("");
  const [AddLang, setAddLang] = useState("");
  const [ListLang, setListLang] = useState("");
  const refecthListLanguages = () => {
    axios
      .get("http://localhost:8080/api/language")
      .then((response) => {
        setLanguages(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách ngôn ngữ:", error);
      });
  };
  const refecthListLanguagesCustom = () => {
    axios
      .get("http://localhost:8080/api/language/custom")
      .then((response) => {
        setLanguageCustom(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách ngôn ngữ:", error);
      });
  };
  const fetchLanguages = () => {
    Promise.all([
      axios.get("http://localhost:8080/api/language/search?keyword=Main"),
      axios.get("http://localhost:8080/api/choice"),
    ])
      .then(([res1, res2]) => {
        setAddLang(
          res1.data.find((item) => item.code === "MainAddLang")?.name || ""
        );
        setListLang(
          res1.data.find((item) => item.code === "MainListLang")?.name || ""
        );
        setMenuTitle(
          res1.data.find((item) => item.code === "MainTitle")?.name || ""
        );
        setLanguage(res2.data.language);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  };
  useEffect(() => {
    refecthListLanguages();
    refecthListLanguagesCustom();
    fetchLanguages();
  }, []);
  const handleAddLanguage = () => {
    refecthListLanguages();
    refecthListLanguagesCustom();
  };
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    axios
      .put(`http://localhost:8080/api/choice`, lang, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách ngôn ngữ:", error);
      });
    console.log("Language changed to:", lang);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">{MenuTitle}</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 280 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingRight: 16,
            }}
          />
          <img
            src="https://flagcdn.com/w40/vn.png"
            alt="Vietnamese"
            onClick={() => handleLanguageChange("vi")}
            style={{
              cursor: "pointer",
              width: 48,
              height: 32,
              opacity: language === "vi" ? 1 : 0.5,
              border: language === "vi" ? "2px solid #1890ff" : "none",
              borderRadius: 2,
              marginRight: 8,
            }}
          />
          <img
            src="https://flagcdn.com/w40/us.png"
            alt="English"
            onClick={() => handleLanguageChange("en")}
            style={{
              cursor: "pointer",
              width: 48,
              height: 32,
              opacity: language === "en" ? 1 : 0.5,
              border: language === "en" ? "2px solid #1890ff" : "none",
              borderRadius: 2,
            }}
          />
          <div />
          <h2>{AddLang}</h2>
          <LanguageForm onSuccess={handleAddLanguage} />
          <h2>{ListLang}</h2>
          <LanguageList
            listLanguages={languages}
            onSuccess={handleAddLanguage}
            listCustom={languageCustom}
          />
        </div>
      </Content>
    </Layout>
  );
};
