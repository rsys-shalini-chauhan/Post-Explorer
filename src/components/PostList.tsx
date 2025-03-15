import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, setCurrentPage } from "../redux/postSlice";
import { RootState } from "../redux/store";
import PostCard from "./PostCard";
import SkeletonCard from "./SkeletonCard";
import Pagination from "./Pagination";
import { AppDispatch } from "../redux/store";
import styles from "./PostList.module.css";

const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    filteredPosts,
    status,
    error,
    currentPage,
    postsPerPage,
    totalPages,
  } = useSelector((state: RootState) => state.posts);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (status === "idle" && !fetchedRef.current) {
      fetchedRef.current = true;
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  if (status === "loading") {
    return (
      <div className={styles.postList}>
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
    <>
      <div className={styles.postList}>
        {currentPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PostList;
