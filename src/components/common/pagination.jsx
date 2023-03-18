import { Component } from 'react';
import Link from 'next/link';

import styles from './pagination.module.scss';

class PaginationComponent extends Component {
  render() {
    const {
      page,
      pageCount,
      pageSize,
      baseUrl,
    } = this.props;

    const firstPageQuery = {
      page: 1,
      'page-size': pageSize,
    }

    const prevPageQuery = {
      page: page - 1,
      'page-size': pageSize,
    }

    const nextPageQuery = {
      page: page + 1,
      'page-size': pageSize,
    }

    const lastPageQuery = {
      page: pageCount,
      'page-size': pageSize,
    }

    const pageClassList = [styles['page-number']];

    const firstPageClassList = [
      ...pageClassList,
    ];

    const prevPageClassList = [
      ...pageClassList,
    ];

    const nextPageClassList = [
      ...pageClassList,
    ];

    const lastPageClassList = [
      ...pageClassList,
    ];

    const firstPageText = (
      <span>&lt;&lt;</span>
    );

    const prevPageText = (
      <span>&lt;</span>
    );

    const nextPageText = (
      <span>&gt;</span>
    );
    
    const lastPageText = (
      <span>&gt;&gt;</span>
    );

    if (page === 1) {
      firstPageClassList.push(styles['disabled']);
      prevPageClassList.push(styles['disabled']);
    }

    if (page >= pageCount) {
      nextPageClassList.push(styles['disabled']);
      lastPageClassList.push(styles['disabled']);
    }

    const firstPageClass = firstPageClassList.join(' ');
    const prevPageClass = prevPageClassList.join(' ');
    const nextPageClass = nextPageClassList.join(' ');
    const lastPageClass = lastPageClassList.join(' ');

    const firstPageButton = (
      <span className={firstPageClass}>
        {firstPageText}
      </span>
    );

    const prevPageButton = (
      <span className={prevPageClass}>
        {prevPageText}
      </span>
    );

    const nextPageButton = (
      <span className={nextPageClass}>
        {nextPageText}
      </span>
    );

    const lastPageButton = (
      <span className={lastPageClass}>
        {lastPageText}
      </span>
    );

    let firstPage = firstPageButton;
    let prevPage = prevPageButton;
    let nextPage = nextPageButton;
    let lastPage = lastPageButton;

    if (page > 1) {
      firstPage = (
        <Link href={{
          pathname: baseUrl,
          query: firstPageQuery,
        }}>{firstPageButton}</Link>
      );

      prevPage = (
        <Link href={{
          pathname: baseUrl,
          query: prevPageQuery,
        }}>{prevPageButton}</Link>
      );
    }

    if (page < pageCount) {
      nextPage = (
        <Link href={{
          pathname: baseUrl,
          query: nextPageQuery,
        }}>{nextPageButton}</Link>
      );

      lastPage = (
        <Link href={{
          pathname: baseUrl,
          query: lastPageQuery,
        }}>{lastPageButton}</Link>
      );
    }

    const pages = [];

    for (let currentPageNumber = 1; currentPageNumber <= pageCount; currentPageNumber++) {
      const currentPageQuery = {
        page: currentPageNumber,
        'page-size': pageSize,
      };

      const currentPageClassList = [
        ...pageClassList,
      ];

      const currentPageText = (
        <span>{currentPageNumber}</span>
      );

      if (currentPageNumber === page) {
        currentPageClassList.push(styles['active']);
      }

      const currentPageClass = currentPageClassList.join(' ');

      const currentPageButton = (
        <span key={currentPageNumber} className={currentPageClass}>{currentPageText}</span>
      );

      let currentPage = currentPageButton;

      if (currentPageNumber !== page) {
        currentPage = (
          <Link key={currentPageNumber} href={{
            pathname: baseUrl,
            query: currentPageQuery,
          }}>{currentPageButton}</Link>
        );
      }

      pages.push(currentPage);
    }

    return (
      <div className={styles['pagination']}>
        {firstPage}
        {prevPage}
        {pages}
        {nextPage}
        {lastPage}
      </div>
    );
  }
}

export default PaginationComponent;
