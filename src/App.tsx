import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import Header from "./components/Header";
import styles from "./App.module.css";
import "./styles/global.css"; // Global styles

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.appContainer}>
          <Header />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
