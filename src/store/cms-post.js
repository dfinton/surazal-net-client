import { makeObservable, observable, action } from 'mobx';
import cms from '../service/cms';

let cmsPostStoreSingleton;

class CmsPostStore {
  postList = [];

  constructor() {
    makeObservable(this, {
      postList: observable,
      fetchPostList: action,
      setPostList: action,
    });
  }

  async fetchPostList() {
    const data = await cms(`
      {
        posts {
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

    this.setPostList(data.posts);
  }

  setPostList(postList) {
    this.postList = postList;
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
