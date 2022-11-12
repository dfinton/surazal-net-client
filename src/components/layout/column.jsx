import { Component } from 'react';

class Column extends Component {
  render() {
    return (
      <div className="top-level column">
        <div className="column-header">
          <h2>Navigate</h2>
        </div>
        <div className="column-body">
          <a href="/">Main Page</a>
        </div>
      </div>
    );
  }
}

export default Column;
