import { Component } from 'react';

import FractalThumbnailComponent from './thumbnail';

class FractalImageComponent extends Component {
  render() {
    const fractal = this.props.fractal;

    let thumbnailLink, smallLink, mediumLink, largeLink;

    if (fractal.thumbnail) {
      thumbnailLink = (
        <li>
          <a href={fractal.thumbnail.url}>
            Small - {fractal.thumbnail.width}x{fractal.thumbnail.height}
          </a>
        </li>
      );
    }

    if (fractal.small) {
      smallLink = (
        <li>
          <a href={fractal.small.url}>
            Small - {fractal.small.width}x{fractal.small.height}
          </a>
        </li>
      );
    }

    if (fractal.medium) {
      mediumLink = (
        <li>
          <a href={fractal.medium.url}>
            Small - {fractal.medium.width}x{fractal.medium.height}
          </a>
        </li>
      );
    }

    if (fractal.large) {
      largeLink = (
        <li>
          <a href={fractal.large.url}>
            Small - {fractal.large.width}x{fractal.large.height}
          </a>
        </li>
      );
    }

    return (
      <div className="top-level content">
        <div className="fractal-image">
          <div className="fractal-image-links">
            <FractalThumbnailComponent fractal={fractal} />
            <ul>
              {thumbnailLink}
              {smallLink}
              {mediumLink}
              {largeLink}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default FractalImageComponent;
