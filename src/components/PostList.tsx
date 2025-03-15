import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postSlice";
import { RootState } from "../redux/store";
import PostCard from "./PostCard";
import { AppDispatch } from "../redux/store";

const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredPosts, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="loading">Loading posts...</div>;
  }

  if (status === "failed") {
    return <div className="error">Error: {error}</div>;
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="no-results">No posts found matching your search.</div>
    );
  }

  return (
    <div className="post-list">
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
