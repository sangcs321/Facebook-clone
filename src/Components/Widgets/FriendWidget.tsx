import React from 'react';
import "./FriendWidget.css";
import { Avatar } from '@mui/material';

interface FriendWidgetProps {
  src?: string;
  title: string;
  onClick: () => void;
}
const FriendWidget: React.FC<FriendWidgetProps> = ({ src, title, onClick }) => {
    return (
        <div className="friendWidget" onClick={onClick}>
            {src && <Avatar src={src}/>}
            <h4>{title}</h4>
        </div>
    )
}

export default FriendWidget