import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home.jsx";
import AllArticles from "./routes/AllArticles.jsx";
import RootLayout from "./routes/RootLayout.jsx";
import "./styles/index.scss";
import Users from "./routes/Users.jsx";
import PostComment from "./components/PostComment.jsx";
import ArticleCard from "./routes/ArticleCard.jsx";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
