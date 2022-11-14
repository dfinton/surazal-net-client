import { makeObservable, observable, action } from 'mobx';
import cms from '../service/cms';

let cmsFractalStoreSingleton;

class CmsFractalStore {
  fractal = {};
  fractalList = [];

  constructor() {
    makeObservable(this, {
      fractal: observable,
      fractalList: observable,
      fetchFractal: action,
      fetchFractalList: action,
      setFractal: action,
      setFractalList: action,
    })
  }

  async fetchFractal({id}) {
    if (this.fractal[id]) {
      return;
    }

    const data = await cms(`
      {
        fractal(
          where: {
            id: "${id}"
          }
        ) {
          id
          name
          altText
          createdAt
          thumbnail {
            id
            filesize
            width
            height
            extension
            url
          }
          small {
            id
            filesize
            width
            height
            extension
            url
          }
          medium {
            id
            filesize
            width
            height
            extension
            url
          }
          large {
            id
            filesize
            width
            height
            extension
            url
          }
        }
      }
    `);

    if (!data.fractal) {
      return;
    }

    this.setFractal({fractal: data.fractal});
  }

  async fetchFractalList({page, pageSize}) {
    const take = pageSize;
    const skip = (page - 1) * pageSize;

    const data = await cms(`
      {
        fractals(
          orderBy: [{
            createdAt: desc
          }]
          take: ${take}
          skip: ${skip}
        ) {
          id
          name
          altText
          createdAt
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
    `);

    const fractals = data.fractals ?? [];

    this.setFractalList({fractals});
  }

  setFractal({fractal}) {
    this.fractal[fractal.id] = fractal;
  }

  setFractalList({fractals}) {
    this.fractalList = fractals;
  }
}

const cmsFractalStore = () => {
  if (cmsFractalStoreSingleton) {
    return cmsFractalStoreSingleton;
  }

  cmsFractalStoreSingleton = new CmsFractalStore();

  return cmsFractalStoreSingleton;
};

export default cmsFractalStore;
