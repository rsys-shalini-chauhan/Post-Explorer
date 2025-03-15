import { useParams, Link } from "react-router-dom";
import PostDetail from "../components/PostDetail";
import styles from "./PostDetailPage.module.css";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className={styles.error}>Post ID is required</div>;
  }

  return (
    <div className={styles.postDetailPage}>
      <Link to="/" className={styles.backButton}>
        ← Back to Posts
      </Link>
      <PostDetail postId={id} />
    </div>
  );
};

export default PostDetailPage;
