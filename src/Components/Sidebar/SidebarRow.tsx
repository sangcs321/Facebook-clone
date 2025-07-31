import React from 'react';
import "./SidebarRow.css";
import { Avatar } from '@mui/material';

interface SidebarRowProps {
  src?: string;
  Icon?: React.ElementType;
  title: string;
}

function SidebarRow({ src, Icon, title }: SidebarRowProps) {
    return (
        <div className="sidebarRow">
            {src && <Avatar src={src}/>}
            {Icon && <Icon />}
            <h4>{title}</h4>
        </div>
    )
}

export default SidebarRow