import { Component } from 'react';

import FractalThumbnailComponent from './thumbnail';
import './image-list.scss';

class FractalImageListComponent extends Component {
  render() {
    const fractalList = this.props.fractalList;

    const fractalListGallery = fractalList.map((fractal, fractalIndex) => {
      return (
        <FractalThumbnailComponent key={fractalIndex} fractal={fractal} />
      );
    });

    return (
      <div className="top-level content">
        <div className="fractal-image-list">
          <div className="fractal-image-list-gallery">
            {fractalListGallery}
          </div>
        </div>
      </div>
    );
  }
}

export default FractalImageListComponent;
