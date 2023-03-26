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
              width={fractal.thumbnail.width}
              height={fractal.thumbnail.height}
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
