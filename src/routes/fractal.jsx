import { useLoaderData } from "react-router-dom";

import ColumnComponent from '../components/layout/column';
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
  const page = searchParams.get('page') ?? 1;
  const pageSize = searchParams.get('pageSize') ?? 10;

  await cmsFractal.fetchFractalList({page, pageSize});

  return {
    fractalList: cmsFractal.fractalList,
  };
};

function FractalRoute() {
  const {fractal} = useLoaderData();

  return (
    <div className="app">
      <HeaderComponent />
      <div className="body">
        <ColumnComponent />
        <FractalImageComponent fractal={fractal} />
      </div>
      <FooterComponent />
    </div>
  );
};

function FractalListRoute() {
  const {fractalList} = useLoaderData();

  return (
    <div className="app">
      <HeaderComponent />
      <div className="body">
        <ColumnComponent />
        <FractalImageListComponent fractalList={fractalList} />
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
