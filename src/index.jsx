import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import cmsPostStore from './store/cms-post';
import BlogComponent from "./routes/blog";
import RootComponent from "./routes/root";
import './app.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent cmsPost={cmsPostStore()} />,
  },
  {
    path: "/blog/:id",
    element: <BlogComponent cmsPost={cmsPostStore()} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
