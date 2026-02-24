import { Globe, ChevronUp, ChevronDown, ChevronsUpDown, ChevronRight } from "lucide-react";

export interface Document {
  id: string;
  canonical_citation: string;
  title: string;
  category: string;
  doc_type: string;
  source_url: string;
  date_promulgated: string;
  date_effectivity?: string | null;
  date_published?: string | null;
  short_title?: string | null;
  metadata_fields: DocumentMetadata;
}

export interface DocumentMetadata {
  dates_raw: { approved: string };
  source_name: string;
  statute_number: string;
}
export interface DocumentResponse {
  total?: number;
  limit: number;
  offset?: number;
  items: Document[];
  sortBy: string | null;
  sortAsc: boolean;
  onSortChange: (column: string) => void;
}

const DATE_FORMATTER = Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

function ArchiveTable({
  items,
  limit,
  sortBy,
  sortAsc,
  onSortChange
}: DocumentResponse) {
  const headers = [
    { key: "canonical_citation", label: "code", sortable: true },
    { key: "title", label: "title", sortable: false },
    { key: "doc_type", label: "type", sortable: true },
    { key: "date_promulgated", label: "date", sortable: true },
    { key: "source", label: "sources", sortable: false },
    { key: "chevron", label: "", sortable: false }
  ]

  const emptyRowCount = Math.max(0, limit - items.length);
  const displayRows = [...items, ...Array(emptyRowCount).fill(null)];

  return (
    <div className="w-full border border-slate-200 rounded-lg">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 table-fixed bg-slate-100">
        <thead>
          <tr>
            {headers.map(({ key, label, sortable }) => (
              <th
                key={key}
                className={
                  "transition-colors text-sm uppercase font-bold text-slate-500 py-2 px-6 text-left hover:bg-slate-200 select-none cursor-pointer"
                }
                onClick={sortable ? () => onSortChange(key) : undefined}
              >
                <div className="flex items-center gap-1">
                  {label}
                  {sortable && (
                    <span>
                      {sortBy === key
                        ? (sortAsc ? <ChevronUp size={16} /> : <ChevronDown size={16} />)
                        : <ChevronsUpDown size={16} />}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {displayRows.map((props: Document) =>
              props ? (
                <ArchiveTableRow {...props} key={props.id} />
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="h-[55px]">&nbsp;</div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ArchiveTableRow({
  id,
  canonical_citation,
  title,
  date_promulgated,
  date_effectivity,
  date_published,
  doc_type,
  metadata_fields,
}: Document) {
  const rawDate = date_promulgated ?? date_effectivity ?? date_published;

  const displayDate = rawDate ? DATE_FORMATTER.format(new Date(rawDate)) : "-";
  return (
    <tr className="group relative hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 text-blue-900 whitespace-nowrap font-mono font-medium text-sm">
        <a className="after:absolute after:inset-0" href={`/archive/${id}`}>
          {canonical_citation}
        </a>
      </td>
      <td className="px-6 py-4">
        <div className="line-clamp-1 text-sm font-medium text-slate-900">
          {title}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-slate-600 inline-block tracking-wider">
        <span className="text-[10px] bg-slate-100 px-2 py-1 rounded uppercase font-bold">
          {doc_type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-sm">
        {displayDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-sm">
        <div className="flex items-center gap-1.5">
          <Globe size={12} className="text-slate-400" />
          <span>{metadata_fields.source_name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-sm">
        <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-900 transition-colors"/>
      </td>
    </tr>
  );
}
export default ArchiveTable;
