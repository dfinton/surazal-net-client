import { Component } from 'react';

import BlogComponent from './blog';

class RootComponent extends Component {
  render() {
    return (
      <div className="top-level content">
        <BlogComponent />
      </div>
    );
  }
}

export default RootComponent;
