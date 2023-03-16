import { Component } from 'react';
import { Link } from "react-router-dom";

import './pagination.scss';

class PaginationComponent extends Component {
  render() {
    const {
      page,
      pageCount,
      pageSize,
      baseUrl,
    } = this.props;

    const firstPageUrl = `${baseUrl}?page=1&page-size=${pageSize}`;
    const prevPageUrl = `${baseUrl}?page=${page - 1}&page-size=${pageSize}`;
    const nextPageUrl = `${baseUrl}?page=${page + 1}&page-size=${pageSize}`;
    const lastPageUrl = `${baseUrl}?page=${pageCount}&page-size=${pageSize}`;

    const pageClassList = ['page-number'];

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

    const firstPageText = <span>&lt;&lt;</span>;
    const prevPageText = <span>&lt;</span>;
    const nextPageText = <span>&gt;</span>;
    const lastPageText = <span>&gt;&gt;</span>;

    if (page === 1) {
      firstPageClassList.push('disabled');
      prevPageClassList.push('disabled');
    }

    if (page === pageCount) {
      nextPageClassList.push('disabled');
      lastPageClassList.push('disabled');
    }

    const firstPageClass = firstPageClassList.join(' ');
    const prevPageClass = prevPageClassList.join(' ');
    const nextPageClass = nextPageClassList.join(' ');
    const lastPageClass = lastPageClassList.join(' ');

    const firstPageButton =
      <span className={firstPageClass}>
        {firstPageText}
      </span>;

    const prevPageButton =
      <span className={prevPageClass}>
        {prevPageText}
      </span>;

    const nextPageButton =
      <span className={nextPageClass}>
        {nextPageText}
      </span>;

    const lastPageButton =
      <span className={lastPageClass}>
        {lastPageText}
      </span>;

    let firstPage = firstPageButton;
    let prevPage = prevPageButton;
    let nextPage = nextPageButton;
    let lastPage = lastPageButton;

    if (page > 1) {
      firstPage = <Link to={firstPageUrl}>{firstPageButton}</Link>
      prevPage = <Link to={prevPageUrl}>{prevPageButton}</Link>
    }

    if (page < pageCount) {
      nextPage = <Link to={nextPageUrl}>{nextPageButton}</Link>
      lastPage = <Link to={lastPageUrl}>{lastPageButton}</Link>
    }

    const pages = [];

    for (let currentPageNumber = 1; currentPageNumber <= pageCount; currentPageNumber++) {
      const currentPageUrl = `${baseUrl}?page=${currentPageNumber}&page-size=${pageSize}`;

      const currentPageClassList = [
        ...pageClassList,
      ];

      const currentPageText = <span>{currentPageNumber}</span>;

      if (currentPageNumber === page) {
        currentPageClassList.push('active');
      }

      const currentPageClass = currentPageClassList.join(' ');
      const currentPageButton = <span className={currentPageClass}>{currentPageText}</span>;
      let currentPage = currentPageButton;

      if (currentPageNumber !== page) {
        currentPage = <Link to={currentPageUrl}>{currentPageButton}</Link>;
      }

      pages.push(currentPage);
    }

    return (
      <div className="pagination">
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
