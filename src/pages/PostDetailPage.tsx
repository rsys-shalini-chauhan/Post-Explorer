import { useParams, Link } from "react-router-dom";
import PostDetail from "../components/PostDetail";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="error">Post ID is required</div>;
  }

  return (
    <div className="post-detail-page">
      <Link to="/" className="back-button">
        ← Back to Posts
      </Link>
      <PostDetail postId={id} />
    </div>
  );
};

export default PostDetailPage;
