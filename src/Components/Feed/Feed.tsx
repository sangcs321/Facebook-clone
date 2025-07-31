import React, { useEffect, useState } from 'react';
import "./Feed.css";
import StoryReel from '@Components/StoryReel/StoryReel';
import MessageSender from '@Components/Message/MessageSender';
import Post from '@Components/Post/Post';

function Feed() {
    const [posts, setPosts] = useState([]);
     useEffect(() => {
        // Dữ liệu giả
        const fakePosts = [
            {
                data: {
                    id: 1,
                    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
                    message: "Chào mọi người! Đây là bài viết đầu tiên của mình!",
                    timestamp: "2025-07-23T10:00:00",
                    username: "Nguyễn Văn A",
                    image: "https://picsum.photos/600/400?random=1"
                }
            },
            {
                data: {
                    id: 2,
                    profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
                    message: "Check-in Đà Lạt ❤️",
                    timestamp: "2025-07-23T11:30:00",
                    username: "Lê Thị B",
                    image: "https://picsum.photos/600/400?random=2"
                }
            },
            {
                data: {
                    id: 3,
                    profilePic: "https://randomuser.me/api/portraits/men/88.jpg",
                    message: "Hôm nay trời đẹp quá!",
                    timestamp: "2025-07-23T12:45:00",
                    username: "Trần Văn C",
                    image: ""
                }
            }
        ];

        setPosts(fakePosts);
    }, []);
    return (
        <div className="feed">
            <MessageSender />

            <StoryReel />
            
            {posts.map((post) => (
                <Post
                    key={post.data.id}
                    profilePic={post.data.profilePic}
                    message={post.data.message}
                    timestamp={post.data.timestamp}
                    username={post.data.username}
                    image={post.data.image}
                />
            ))}
        </div>
    )
}

export default Feed;