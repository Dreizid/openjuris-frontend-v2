import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
interface PaginationProps {
  offset: number;
  onOffsetChange: (offset: number) => void;
  limit: number;
  total: number;
}
function ArchivePagination({
  offset,
  onOffsetChange,
  limit,
  total,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(total / limit);
  let startPage = currentPage - 1;
  startPage = Math.max(1, startPage);
  if (startPage + 2 > totalPages) {
    startPage = Math.max(1, totalPages - 2);
  }
  const buttons = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => startPage + i,
  );

  useEffect(() => onOffsetChange((currentPage - 1) * 8), [currentPage]);
  return (
    <div className="flex justify-between">
      <span className="uppercase text-xs font-bold text-slate-400">
        Showing {offset + 1} to {Math.min(total, offset + limit)} of {total}{" "}
        documents
      </span>
      <div className="flex items-center gap-2 ">
        <button
          disabled={currentPage === 1}
          className="flex bg-white text-sm text-slate-600 border border-slate-200 rounded-md gap-1 px-3 py-1.5 font-medium disabled:opacity-50 disabled:bg-slate-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>
        <div className="flex items-center gap-1">
          {buttons.map((buttonNumber) => (
            <button
              key={buttonNumber}
              onClick={() => setCurrentPage(buttonNumber)}
              className={`w-8 h-8 rounded-md border text-sm ${currentPage === buttonNumber ? "bg-blue-900 text-white border-blue-900" : "bg-white border-slate-200 text-slate-600"}`}
            >
              {buttonNumber}
            </button>
          ))}
        </div>
        <button
          className="flex bg-white text-sm text-slate-600 border border-slate-200 rounded-md gap-1 px-3 py-1.5 disabled:bg-slate-50 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default ArchivePagination;
