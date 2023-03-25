import { observer } from 'mobx-react';
import Head from 'next/head';
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
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;
  const title = `${post.title} - ${process.env.NEXT_PUBLIC_SITE_TITLE}`;
  const imageMeta = [];

  if (post.fractals) {
    const fractal = post.fractals[0];

    if (fractal.medium) {
      imageMeta.push((<meta key="image" property="og:image" content={fractal.medium.url} />));
      imageMeta.push((<meta key="image:width" property="og:image:width" content={fractal.medium.width} />));
      imageMeta.push((<meta key="image:height" property="og:image:height" content={fractal.medium.height} />));
      imageMeta.push((<meta key="image:alt" property="og:image:alt" content={fractal.altText} />));
    }
  }

  return (
    <div className="app">
      <Head>
        <title>{title}</title>
        <meta key="title" property="og:title" content={title} />
        <meta key="description" property="og:description" content={post.title} />
        {imageMeta}
        <meta key="type" property="og:type" content="website" />
        <meta key="url" property="og:url" content={url} />
      </Head>
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
