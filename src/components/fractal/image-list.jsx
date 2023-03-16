import { Component } from 'react';

import PaginationComponent from '../common/pagination';

import FractalThumbnailComponent from './thumbnail';
import './image-list.scss';

class FractalImageListComponent extends Component {
  render() {
    const {
      fractalList,
      page,
      pageSize,
      pageCount,
    }= this.props;

    const pagination = (
      <PaginationComponent
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        baseUrl="/fractal"
      />
    );

    const fractalListGallery = fractalList.map((fractal, fractalIndex) => {
      return (
        <FractalThumbnailComponent key={fractalIndex} fractal={fractal} />
      );
    });

    return (
      <div className="top-level content">
        <div className="fractal-image-list">
          {pagination}
          <div className="fractal-image-list-gallery">
            {fractalListGallery}
          </div>
          {pagination}
        </div>
      </div>
    );
  }
}

export default FractalImageListComponent;
