import { Link } from "react-router-dom";
import { Post } from "../types";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className={styles.postCard}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.body}>{post.body.substring(0, 100)}...</p>
      <Link to={`/post/${post.id}`} className={styles.viewButton}>
        View Details
      </Link>
    </div>
  );
};

export default PostCard;
