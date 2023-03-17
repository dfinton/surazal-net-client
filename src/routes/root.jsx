import { useLoaderData } from "react-router-dom";

import RootComponent from '../components/root';
import FooterComponent from '../components/layout/footer';
import HeaderComponent from '../components/layout/header';
import cmsPostStore from '../store/cms-post';

const cmsPost = cmsPostStore();

const rootLoader = async () => {
  await cmsPost.fetchLatestPost();

  const id = cmsPost.latestPostId;

  return {
    post: cmsPost.post[id],
  };
};

const RootRoute = function() {
  const {post} = useLoaderData();

  return (
    <div className="app">
      <HeaderComponent />
      <div className="body">
        <RootComponent post={post} />
      </div>
      <FooterComponent />
    </div>
  );
}

export {
  RootRoute,
  rootLoader,
};
