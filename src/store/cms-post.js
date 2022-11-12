import { makeObservable, observable, action } from 'mobx';
import cms from '../service/cms';

let cmsPostStoreSingleton;

class CmsPostStore {
  post = {};
  latestPostId = undefined;
  postSummaryList = [];

  constructor() {
    makeObservable(this, {
      post: observable,
      latestPostId: observable,
      postSummaryList: observable,
      fetchLatestPost: action,
      fetchPost: action,
      setPost: action,
    });
  }

  async fetchPost({id}) {
    if (this.post[id]) {
      return;
    }

    const data = await cms(`
      {
        posts(
          where: {
            id: {
              equals: "${id}"
            }
          }
        ) {
          id
          title
          content {
            document
          }
          author {
            id
            name
            email
          }
          createdAt
          fractals {
            id
            altText
            thumbnail {
              id
              filesize
              width
              height
              extension
              url
            }
          }
        }
      }
    `);

    if (!data.posts) {
      return;
    }

    const [post] = data.posts;

    this.setPost({post});
  }

  async fetchLatestPost() {
    if (this.latestPostId !== undefined) {
      return;
    }

    const data = await cms(`
      {
        posts(
          orderBy: [{
            createdAt: desc
          }]
          take: 1
        ) {
          id
          title
          content {
            document
          }
          author {
            id
            name
            email
          }
          createdAt
          fractals {
            id
            altText
            thumbnail {
              id
              filesize
              width
              height
              extension
              url
            }
          }
        }
      }
    `);

    if (!data.posts) {
      return;
    }

    const [post] = data.posts;

    this.setPost({post, isLatest: true});
  }

  setPost({post, isLatest = false}) {
    const id = post.id;

    this.post[id] = post;

    if (isLatest) {
      this.latestPostId = id;
    }
  }
}

const cmsPostStore = () => {
  if (cmsPostStoreSingleton) {
    return cmsPostStoreSingleton;
  }

  cmsPostStoreSingleton = new CmsPostStore();

  return cmsPostStoreSingleton;
};

export default cmsPostStore;
