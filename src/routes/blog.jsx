import { Component } from 'react';

import ColumnComponent from '../components/layout/column';
import BlogComponent from '../components/blog';
import FooterComponent from '../components/layout/footer';
import HeaderComponent from '../components/layout/header';

class BlogRoute extends Component {
  render() {
    return (
      <div className="app">
        <HeaderComponent />
        <div className="body">
          <ColumnComponent />
          <BlogComponent />
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default BlogRoute;
