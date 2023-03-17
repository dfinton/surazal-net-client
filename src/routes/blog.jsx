import { useLoaderData } from "react-router-dom";

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

  return {
    post: cmsPost.post[id],
  };
};

const blogListLoader = async ({request}) => {
  const searchParams = new URL(request.url).searchParams;
  let page = searchParams.get('page') ?? 1;
  let pageSize = searchParams.get('page-size') ?? 20;

  await Promise.all([
    cmsPost.fetchPostList({page, pageSize}),
    cmsPost.fetchPostCount(),
  ]);

  pageSize = Math.max(pageSize, 1);

  const postList = cmsPost.postList;
  const postCount = cmsPost.postCount;
  const pageCount = Math.ceil(postCount / pageSize);

  page = Math.max(page, 1);
  page = Math.min(page, pageCount);

  return {
    postCount,
    postList,
    page,
    pageSize,
    pageCount,
  };
};

function BlogRoute() {
  const {post} = useLoaderData();

  return (
    <div className="app">
      <HeaderComponent />
      <div className="body">
        <BlogPostComponent post={post} />
      </div>
      <FooterComponent />
    </div>
  );
};

function BlogListRoute() {
  const {
    postCount,
    postList,
    page,
    pageSize,
    pageCount,
  } = useLoaderData();

  return (
    <div className="app">
      <HeaderComponent />
      <div className="body">
        <BlogPostListComponent
          postList={postList}
          postCount={postCount}
          page={page}
          pageSize={pageSize}
          pageCount={pageCount}
        />
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
