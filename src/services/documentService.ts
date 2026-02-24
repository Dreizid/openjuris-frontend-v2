import { buildUrl } from "@/utils/url-builder"
import { type Document } from "@/components/ArchiveTable";
interface DocumentView extends Document {
  content_markdown: string
}
const BASE_URL = import.meta.env.PUBLIC_BACKEND_URL
const INTERNAL_API = import.meta.env.PUBLIC_INTERNAL_API
export async function getDocuments(limit: number, offset: number) {
  const url = buildUrl("/api/v1/documents", BASE_URL, { limit: limit, offset: offset })
  const response = await fetch(
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${INTERNAL_API}`
      },
    },
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Backend Crash`, errorText);
    throw new Error(`Server returned ${response.status}: ${errorText}`);
  }
  const results = await response.json();
  return results.items.map((doc: Document) => ({ ...doc }));
};

export async function getDocumentById(id: string): Promise<DocumentView> {
  const url = buildUrl(`/api/v1/documents/${id}`, BASE_URL)
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${INTERNAL_API}`
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Backend Crash on ID ${id}:`, errorText);
    throw new Error(`Server returned ${response.status}: ${errorText}`);
  }
  const result = await response.json();
  return await result
}
