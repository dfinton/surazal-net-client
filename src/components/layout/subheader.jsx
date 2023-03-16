import { Component } from 'react';
import { Link } from "react-router-dom";

import './subheader.scss';

class ColumnComponent extends Component {
  render() {
    return (
      <div className="top-level subheader">
        <div className="subheader-navigation">
          <ul className="subheader-links">
            <li><Link to={"/"}>Main Page</Link></li>
            <li><Link to={"/blog"}>Blog</Link></li>
            <li><Link to={"/fractal"}>Fractals</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ColumnComponent;
