import { useState, useEffect } from "react";
import { fetchPostById } from "../services/api";
import { Post } from "../types";

interface PostDetailProps {
  postId: string;
}

const PostDetail = ({ postId }: PostDetailProps) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
    return <div className="loading">Loading post details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!post) {
    return <div className="not-found">Post not found</div>;
  }

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <div className="post-content">
        <p>{post.body}</p>
      </div>
      <div className="post-meta">
        <p>Post ID: {post.id}</p>
        <p>User ID: {post.userId}</p>
      </div>
    </div>
  );
};

export default PostDetail;
