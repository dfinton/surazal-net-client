import { Component } from 'react';
import { Link } from "react-router-dom";

import './header.scss';

class HeaderComponent extends Component {
  render() {
    return (
      <header className="top-level">
        <div className="header">
          <h1>The 24th Dimension</h1>
          <span><em>"This site is under construction"</em></span>
        </div>
        <div className="subheader">
          <div className="subheader-navigation">
            <ul className="subheader-links">
              <li><Link to={"/"}>Main Page</Link></li>
              <li><Link to={"/blog"}>Blog</Link></li>
              <li><Link to={"/fractal"}>Fractals</Link></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderComponent;
