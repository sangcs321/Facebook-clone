import React from 'react';
import "./FriendWidget.css";
import { Avatar } from '@mui/material';


function FriendWidget({src, Icon ,title, onClick}) {
    return (
        <div className="friendWidget" onClick={onClick}>
            {src && <Avatar src={"https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"}/>}
            {Icon && <Icon />}
            <h4>{title}</h4>
        </div>
    )
}

export default FriendWidget