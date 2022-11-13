import { useLoaderData } from "react-router-dom";

import ColumnComponent from '../components/layout/column';
import BlogPostComponent from '../components/blog/post';
import FooterComponent from '../components/layout/footer';
import HeaderComponent from '../components/layout/header';

const blogLoader = (cmsPost) => {
  return async ({params}) => {
    const {id} = params;

    if (!id) {
      return undefined;
    }

    await cmsPost.fetchPost({id});

    return cmsPost.post[id];
  };
};

function BlogRoute() {
  const post = useLoaderData();

  let blogComponent;

  blogComponent = <BlogPostComponent post={post} />;

  return (
    <div className="app">
      <HeaderComponent />
      <div className="body">
        <ColumnComponent />
        {blogComponent}
      </div>
      <FooterComponent />
    </div>
  );
};

export {
  blogLoader,
  BlogRoute,
};
