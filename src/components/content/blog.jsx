import { Component } from 'react';
import { observer } from 'mobx-react';

import cmsPostStore from '../../store/cms-post';

const convertToHtml = ({documentObject, documentObjectIndex}) => {
  if (documentObject.children) {
    let childrenHtml = documentObject.children.map((child, childIndex) => {
      return convertToHtml({
        documentObject: child,
        documentObjectIndex: childIndex,
      });
    });

    if (documentObject.type === 'paragraph') {
      let className;

      switch (documentObject.textAlign) {
        case 'center':
          className = 'center';
          break;
        case 'end':
          className = 'right';
          break;
        default:
          className = 'left';
          break;
      }

      return <p className={className} key={documentObjectIndex}>{childrenHtml}</p>
    }

    if (documentObject.type === 'blockquote') {
      return <blockquote key={documentObjectIndex}>{childrenHtml}</blockquote>
    }

    if (documentObject.type === 'link') {
      return (
        <a
          key={documentObjectIndex}
          href={documentObject.href}
          target="_blank"
          rel="noreferrer"
        >{childrenHtml}</a>
      );
    }

    if (documentObject.type === 'heading') {
      switch (documentObject.level) {
        case 1:
          return <h1 key={documentObjectIndex}>{childrenHtml}</h1>
        case 2:
          return <h2 key={documentObjectIndex}>{childrenHtml}</h2>
        case 3:
          return <h3 key={documentObjectIndex}>{childrenHtml}</h3>
        case 4:
          return <h4 key={documentObjectIndex}>{childrenHtml}</h4>
        case 5:
          return <h5 key={documentObjectIndex}>{childrenHtml}</h5>
        case 6:
          return <h6 key={documentObjectIndex}>{childrenHtml}</h6>
        default:
      }
    }

    if (documentObject.type === 'code') {
      return <pre key={documentObjectIndex}>{childrenHtml}</pre>
    }

    if (documentObject.type === 'divider') {
      return <hr key={documentObjectIndex} />
    }

    if (documentObject.type === 'unordered-list') {
      return <ul key={documentObjectIndex}>{childrenHtml}</ul>
    }

    if (documentObject.type === 'ordered-list') {
      return <ol key={documentObjectIndex}>{childrenHtml}</ol>
    }

    if (documentObject.type === 'list-item') {
      return <li key={documentObjectIndex}>{childrenHtml}</li>
    }

    if (documentObject.type === 'layout') {
      const layoutSubclass = `layout-${documentObject.layout.join('-')}`;

      return <div className={['layout', layoutSubclass].join(' ')} key={documentObjectIndex}>{childrenHtml}</div>
    }

    if (documentObject.type === 'layout-area') {
      return <div className="layout-area" key={documentObjectIndex}>{childrenHtml}</div>
    }

    return <div key={documentObjectIndex}>{childrenHtml}</div>
  }

  let documentElement = documentObject.text;

  if (documentObject.bold) {
    documentElement = <strong>{documentElement}</strong>;
  }

  if (documentObject.italic) {
    documentElement = <em>{documentElement}</em>;
  }

  if (documentObject.underline) {
    documentElement = <u>{documentElement}</u>;
  }

  if (documentObject.strikethrough) {
    documentElement = <s>{documentElement}</s>;
  }

  if (documentObject.code) {
    documentElement = <code>{documentElement}</code>;
  }

  if (documentObject.keyboard) {
    documentElement = <kbd>{documentElement}</kbd>;
  }

  if (documentObject.subscript) {
    documentElement = <sub>{documentElement}</sub>;
  }

  if (documentObject.superscript) {
    documentElement = <sup>{documentElement}</sup>;
  }

  return <span key={documentObjectIndex}>{documentElement}</span>;
}

const Blog = observer(
  class Blog extends Component {
    cmsPost;

    constructor(props) {
      super(props);

      this.state = {
        cmsPost: cmsPostStore(),
      };

      this.state.cmsPost.fetchPostList();
    }

    render() {
      const postList = this.state.cmsPost.postList.map(post => {
        const content = post.content.document.map((postDocument, postDocumentIndex) => {
          return convertToHtml({
            documentObject: postDocument,
            documentObjectIndex: postDocumentIndex,
          });
        });

        const createdAt = new Date(post.createdAt)
          .toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'UTC',
          });

        return (
          <div key={post.id} className="blog-post">
            <div className="blog-header">
              <h2>{post.title}</h2>
              <div>by <strong>{post.author.name}</strong> on <strong>{createdAt}</strong></div>
            </div>
            <div className="blog-body">
              <div>{content}</div>
            </div>
          </div>
        );
      });

      return postList;
    }
  }
);

export default Blog;
