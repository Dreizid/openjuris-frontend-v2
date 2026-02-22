import { useEffect, useState } from "react";
import ArchiveTable from "./ArchiveTable";
import type { Document } from "./ArchiveTable";
import ArchivePagination from "./ArchivePagination";

function ArchiveComponent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = [
    "All",
    "Republic Acts",
    "Jurisprudence",
    "Exec. Orders",
    "Constitution",
  ];

  const maxLimit = 8;
  const tempTotal = 54;
  const [offset, setOffset] = useState(0);
  const [documents, setDocuments] = useState([]);
  const fetchDocuments = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/documents/?limit=${maxLimit}&offset=${offset}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );
    const results = await response.json();
    console.log(results);
    const data = results.items.map((doc: Document) => ({ ...doc }));
    setDocuments(data);
  };

  useEffect(() => {
    fetchDocuments();
  }, [offset]);

  return (
    <div className="flex-1 m-8">
      <div className="flex justify-between mb-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Legal Archive</h2>
          <span className="text-sm text-slate-600">
            Browse 12,000+ digitalized documents
          </span>
        </div>
        <div className="flex gap-2 items-center text-slate-500">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 whitespace-nowrap text-sm border font-medium transition-colors ${activeFilter === filter ? "bg-blue-900 border-blue-900 text-white" : "bg-white hover:bg-slate-100 border-slate-200"}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <ArchiveTable items={documents} limit={maxLimit} />
      </div>
      <ArchivePagination
        offset={offset}
        onOffsetChange={setOffset}
        limit={maxLimit}
        total={tempTotal}
      />
    </div>
  );
}

export default ArchiveComponent;
