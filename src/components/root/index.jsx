import { Component } from 'react';

import BlogPostComponent from '../blog/post';
import './index.scss';

class RootComponent extends Component {
  render() {
    const post = this.props.post;

    return (
      <div className="root-content">
        <BlogPostComponent post={post} />
      </div>
    );
  }
}

export default RootComponent;
