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

const blogListLoader = async ({request}) => {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get('page') ?? 1;
  const pageSize = searchParams.get('pageSize') ?? 10;

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
