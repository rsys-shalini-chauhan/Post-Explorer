# Post Explorer

A modern React application built with Vite that allows users to browse and search through posts fetched from an API, with detailed views for each post.

## About React + Vite

This project leverages the power of [React](https://react.dev/) with [Vite](https://vitejs.dev/) as the build tool. Vite offers several advantages:

- **Super Fast HMR**: Lightning-fast hot module replacement during development
- **Optimized Build**: Efficient production builds with automatic code splitting
- **TypeScript Support**: First-class TypeScript integration without additional configuration
- **CSS Processing**: Built-in CSS processing with PostCSS support
- **Dev Server**: Optimized development server with instant startup

## Features

- **Post Listing:** View a grid of posts fetched from JSONPlaceholder API
- **Search Functionality:** Filter posts by title or content with real-time updates
- **Post Details:** Click on any post to view more detailed information
- **Responsive Design:** Works seamlessly on desktop and mobile devices
- **Loading States:** Skeleton loaders provide visual feedback during data fetching
- **Error Handling:** Graceful error display when API calls fail

## Technology Stack

This project is built with modern web technologies:

- **React 19** - Frontend UI library
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Router** - Navigation and routing
- **CSS3** - Styling with modern CSS features
- **Vite** - Fast, modern build tool
- **Vitest** - Testing framework

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx        # App header with navigation
│   ├── PostCard.tsx      # Card component for post previews
│   ├── PostDetail.tsx    # Component to display post details
│   ├── PostList.tsx      # Grid of post cards
│   ├── SearchBar.tsx     # Search input component
│   └── SkeletonCard.tsx  # Loading skeleton for posts
├── pages/                # Page components
│   ├── HomePage.tsx      # Main page with post listing
│   └── PostDetailPage.tsx # Detailed view for a single post
├── redux/                # Redux state management
│   ├── store.ts          # Redux store configuration
│   └── postsSlice.ts     # Posts state logic and reducers
├── services/             # API services
│   └── api.ts            # Functions for API calls
├── tests/                # Test files
│   └── PostList.test.tsx # Tests for PostList component
└── types/                # TypeScript type definitions
    └── index.ts          # Type interfaces for the app
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone <repository-url>
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start the development server

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check for code issues
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run preview` - Preview the production build locally

## Testing

The application includes tests written with Vitest and React Testing Library. To run the tests:

```
npm test
```
