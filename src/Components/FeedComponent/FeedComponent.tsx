import { useEffect, useState } from "react";
import "./FeedComponent.scss";

import { MessageSender, Post, StoryReel } from "@Components";
import { PostModel } from "@Models";
import { RootState } from "@Store";
import { PostApis } from "Apis/PostApis";
import { useSelector } from "react-redux";

export const Feed = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [posts, setPosts] = useState<PostModel[]>([]);

  const fetchData = async () => {
    const postsRes = await PostApis.getFriendPosts(user.id);
    if (postsRes.status === 200) {
      setPosts(postsRes.data);
    }
  };

  useEffect(() => {
    console.log("user.id in useEffect", user.id);
    if (user.id) {
      fetchData();
      console.log("posts", posts);
    }
  }, [user.id]);

  return (
    <div className="feed">
      <MessageSender onSuccess={() => fetchData()} />
      <StoryReel />
      {posts
        .filter((post) => post.status !== "deleted")
        .map((post) => (
          <Post
            key={post.id}
            avatarUrl={user.avatarUrl}
            caption={post.caption}
            createdAt={post.createdAt}
            name={post.name}
            files={post.listFiles}
          />
        ))}
    </div>
  );
};
