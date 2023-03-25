import { observer } from 'mobx-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useStore } from '@/components/store/store-provider';
import FractalImageComponent from '@/components/fractal/image';
import FooterComponent from '@/components/layout/footer';
import HeaderComponent from '@/components/layout/header';
import CmsFractalStore from '@/store/cms-fractal';

const FractalImageView = function() {
  const { cmsFractalStore } = useStore();
  const router = useRouter();
  const id = router.query.id;
  const fractal = cmsFractalStore.fractal[id];
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;
  const title = `${fractal.name} - ${process.env.NEXT_PUBLIC_SITE_TITLE}`;

  return (
    <div className="app">
      <Head>
        <title>{title}</title>
        <meta key="title" property="og:title" content={title} />
        <meta key="description" property="og:description" content={fractal.altText} />
        <meta key="image" property="og:image" content={fractal.medium.url} />
        <meta key="image:width" property="og:image:width" content={fractal.medium.width} />
        <meta key="image:height" property="og:image:height" content={fractal.medium.height} />
        <meta key="image:alt" property="og:image:alt" content={fractal.altText} />
        <meta key="type" property="og:type" content="website" />
        <meta key="url" property="og:url" content={url} />
      </Head>
      <HeaderComponent />
      <div className="body">
        <FractalImageComponent fractal={fractal} />
      </div>
      <FooterComponent />
    </div>
  );
}

export default observer(FractalImageView);

export async function getServerSideProps(context) {
  const cmsFractalStore = new CmsFractalStore();
  const id = context.query.id;

  await cmsFractalStore.fetchFractal({
    id,
  });

  const {
    fractal,
  } = cmsFractalStore;

  const props = {
    initialState: {
      cmsFractalStore: {
        fractal,
      },
    },
  };

  return { props };
}
