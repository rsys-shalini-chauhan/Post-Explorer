import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import PostList from "../components/PostList";
import { Post } from "../types";

// Mock the PostCard component to avoid router issues
vi.mock("../components/PostCard", () => ({
  default: (props: { post: Post }) => (
    <div data-testid="post-card">
      <h2>{props.post.title}</h2>
      <p>{props.post.body.substring(0, 100)}...</p>
      <button>View Details</button>
    </div>
  ),
}));

// Mock SkeletonCard to make it easier to test
vi.mock("../components/SkeletonCard", () => ({
  default: () => (
    <div data-testid="skeleton-card" className="post-card skeleton"></div>
  ),
}));

// Mock the Pagination component
vi.mock("../components/Pagination", () => ({
  default: ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => (
    <div data-testid="pagination">
      <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  ),
}));

// Mock the redux store without middleware since we're just testing rendering
const mockStore = configureMockStore();

describe("PostList Component", () => {
  test("renders loading state correctly", () => {
    const initialState = {
      posts: {
        filteredPosts: [],
        status: "loading",
        error: null,
        currentPage: 1,
        postsPerPage: 6,
        totalPages: 0,
        searchTerm: "",
        posts: [],
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PostList />
        </BrowserRouter>
      </Provider>
    );

    // Check that skeleton cards are rendered
    const skeletonCards = screen.getAllByTestId("skeleton-card");
    expect(skeletonCards.length).toBeGreaterThan(0);
  });

  test("renders error state correctly", () => {
    const initialState = {
      posts: {
        filteredPosts: [],
        status: "failed",
        error: "Failed to fetch posts",
        currentPage: 1,
        postsPerPage: 6,
        totalPages: 0,
        searchTerm: "",
        posts: [],
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PostList />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText(/Error: Failed to fetch posts/i)
    ).toBeInTheDocument();
  });

  test("renders posts correctly", () => {
    const mockPosts = [
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
    ];

    const initialState = {
      posts: {
        filteredPosts: mockPosts,
        posts: mockPosts,
        status: "succeeded",
        error: null,
        currentPage: 1,
        postsPerPage: 6,
        totalPages: 1,
        searchTerm: "",
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PostList />
        </BrowserRouter>
      </Provider>
    );

    // Use getByRole to specifically target the headings
    expect(
      screen.getByRole("heading", { name: /Test Post 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Test Post 2/i })
    ).toBeInTheDocument();
  });
});
