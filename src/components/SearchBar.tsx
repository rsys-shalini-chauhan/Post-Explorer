import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/postSlice";
import { RootState } from "../redux/store";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state: RootState) => state.posts);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(setSearchTerm(localSearchTerm));
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localSearchTerm, dispatch]);

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search posts..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
