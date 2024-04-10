import "./styles/index.scss";import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout.jsx";
import Home from "./routes/Home.jsx";
import AllArticles from "./routes/AllArticles.jsx";
import ArticleCard from "./routes/ArticleCard.jsx";
import ArticlesByTopic from "./routes/ArticlesByTopic.jsx";
import Users from "./routes/Users.jsx";
import PostComment from "./components/PostComment.jsx";
import { UserProvider } from "./components/UserContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/articles", element: <AllArticles /> },
      { path: "/articles/:article_id", element: <ArticleCard /> },
      { path: "/users", element: <Users /> },
      { path: "/articles/:article_id/comments", element: <PostComment /> },
      { path: "/articles", element: <ArticlesByTopic /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
