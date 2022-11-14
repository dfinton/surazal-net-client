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

  return cmsFractal.fractal[id];
};

const fractalListLoader = async ({params}) => {
  const {page = 1, pageSize = 10} = params;

  await cmsFractal.fetchFractalList({page, pageSize});

  return (cmsFractal.fractalList);
};

function FractalRoute() {
  const fractal = useLoaderData();

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
  const fractalList = useLoaderData();

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
