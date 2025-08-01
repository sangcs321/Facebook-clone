import { Feed, Sidebar, ChatBox, Widgets } from "@Components";
import "./Home.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@Store";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Facebook";
  }, []);

  const handleOpenChat = (user: any) => {
    setChatUser(user);
    setIsChatOpen(true);
    console.log("Chat opened with user:", user);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setChatUser(null);
  };
  if (!user) {
    return null;
  }

  return (
    <div className="app">
      <div className="appBody">
        {/* SideBar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}
        <Widgets onClick={handleOpenChat} />
        {isChatOpen && <ChatBox user={chatUser} onClose={handleCloseChat} />}
      </div>
    </div>
  );
};

export default Home;
