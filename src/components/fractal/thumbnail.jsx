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
      <div className={styles['fractal-thumbnail-outer']}>
        <div className={styles['fractal-thumbnail-inner']}>
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
      </div>
    );
  }
}

export default FractalThumbnailComponent;
