import { Component } from 'react';
import { observer } from 'mobx-react';

import cmsPostStore from '../../store/cms-post';

const Blog = observer(
  class Blog extends Component {
    cmsPost;

    constructor(props) {
      super(props);

      this.cmsPost = cmsPostStore();
      this.cmsPost.fetchPostList();
    }

    render() {
      const postList = this.cmsPost.postList.map(post => {
        const content = post.content.document.map(postDocument => {
          let children;

          if (postDocument.type === 'paragraph') {
            children = postDocument.children.map((child, childIndex) => {
              return <p key={childIndex}>{child.text}</p>
            });
          }

          return children;
        });

        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <div>{content}</div>
          </div>
        );
      });

      return (
        <div class="blog">
          <h2>Blog</h2>
          {postList}
        </div>
      );
    }
  }
);

export default Blog;
