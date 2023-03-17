import { useLoaderData } from "react-router-dom";
import MetaTags from 'react-meta-tags';

import FractalImageComponent from '../components/fractal/image';
import FractalImageListComponent from '../components/fractal/image-list';
import FooterComponent from '../components/layout/footer';
import HeaderComponent from '../components/layout/header';
import cmsFractalStore from '../store/cms-fractal';

const cmsFractal = cmsFractalStore();

const fractalLoader = async ({request, params}) => {
  const {id} = params;

  if (!id) {
    return undefined;
  }

  await cmsFractal.fetchFractal({id});

  return {
    fractal: cmsFractal.fractal[id],
    url: request.url,
  };
};

const fractalListLoader = async ({request}) => {
  const searchParams = new URL(request.url).searchParams;
  let page = searchParams.get('page') ?? 1;
  let pageSize = searchParams.get('page-size') ?? 24;

  await Promise.all([
    cmsFractal.fetchFractalList({page, pageSize}),
    cmsFractal.fetchFractalCount(),
  ]);

  pageSize = Math.max(pageSize, 1);

  const fractalList = cmsFractal.fractalList;
  const fractalCount = cmsFractal.fractalCount;
  const pageCount = Math.ceil(fractalCount / pageSize);

  page = Math.max(page, 1);
  page = Math.min(page, pageCount);

  return {
    fractalCount,
    fractalList,
    page,
    pageSize,
    pageCount,
  };
};

function FractalRoute() {
  const {fractal, url} = useLoaderData();

  const titleMetaTag = (
    <meta property="og:title" content={fractal.name} />
  );

  const descriptionMetaTag = (
    <meta property="og:description" content={fractal.altText} />
  );

  let imageMetaTag;

  const fractalSizes = [
    fractal.large,
    fractal.medium,
    fractal.small,
    fractal.thumbnail,
  ];

  for (const imageMetaTagFractal of fractalSizes) {
    if (imageMetaTagFractal) {
      imageMetaTag = (
        <meta property="og:image" content={imageMetaTagFractal.url} />
      );

      break;
    }
  }

  const urlMetaTag = (
    <meta property="og:url" content={url} />
  );

  return (
    <div className="app">
      <MetaTags>
        {titleMetaTag}
        {descriptionMetaTag}
        {imageMetaTag}
        {urlMetaTag}
      </MetaTags>
      <HeaderComponent />
      <div className="body">
        <FractalImageComponent fractal={fractal} />
      </div>
      <FooterComponent />
    </div>
  );
};

function FractalListRoute() {
  const {
    fractalCount,
    fractalList,
    page,
    pageSize,
    pageCount,
  } = useLoaderData();

  return (
    <div className="app">
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
};

export {
  fractalLoader,
  fractalListLoader,
  FractalRoute,
  FractalListRoute,
};
