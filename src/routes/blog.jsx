import { useLoaderData } from "react-router-dom";

import ColumnComponent from '../components/layout/column';
import BlogPostComponent from '../components/blog/post';
import BlogPostListComponent from '../components/blog/post-list';
import FooterComponent from '../components/layout/footer';
import HeaderComponent from '../components/layout/header';
import cmsPostStore from '../store/cms-post';

const cmsPost = cmsPostStore();

const blogLoader = async ({params}) => {
  const {id} = params;

  if (!id) {
    return undefined;
  }

  await cmsPost.fetchPost({id});

  return cmsPost.post[id];
};

const blogListLoader = async ({params}) => {
  const {page = 1, pageSize = 10} = params;

  await cmsPost.fetchPostList({page, pageSize});

  return (cmsPost.postList);
};

function BlogRoute() {
  const post = useLoaderData();

  return (
    <div className="app">
      <HeaderComponent />
      <div className="body">
        <ColumnComponent />
        <BlogPostComponent post={post} />
      </div>
      <FooterComponent />
    </div>
  );
};

function BlogListRoute() {
  const postList = useLoaderData();

  return (
    <div className="app">
      <HeaderComponent />
      <div className="body">
        <ColumnComponent />
        <BlogPostListComponent postList={postList} />
      </div>
      <FooterComponent />
    </div>
  );
};

export {
  blogLoader,
  blogListLoader,
  BlogRoute,
  BlogListRoute,
};
