import { makeObservable, observable, action } from 'mobx';
import cms from '@/service/cms';

class CmsFractalStore {
  fractal = {};
  fractalList = [];
  fractalCount = undefined;
  page = 1;
  pageSize = 10;
  pageCount = 0;

  constructor() {
    makeObservable(this, {
      fractal: observable,
      fractalList: observable,
      fractalCount: observable,
      page: observable,
      pageSize: observable,
      pageCount: observable,
      fetchFractal: action,
      fetchFractalList: action,
      fetchFractalCount: action,
      calculatePageCount: action,
      setFractal: action,
      setFractalList: action,
      setFractalCount: action,
      setPage: action,
      setPageSize: action,
      setPageCount: action,
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

    this.setFractalList({fractalList: fractals});
    this.setPage({page});
    this.setPageSize({pageSize});
  }

  async fetchFractalCount() {
    if (this.fractalCount !== undefined) {
      return;
    }

    const data = await cms(`
      {
        fractalsCount
      }
    `);

    const fractalCount = data.fractalsCount ?? 0;

    this.setFractalCount({fractalCount});
  }

  calculatePageCount() {
    const pageCount = Math.ceil(this.fractalCount / this.pageSize);

    this.setPageCount({pageCount});
  }

  setFractal({fractal}) {
    this.fractal[fractal.id] = fractal;
  }

  setFractalList({fractalList}) {
    this.fractalList = fractalList;
  }

  setFractalCount({fractalCount}) {
    this.fractalCount = fractalCount;
  }

  setPage({page}) {
    this.page = page;
  }

  setPageSize({pageSize}) {
    this.pageSize = pageSize;
  }

  setPageCount({pageCount}) {
    this.pageCount = pageCount;
  }

  hydrate(data) {
    if (!data) return;

    this.fractal = data.fractal;
    this.fractalList = data.fractalList;
    this.fractalCount = data.fractalCount;
    this.page = data.page;
    this.pageSize = data.pageSize;
    this.pageCount = data.pageCount;
  }
}

export default CmsFractalStore;
