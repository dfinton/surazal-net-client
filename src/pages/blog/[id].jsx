import { observer } from 'mobx-react';

import { useRouter } from 'next/router';
import { useStore } from '@/components/store/store-provider';
import BlogPostComponent from '@/components/blog/post';
import FooterComponent from '@/components/layout/footer';
import HeaderComponent from '@/components/layout/header';
import CmsPostStore from '@/store/cms-post';

const BlogPostView = function() {
  const { cmsPostStore } = useStore();
  const router = useRouter();
  const id = router.query.id;
  const post = cmsPostStore.post[id];

  return (
    <div className="app">
      <HeaderComponent />
      <div className="body">
        <BlogPostComponent post={post} />
      </div>
      <FooterComponent />
    </div>
  );
}

export default observer(BlogPostView);

export async function getServerSideProps(context) {
  const cmsPostStore = new CmsPostStore();
  const id = context.query.id;

  await cmsPostStore.fetchPost({
    id,
  });

  const {
    post,
  } = cmsPostStore;

  const props = {
    initialState: {
      cmsPostStore: {
        post,
      },
    },
  };

  return { props };
}
