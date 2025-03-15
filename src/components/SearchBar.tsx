import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/postSlice";
import { RootState } from "../redux/store";

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
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search posts..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
