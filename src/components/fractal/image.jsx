import Image from 'next/image';
import { Component } from 'react';

import styles from './image.module.scss';

class FractalImageComponent extends Component {
  render() {
    const fractal = this.props.fractal;

    let thumbnailLink, smallLink, mediumLink, largeLink;

    let preview = (
      <span><strong>No Preview Available</strong></span>
    );

    if (fractal.thumbnail) {
      thumbnailLink = (
        <span className={styles['fractal-image-link']}>
          <a href={fractal.thumbnail.url}>
            Thumbnail: {fractal.thumbnail.width}x{fractal.thumbnail.height}
          </a>
        </span>
      );
    }

    if (fractal.small) {
      smallLink = (
        <span className={styles['fractal-image-link']}>
          <a href={fractal.small.url}>
            Small: {fractal.small.width}x{fractal.small.height}
          </a>
        </span>
      );

      preview = (
        <div className={styles['fractal-image-preview-container']}>
          <a href={fractal.small.url}>
            <Image
              alt={fractal.altText}
              src={fractal.small.url}
              width={fractal.small.width}
              height={fractal.small.height}
            />
          </a>
        </div>
      );
    }

    if (fractal.medium) {
      mediumLink = (
        <span className={styles['fractal-image-link']}>
          <a href={fractal.medium.url}>
            Medium: {fractal.medium.width}x{fractal.medium.height}
          </a>
        </span>
      );
    }

    if (fractal.large) {
      largeLink = (
        <span className={styles['fractal-image-link']}>
          <a href={fractal.large.url}>
            Full Size: {fractal.large.width}x{fractal.large.height}
          </a>
        </span>
      );
    }

    return (
      <div className="top-level content">
        <div className={styles['fractal-image']}>
          <div className={styles['fractal-image-links']}>
            {thumbnailLink}
            {smallLink}
            {mediumLink}
            {largeLink}
          </div>
          <div className={styles['fractal-image-preview']}>
            {preview}
          </div>
        </div>
      </div>
    );
  }
}

export default FractalImageComponent;
