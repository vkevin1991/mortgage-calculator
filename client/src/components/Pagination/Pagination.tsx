import { useEffect, useState } from "react";
import { PaginationProps } from "./Pagination.interface";

export default function Pagination({
  total,
  onChange,
  currentPage,
}: PaginationProps) {
  const PAGESIZE = 10;
  const totalPages = Math.ceil(total / PAGESIZE);
  const [myCurrentPage, setMyCurrentPage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    setMyCurrentPage(page);
    onChange(page);
  };

  useEffect(() => {
    setMyCurrentPage(currentPage);
  }, [currentPage, total, totalPages]);
  return (
    <>
      <div className="flex justify-center items-center px-4 py-3">
        <button
          onClick={() => {
            if (myCurrentPage > 1) {
              handlePageChange(myCurrentPage - 1);
            }
          }}
          className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
        >
          Prev
        </button>

        <p className="text-slate-600 p-2.5">
          Page <strong className="text-slate-800">{currentPage}</strong>{" "}
          of&nbsp;
          <strong className="text-slate-800">{totalPages}</strong>
        </p>

        <button
          onClick={() => {
            if (myCurrentPage < totalPages) {
              handlePageChange(myCurrentPage + 1);
            }
          }}
          className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
        >
          Next
        </button>
      </div>
    </>
  );
}
