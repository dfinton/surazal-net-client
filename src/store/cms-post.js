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
          id,
          title,
          content {
            document
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
