import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { BlogRoute, blogLoader } from "./routes/blog";
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
    element: <BlogRoute />,
    loader: blogLoader,
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
