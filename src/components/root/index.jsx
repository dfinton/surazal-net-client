import { Component } from 'react';

import BlogPostComponent from '../blog/post';
import styles from './index.module.scss';

class RootComponent extends Component {
  render() {
    const post = this.props.post;

    return (
      <div className={styles['root-content']}>
        <BlogPostComponent post={post} />
      </div>
    );
  }
}

export default RootComponent;
