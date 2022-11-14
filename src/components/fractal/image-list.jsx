import { Link } from "react-router-dom";

import { Component } from 'react';

class FractalImageListComponent extends Component {
  render() {
    const fractalList = this.props.fractalList;

    const fractalListGallery = fractalList.map((fractal, fractalIndex) => {
      return (
        <div key={fractalIndex} className="fractal-image-list-thumbnail">
          <Link to={`/fractal/${fractal.id}`}>
            <img alt={fractal.altText} src={fractal.thumbnail.url} />
          </Link>
        </div>
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
