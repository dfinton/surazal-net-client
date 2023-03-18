import { observer } from 'mobx-react';

import RootComponent from '@/components/root';
import { useStore } from '@/components/store/store-provider';
import FooterComponent from '@/components/layout/footer';
import HeaderComponent from '@/components/layout/header';
import CmsPostStore from '@/store/cms-post';

const RootView = function() {
  const { cmsPostStore } = useStore();
  const post = cmsPostStore.post[cmsPostStore.latestPostId];

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

export default observer(RootView);

export async function getServerSideProps() {
  const cmsPostStore = new CmsPostStore();

  await cmsPostStore.fetchLatestPost();

  const {
    latestPostId = null,
    post = {},
  } = cmsPostStore;

  const props = {
    initialState: {
      cmsPostStore: {
        latestPostId,
        post,
      },
    }
  };

  return { props };
}
