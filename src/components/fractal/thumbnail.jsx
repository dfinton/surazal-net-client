import { Component } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './thumbnail.module.scss';

class FractalThumbnailComponent extends Component {
  render() {
    const fractal = this.props.fractal;

    if (!fractal.thumbnail) {
      return;
    }

    // TODO I'd like to find out if we can pull this from the styles instead of hardcoding it
    const [windowWidth, windowHeight] = [160, 90];
    const windowAspectRatio = windowWidth / windowHeight;
    const thumbnailAspectRatio = fractal.thumbnail.width / fractal.thumbnail.height;

    let width, height;

    if (thumbnailAspectRatio >= windowAspectRatio) {
      width = windowWidth;
      height = fractal.thumbnail.height * (windowWidth / fractal.thumbnail.width);
    } else {
      height = windowHeight;
      width = fractal.thumbnail.width * (windowHeight / fractal.thumbnail.height) ;
    }

    return (
      <div className={styles['fractal-thumbnail']}>
        <div className={styles['fractal-thumbnail-image']}>
          <Link href={{
            pathname: '/fractal/[id]',
            query: {
              id: fractal.id,
            },
          }}>
            <Image
              alt={fractal.altText}
              src={fractal.thumbnail.url}
              width={width}
              height={height}
            />
          </Link>
        </div>
        <div className={styles['fractal-thumbnail-description']}>
          <Link href={{
            pathname: '/fractal/[id]',
            query: {
              id: fractal.id,
            },
          }}>
            {fractal.name}
          </Link>
        </div>
      </div>
    );
  }
}

export default FractalThumbnailComponent;
