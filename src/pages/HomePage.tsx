import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <h1>Latest Posts</h1>
      <SearchBar />
      <PostList />
    </div>
  );
};

export default HomePage;
