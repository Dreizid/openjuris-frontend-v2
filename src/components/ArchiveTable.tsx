import { Globe } from "lucide-react";

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
}

const DATE_FORMATTER = Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

function ArchiveTable({ items, limit }: DocumentResponse) {
  const headers = ["code", "title", "type", "date", "sources"];
  const emptyRowCount = Math.max(0, limit - items.length);
  const displayRows = [...items, ...Array(emptyRowCount).fill(null)];

  return (
    <div className="w-full  border border-slate-200 rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 table-fixed">
          <thead>
            <tr>
              {headers.map((key) => (
                <th
                  key={key}
                  className="text-sm uppercase font-bold text-slate-500 py-2 px-6 text-left bg-slate-100"
                >
                  <div>{key}</div>
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
    <tr className="group relative">
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
        <span className="text-[10px] bg-slate-100 px-2 py-1 rounded uppercase">
          {doc_type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-sm">
        {displayDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-sm">
        <div className="flex items-center gap-1.5 bg-white">
          <Globe size={12} className="text-slate-400" />
          <span>{metadata_fields.source_name}</span>
        </div>
      </td>
    </tr>
  );
}
export default ArchiveTable;
