import { observer } from 'mobx-react';
import Head from 'next/head';

import { useStore } from '@/components/store/store-provider';
import FractalImageListComponent from '@/components/fractal/image-list';
import FooterComponent from '@/components/layout/footer';
import HeaderComponent from '@/components/layout/header';
import CmsFractalStore from '@/store/cms-fractal';

const FractalListView = function() {
  const { cmsFractalStore } = useStore();

  const {
    fractalCount,
    fractalList,
    page,
    pageSize,
    pageCount,
  } = cmsFractalStore;

  const title = `Fractals - ${process.env.NEXT_PUBLIC_SITE_TITLE}`;

  return (
    <div className="app">
      <Head>
        <title>{title}</title>
      </Head>
      <HeaderComponent />
      <div className="body">
        <FractalImageListComponent
          fractalCount={fractalCount} 
          fractalList={fractalList} 
          page={page} 
          pageSize={pageSize} 
          pageCount={pageCount} 
        />
      </div>
      <FooterComponent />
    </div>
  );
}

export default observer(FractalListView);

export async function getServerSideProps(context) {
  const cmsFractalStore = new CmsFractalStore();
  const page = Number(context.query['page'] ?? 1);
  const pageSize = Number(context.query['page-size'] ?? 24);

  await Promise.all([
    cmsFractalStore.fetchFractalList({
      page,
      pageSize,
    }),
    cmsFractalStore.fetchFractalCount(),
  ]);

  cmsFractalStore.calculatePageCount();
  
  const {
    fractalCount = 0,
    fractalList = [],
    pageCount = 0,
  } = cmsFractalStore;

  const props = {
    initialState: {
      cmsFractalStore: {
        fractalList,
        fractalCount,
        page,
        pageSize,
        pageCount,
      },
    }
  };

  return { props };
}
