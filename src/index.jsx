import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { BlogRoute, BlogListRoute, blogLoader, blogListLoader } from "./routes/blog";
import { FractalRoute, FractalListRoute, fractalLoader, fractalListLoader } from "./routes/fractal";
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
  {
    path: "/fractal",
    element: <FractalListRoute />,
    loader: fractalListLoader,
  },
  {
    path: "/fractal/:id",
    element: <FractalRoute />,
    loader: fractalLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
