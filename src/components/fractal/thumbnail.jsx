import { Component } from 'react';
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
            <img alt={fractal.altText} src={fractal.thumbnail.url} />
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
