import { Component } from 'react';

import Blog from '../content/blog';

class Content extends Component {
  render() {
    return (
      <div className="top-level content">
        <Blog />
      </div>
    );
  }
}

export default Content;
