import { Component } from 'react';
import { Link } from "react-router-dom";

class ColumnComponent extends Component {
  render() {
    return (
      <div className="top-level column">
        <div className="column-header">
          <h2>Navigate</h2>
        </div>
        <div className="column-body">
          <ul className="column-links">
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
