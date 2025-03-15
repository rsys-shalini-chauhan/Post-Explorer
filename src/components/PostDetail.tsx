import { useState, useEffect, useRef } from "react";
import { fetchPostById } from "../services/api";
import { Post } from "../types";
import SkeletonPostDetail from "./SkeletonPostDetail";
import styles from "./PostDetail.module.css";

interface PostDetailProps {
  postId: string;
}

const PostDetail = ({ postId }: PostDetailProps) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await fetchPostById(postId);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load post details");
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  if (loading) {
    return <SkeletonPostDetail />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!post) {
    return <div className="not-found">Post not found</div>;
  }

  return (
    <div className={styles.postDetail}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.content}>
        <p>{post.body}</p>
      </div>
      <div className={styles.meta}>
        <p>Post ID: {post.id}</p>
        <p>User ID: {post.userId}</p>
      </div>
    </div>
  );
};

export default PostDetail;
