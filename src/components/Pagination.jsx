import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { PER_PAGE_ITEM_LIMIT } from "../constant";

function Pagination({
  page,
  allItemsCount,
  handlePageClick,
  nextPage,
  prevPage,
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={prevPage}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Previous
        </div>
        <div
          onClick={nextPage}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">
              {(page - 1) * PER_PAGE_ITEM_LIMIT + 1}
            </span>
            to
            <span className="font-medium">{page * PER_PAGE_ITEM_LIMIT}</span> of
            <span className="font-medium"> {allItemsCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination">
            <div
              onClick={prevPage}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {Array.from({
              length: Math.ceil(allItemsCount / PER_PAGE_ITEM_LIMIT),
            }).map((x, index) => (
              <div
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={`${
                  index + 1 === page
                    ? `text-white bg-indigo-600`
                    : `text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50`
                }
                focus:z-20 cursor-pointer relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                {index + 1}
              </div>
            ))}

            <div
              onClick={nextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
