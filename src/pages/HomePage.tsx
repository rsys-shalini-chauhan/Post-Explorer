import { useSelector } from "react-redux";
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";
import PostsPerPageSelector from "../components/PostsPerPageSelector";
import { RootState } from "../redux/store";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { totalPosts, currentPage, postsPerPage } = useSelector(
    (state: RootState) => {
      return {
        totalPosts: state.posts.filteredPosts.length,
        currentPage: state.posts.currentPage,
        postsPerPage: state.posts.postsPerPage,
      };
    }
  );

  const indexOfFirstPost = (currentPage - 1) * postsPerPage + 1;
  const indexOfLastPost = Math.min(currentPage * postsPerPage, totalPosts);

  return (
    <div className={styles.homePage}>
      <h1>Latest Posts</h1>
      <SearchBar />
      <div className={styles.controlsRow}>
        {totalPosts > 0 && (
          <div className={styles.postInfo}>
            Showing {indexOfFirstPost}-{indexOfLastPost} of {totalPosts} posts
          </div>
        )}
        <PostsPerPageSelector />
      </div>
      <PostList />
    </div>
  );
};

export default HomePage;
