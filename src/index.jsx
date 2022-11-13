import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { BlogRoute, BlogListRoute, blogLoader, blogListLoader } from "./routes/blog";
import { RootRoute, rootLoader } from "./routes/root";
import './app.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    loader: rootLoader,
  },
  {
    path: "/blog",
    element: <BlogListRoute />,
    loader: blogListLoader,
  },
  {
    path: "/blog/:id",
    element: <BlogRoute />,
    loader: blogLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
