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
          <Link to={"/"}>Main Page</Link>
        </div>
      </div>
    );
  }
}

export default ColumnComponent;
