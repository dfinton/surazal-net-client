import { Component } from 'react';
import { Link } from "react-router-dom";

import { convertDocumentObjectToElement } from '../../lib/cms';

import FractalThumbnailComponent from '../fractal/thumbnail';
import './post.scss';

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

    const blogPostLink = (
      <Link to={`/blog/${post.id}`}>{createdAt}</Link>
    );

    const blogPostListLink = (
      <Link to={'/blog'}>View older posts</Link>
    );

    const authorAttribution = post.author ? post.author.name : 'Unknown';

    let fractalGallery;

    if (post.fractals) {
      const fractalThumbnails = post.fractals.map((fractal, fractalIndex) => {
        return (
          <FractalThumbnailComponent key={fractalIndex} fractal={fractal} />
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
            <div>by <strong>{authorAttribution}</strong> on {blogPostLink} ({blogPostListLink})</div>
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
