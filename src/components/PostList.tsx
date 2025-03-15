import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postSlice";
import { RootState } from "../redux/store";
import PostCard from "./PostCard";
import SkeletonCard from "./SkeletonCard";
import { AppDispatch } from "../redux/store";

const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredPosts, status, error } = useSelector(
    (state: RootState) => state.posts
  );
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (status === "idle" && !fetchedRef.current) {
      fetchedRef.current = true;
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="post-list">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
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
