import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import cmsPostStore from './store/cms-post';
import { BlogRoute, blogLoader } from "./routes/blog";
import { RootRoute } from "./routes/root";
import './app.scss';

const cmsPost = cmsPostStore();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute cmsPost={cmsPost} />,
  },
  {
    path: "/blog",
    element: <BlogRoute />,
    loader: blogLoader(cmsPost),
  },
  {
    path: "/blog/:id",
    element: <BlogRoute />,
    loader: blogLoader(cmsPost),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
