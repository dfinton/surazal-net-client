import { Link } from "react-router-dom";
import { Component } from 'react';

import './thumbnail.scss';

class FractalThumbnailComponent extends Component {
  render() {
    const fractal = this.props.fractal;

    if (!fractal.thumbnail) {
      return;
    }

    return (
      <div className="fractal-thumbnail outer">
        <div className="fractal-thumbnail inner">
          <Link to={`/fractal/${fractal.id}`}>
            <img alt={fractal.altText} src={fractal.thumbnail.url} />
          </Link>
          <div className="fractal-thumbnail description">
            <Link to={`/fractal/${fractal.id}`}>
              {fractal.name}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default FractalThumbnailComponent;
