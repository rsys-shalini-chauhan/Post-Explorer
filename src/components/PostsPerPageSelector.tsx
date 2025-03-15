import { useDispatch, useSelector } from "react-redux";
import { setPostsPerPage } from "../redux/postSlice";
import { RootState } from "../redux/store";
import styles from "./PostsPerPageSelector.module.css";

const PostsPerPageSelector = () => {
  const dispatch = useDispatch();
  const postsPerPage = useSelector(
    (state: RootState) => state.posts.postsPerPage
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    dispatch(setPostsPerPage(value));
  };

  return (
    <div className={styles.selector}>
      <label htmlFor="postsPerPage">Posts per page:</label>
      <select
        id="postsPerPage"
        value={postsPerPage}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="24">24</option>
      </select>
    </div>
  );
};

export default PostsPerPageSelector;
