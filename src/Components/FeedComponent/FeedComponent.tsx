import { MessageSender, Post, StoryReel } from "@Components";
import { PostModel } from "@Models";
import { RootState } from "@Store";
import { PostApis } from "Apis/PostApis";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./FeedComponent.scss";

const Loading = () => (
  <div className="post loading">
    <h5>Đang tải...</h5>
  </div>
);

export const Feed = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false); // Ref mới để ngăn tăng nhanh nhiều lần

  const fetchPosts = useCallback(
    async (currentPage: number) => {
      if (!user.id || loading || !hasMore) return;
      setLoading(true);
      try {
        console.log("Đang lấy bài viết cho trang:", currentPage);
        const postsRes = await PostApis.getFriendPosts(
          user.id,
          currentPage,
          limit
        );
        if (postsRes.status === 200) {
          const newPosts = postsRes.data;
          if (newPosts.length < limit) {
            setHasMore(false);
          }
          setPosts((prev) => [...prev, ...newPosts]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      } finally {
        setLoading(false);
        isFetching.current = false; // Đặt lại ref sau khi fetch hoàn tất
      }
    },
    [user.id]
  );

  // Tải lần đầu
  useEffect(() => {
    if (user.id) {
      console.log("run", user.id);
      fetchPosts(0);
    }
  }, [user.id]);

  // Tải khi trang thay đổi (cho các trang > 0)
  useEffect(() => {
    if (page > 0) {
      fetchPosts(page);
      console.log("22222");
    }
  }, [page, fetchPosts]);

  // Xử lý cuộn để tải vô hạn
  useEffect(() => {
    console.log("33333");
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 500 &&
        !isFetching.current && // Dùng ref để kiểm tra ngay lập tức
        hasMore
      ) {
        isFetching.current = true; // Đặt ngay để chặn các lần tăng khác
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]); // Bỏ 'loading' khỏi phụ thuộc, vì ref xử lý

  useEffect(() => {
    console.log("trang mới:", page);
  }, [page]);

  return (
    <div className="feed">
      <MessageSender
        onSuccess={() => {
          setPosts([]);
          setPage(0);
          setHasMore(true);
          fetchPosts(0); // Thêm để tải lại ngay sau khi reset
        }}
      />
      <StoryReel />
      {posts
        .filter((post) => post.status !== "deleted")
        .map((post) => (
          <Post
            // key={post.id}
            userId={post.userId}
            postId={post.id}
            avatarUrl={user.avatarUrl}
            caption={post.caption}
            createdAt={post.createdAt}
            name={post.name}
            files={post.listFiles}
            userReact={post.userReact}
            listReacts={post.listReacts}
          />
        ))}
      {loading && <Loading />} {/* Thêm chỉ báo loading ở cuối */}
    </div>
  );
};
