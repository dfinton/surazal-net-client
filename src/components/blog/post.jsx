import { Component } from 'react';
import { Link } from "react-router-dom";

import { convertDocumentObjectToElement } from '../../lib/cms';

class BlogPostComponent extends Component {
  render() {
    const post = this.props.post;

    const fullPost = post.content.document.map((postDocument, postDocumentIndex) => {
      const postElement = convertDocumentObjectToElement({
        documentObject: postDocument,
        documentObjectIndex: postDocumentIndex,
      });

      return <div key={postDocumentIndex}>{postElement}</div>;
    });

    const createdAt = new Date(post.createdAt)
      .toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/Chicago',
      });

    const blogLink = (
      <Link to={`/blog/${post.id}`}>{createdAt}</Link>
    );

    const authorAttribution = post.author ? post.author.name : 'Unknown';

    let fractalGallery;

    if (post.fractals) {
      const fractalThumbnails = post.fractals.map((fractal, fractalIndex) => {
        if (!fractal.thumbnail) {
          return undefined;
        }

        return (
          <div key={fractalIndex} className="blog-fractal-thumbnail">
            <div className="blog-fractal-thumbnail-image">
              <img src={fractal.thumbnail.url} alt={fractal.altText} />
            </div>
          </div>
        )
      });

      fractalGallery = (
        <div className="blog-fractal-gallery">
          {fractalThumbnails}
        </div>
      );
    }

    return (
      <div className="top-level content">
        <div className="blog-post">
          <div className="blog-header">
            <h2>{post.title}</h2>
            <div>by <strong>{authorAttribution}</strong> on {blogLink}</div>
          </div>
          <div className="blog-body">
            <div>{fullPost}</div>
            {fractalGallery}
          </div>
        </div>
      </div>
    );
  }
}

export default BlogPostComponent;
