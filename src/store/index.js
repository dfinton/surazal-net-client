import { enableStaticRendering } from 'mobx-react';
import CmsFractalStore from '@/store/cms-fractal';
import CmsPostStore from '@/store/cms-post';

enableStaticRendering(typeof window === "undefined");

export default class RootStore {
  constructor() {
    this.cmsFractalStore = new CmsFractalStore(this);
    this.cmsPostStore = new CmsPostStore(this);
  }

  hydrate(data) {
    if (!data) return;

    this.cmsFractalStore.hydrate(data.cmsFractalStore);
    this.cmsPostStore.hydrate(data.cmsPostStore);
  }
}
