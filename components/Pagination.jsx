import React from 'react';
import Link from 'next/link';

const Pagination = ({ totalItems, currentPage, perPage, pageUrl }) => {
  let totalPages = Math.round(totalItems / perPage);
  let firstPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
  let lastPage = firstPage + 4 > totalPages ? totalPages : firstPage + 4;
  if (lastPage - firstPage < 4 && firstPage > 1) {
    lastPage = totalPages;
    firstPage = totalPages - 4 > 0 ? totalPages - 4 : 1;
  }

  const pages = (firstPage, lastPage) => {
    let content = [];
    for (let i = firstPage; i <= lastPage; i++) {
      content.push(
        <Link href={`${pageUrl}${i}`} key={ i }>
          <a className={`flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 
            ${(i == currentPage) ? 'text-white bg-base-600 ' : 'bg-white text-black'}hover:border-gray-300`}>
            { i }
          </a>
        </Link>
      );
    }
    return content;
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
          { (totalPages > 5 && currentPage > 1) && <Link href={`/category/${categorySlug}?page=${(currentPage - 1) > 1 ? currentPage - 1 : 1}`}>
            <a className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300">
              <span className="sr-only">Previous Page</span>
              <svg className="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true" role="presentation">
                <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
              </svg>
            </a>
          </Link> }
          { pages(firstPage, lastPage) }
          { (totalPages > 5 && currentPage < totalPages ) && <Link href={`/category/${categorySlug}?page=${parseInt(currentPage) + 1 }`}>
            <a className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300">
              <span className="sr-only">Next Page</span>
              <svg className="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true" role="presentation">
                <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
              </svg>
            </a>
          </Link> }
        </nav>
      </div>
    </>
  );
};

export default Pagination;
