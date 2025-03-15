import { Link } from "react-router-dom";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.body.substring(0, 100)}...</p>
      <Link to={`/post/${post.id}`} className="view-button">
        View Details
      </Link>
    </div>
  );
};

export default PostCard;
