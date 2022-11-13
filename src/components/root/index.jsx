import { Component } from 'react';

import BlogPostComponent from '../blog/post';

class RootComponent extends Component {
  render() {
    const post = this.props.post;

    return (
      <div className="top-level content">
        <BlogPostComponent post={post} />
      </div>
    );
  }
}

export default RootComponent;
