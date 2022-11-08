import { Component } from 'react';
import { observer } from 'mobx-react';

import Header from './components/header';

const App = observer(
  class App extends Component {
    constructor(props) {
      super(props);

      props.cmsPost.fetchPostList();
    }

    render() {
      const postList = this.props.cmsPost.postList.map(post => {
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
        <div>
          <Header />
          {postList}
        </div>
      );
    }
  }
);

export default App;
