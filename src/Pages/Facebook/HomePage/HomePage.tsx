import { Feed, Sidebar, ChatBox, Widgets } from "@Components";
import "./HomePage.scss";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@Store";

export const HomePage = () => {
  const { user } = useSelector((state: RootState) => state.user);
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

  const renderFeed = useCallback(() => {
    return <Feed />;
  }, []);

  if (!user) {
    return null;
  }
  return (
    <div className="app">
      <div className="appBody">
        {/* SideBar */}
        <Sidebar />
        {/* Feed */}
        {renderFeed()}
        {/* Widgets */}
        <Widgets onClick={handleOpenChat} />
        {isChatOpen && <ChatBox user={chatUser} onClose={handleCloseChat} />}
      </div>
    </div>
  );
};
