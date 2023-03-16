import { useLoaderData } from "react-router-dom";

import SubheaderComponent from '../components/layout/subheader';
import FractalImageComponent from '../components/fractal/image';
import FractalImageListComponent from '../components/fractal/image-list';
import FooterComponent from '../components/layout/footer';
import HeaderComponent from '../components/layout/header';
import cmsFractalStore from '../store/cms-fractal';

const cmsFractal = cmsFractalStore();

const fractalLoader = async ({params}) => {
  const {id} = params;

  if (!id) {
    return undefined;
  }

  await cmsFractal.fetchFractal({id});

  return {
    fractal: cmsFractal.fractal[id],
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
  const {fractal} = useLoaderData();

  return (
    <div className="app">
      <HeaderComponent />
      <SubheaderComponent />
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
      <SubheaderComponent />
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
