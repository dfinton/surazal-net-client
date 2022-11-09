import { Component } from 'react';

import Column from './column';
import Content from './content';

class Body extends Component {
  render() {
    return (
      <div className="body">
        <Column />
        <Content />
      </div>
    );
  }
}

export default Body;
