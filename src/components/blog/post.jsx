import { Component } from 'react';
import Link from 'next/link';

import { convertDocumentObjectToElement } from '@/lib/cms';

import FractalThumbnailComponent from '../fractal/thumbnail';
import styles from './post.module.scss';

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
      <Link
        href={{
          pathname: '/blog/[id]',
          query: {
            id: post.id,
          },
        }}
      >{createdAt}</Link>
    );

    const blogPostListLink = (
      <Link href={'/blog'}>View older posts</Link>
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
        <div className={styles['blog-fractal-gallery']}>
          {fractalThumbnails}
        </div>
      );
    }

    return (
      <div className="top-level content">
        <div className={styles['blog-post']}>
          <div className={styles['blog-header']}>
            <h2>{post.title}</h2>
            <div>by <strong>{authorAttribution}</strong> on {blogPostLink} ({blogPostListLink})</div>
          </div>
          <div className={styles['blog-body']}>
            <div>{fullPost}</div>
            {fractalGallery}
          </div>
        </div>
      </div>
    );
  }
}

export default BlogPostComponent;
