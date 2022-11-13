import { Component } from 'react';

import ColumnComponent from '../components/layout/column';
import RootComponent from '../components/root';
import FooterComponent from '../components/layout/footer';
import HeaderComponent from '../components/layout/header';

class RootRoute extends Component {
  render() {
    return (
      <div className="app">
        <HeaderComponent />
        <div className="body">
          <ColumnComponent />
          <RootComponent />
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export {
  RootRoute,
};
