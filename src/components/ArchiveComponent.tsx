import { useState } from "react";

function ArchiveComponent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = [
    "All",
    "Republic Acts",
    "Jurisprudence",
    "Exec. Orders",
    "Constitution",
  ];

  return (
    <div className="flex-1 m-8">
      <div className="flex">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Legal Archive</h2>
          <span className="text-slate-600">
            Browse 12,000+ digitalized documents
          </span>
        </div>
        <div className="flex ml-auto gap-2 items-center">
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
    </div>
  );
}

export default ArchiveComponent;
