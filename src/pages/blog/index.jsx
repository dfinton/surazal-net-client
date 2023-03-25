import { observer } from 'mobx-react';
import Head from 'next/head';

import { useStore } from '@/components/store/store-provider';
import BlogPostListComponent from '@/components/blog/post-list';
import FooterComponent from '@/components/layout/footer';
import HeaderComponent from '@/components/layout/header';
import CmsPostStore from '@/store/cms-post';

const BlogListView = function() {
  const { cmsPostStore } = useStore();

  const {
    postSummaryList,
    postCount,
  page,
    pageSize,
    pageCount,
  } = cmsPostStore;

  const title = `Blog - ${process.env.NEXT_PUBLIC_SITE_TITLE}`;

  return (
    <div className="app">
      <Head>
        <title>{title}</title>
      </Head>
      <HeaderComponent />
      <div className="body">
        <BlogPostListComponent
          postSummaryList={postSummaryList}
          postCount={postCount}
          page={page}
          pageSize={pageSize}
          pageCount={pageCount}
        />
      </div>
      <FooterComponent />
    </div>
  );
}

export default observer(BlogListView);

export async function getServerSideProps(context) {
  const cmsPostStore = new CmsPostStore();

  const page = Number(context.query['page'] ?? 1);
  const pageSize = Number(context.query['page-size'] ?? 20);

  await Promise.all([
    cmsPostStore.fetchPostList({
      page,
      pageSize,
    }),
    cmsPostStore.fetchPostCount(),
  ]);

  cmsPostStore.calculatePageCount();

  const {
    postSummaryList = [],
    postCount = 0,
    pageCount = 0,
  } = cmsPostStore;

  const props = {
    initialState: {
      cmsPostStore: {
        postSummaryList,
        postCount,
        page,
        pageSize,
        pageCount,
      },
    }
  };

  return { props };
}
