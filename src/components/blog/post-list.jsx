import { Component } from 'react';
import { Link } from 'react-router-dom';

import PaginationComponent from '../common/pagination';

import './post-list.scss';

class BlogPostListComponent extends Component {
  render() {
    const {
      postList,
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

    const blogList = postList.map((post, postIndex) => {
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
        <div key={postIndex} className="blog-post-list-item">
          <div className="blog-post-list-item-created-at">
            {createdAt}
          </div>
          <div className="blog-post-list-item-title">
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </div>
          <div className="blog-post-list-item-author">
            {author}
          </div>
        </div>
      );
    });

    return (
      <div className="top-level content">
        <div className="blog-post-list">
          {pagination}
          <div className="blog-post-list-body">
            {blogList}
          </div>
          {pagination}
        </div>
      </div>
    );
  }
}

export default BlogPostListComponent;
