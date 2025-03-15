import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import PostList from "../components/PostList";

// Mock the redux store without middleware since we're just testing rendering
const mockStore = configureMockStore();

describe("PostList Component", () => {
  test("renders loading state correctly", () => {
    const initialState = {
      posts: {
        filteredPosts: [],
        status: "loading",
        error: null,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );

    expect(screen.getByText(/Loading posts.../i)).toBeInTheDocument();
  });

  test("renders error state correctly", () => {
    const initialState = {
      posts: {
        filteredPosts: [],
        status: "failed",
        error: "Failed to fetch posts",
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );

    expect(
      screen.getByText(/Error: Failed to fetch posts/i)
    ).toBeInTheDocument();
  });

  test("renders posts correctly", () => {
    const initialState = {
      posts: {
        filteredPosts: [
          {
            id: 1,
            title: "Test Post 1",
            body: "This is test post 1",
            userId: 1,
          },
          {
            id: 2,
            title: "Test Post 2",
            body: "This is test post 2",
            userId: 1,
          },
        ],
        status: "succeeded",
        error: null,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );

    expect(screen.getByText(/Test Post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Post 2/i)).toBeInTheDocument();
  });
});
