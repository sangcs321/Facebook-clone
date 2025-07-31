import Feed from "../../../Components/Feed/Feed";
import Header from "../../../Components/Header/Header";

import Sidebar from "../../../Components/Sidebar/Sidebar";
import ChatBox from "../../../Components/Chat/Chatbox";
import Widgets from "../../../Components/Widgets/Widgets";
import './HomeScreen.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { RootState } from '@/Redux/Store/Store';

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Facebook";
  }, []);

  const handleOpenChat = (user) => {
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
      <div className="app_body">
        {/* SideBar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}
        <Widgets onClick={handleOpenChat} />
        {isChatOpen && (
          <ChatBox user={chatUser} onClose={handleCloseChat} />
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
