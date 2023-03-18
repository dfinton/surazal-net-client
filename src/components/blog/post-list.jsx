import { Component } from 'react';
import Link from 'next/link';

import PaginationComponent from '../common/pagination';

import styles from './post-list.module.scss';

class BlogPostListComponent extends Component {
  render() {
    const {
      postSummaryList,
      page,
      pageSize,
      pageCount,
    } = this.props;

    const pagination = (
      <PaginationComponent
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        baseUrl="/blog"
      />
    );

    const blogList = postSummaryList.map((post, postIndex) => {
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

      const author = post.author ? post.author.name : 'Unknown';

      return (
        <div key={postIndex} className={styles['blog-post-list-item']}>
          <div className={styles['blog-post-list-item-created-at']}>
            {createdAt}
          </div>
          <div className={styles['blog-post-list-item-title']}>
            <Link
              href={{
                pathname: '/blog/[id]',
                query: {
                  id: post.id,
                },
              }}
            >{post.title}</Link>
          </div>
          <div className={styles['blog-post-list-item-author']}>
            {author}
          </div>
        </div>
      );
    });

    return (
      <div className="top-level content">
        <div className={styles['blog-post-list']}>
          {pagination}
          <div className={styles['blog-post-list-body']}>
            {blogList}
          </div>
          {pagination}
        </div>
      </div>
    );
  }
}

export default BlogPostListComponent;
