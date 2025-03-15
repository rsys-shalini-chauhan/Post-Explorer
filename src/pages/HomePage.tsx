import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Latest Posts</h1>
      <SearchBar />
      <PostList />
    </div>
  );
};

export default HomePage;
