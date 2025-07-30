import React from 'react';
import FriendWidget from './FriendWidget';
import './Widgets.css';
function Widgets({onClick}) {
    const users = [
        { id: 1, name: "Nguyễn Văn A", avatar: "..." },
        { id: 2, name: "Trần Thị B", avatar: "..." },
    ];
    return (
        <div className="widgets">
            <div className="contact">
                <div> <h2>Contacts</h2></div>
                {users.map((user) => (
                    <FriendWidget key={user.id} src={user.avatar} title={user.name} onClick={onClick} />
                ))}
            </div>
        </div>
    )
}

export default Widgets;