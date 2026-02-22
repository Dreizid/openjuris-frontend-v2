import { Globe } from "lucide-react";

export interface Document {
  id: string;
  canonical_citation: string;
  title: string;
  category: string;
  doc_type: string;
  date_promulgated: string;
  source_url: string;
  date_effectivity?: string | null;
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

function ArchiveTable({ items, limit }: DocumentResponse) {
  const headers = ["code", "title", "type", "date", "sources"];
  const emptyRowCount = Math.max(0, limit - items.length);
  const displayRows = [...items, ...Array(emptyRowCount).fill(null)];

  const formatter = Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  });
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
            {displayRows.map((props) =>
              props ? (
                <tr className="">
                  <td className="px-6 py-4 text-blue-900 whitespace-nowrap font-mono font-medium text-sm">
                    {props.canonical_citation}
                  </td>
                  <td className="px-6 py-4">
                    <div className="line-clamp-1 text-sm font-medium text-slate-900">
                      {props.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 inline-block tracking-wider">
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded uppercase">
                      {props.doc_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-sm">
                    {formatter.format(new Date(props.date_promulgated))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Globe size={12} className="text-slate-400" />
                      <span>{props.metadata_fields.source_name}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="h-[69px]">&nbsp;</div>
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

export default ArchiveTable;
