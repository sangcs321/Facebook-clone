import React from 'react';
import "./Chatbox.css";
import { Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
function ChatBox({ src, Icon, title, onClose }) {
    return (
        <div className="chatBox">
            <div className="chatHeader">
                <div className="avatar">
                    <Avatar src={"https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"} />
                </div>
                <div className="info">Người dùng</div>

                <div className="iconGroup">
                    <div className="iconItem call"><CallIcon /></div>
                    <div className="iconItem video"><VideocamIcon /></div>
                    <div className="iconItem minimize"><RemoveIcon /></div>
                    <div className="iconItem close"><CloseIcon onClick={onClose}/></div>
                </div>
            </div>
            <div className="chatContent">
                chat box
            </div>
            <div className="chatInput">
                <div><input className="inputText" type='text'></input></div>
            </div>
        </div>
    )
}

export default ChatBox