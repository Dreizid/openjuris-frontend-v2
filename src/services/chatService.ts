import { buildUrl } from "@/utils/url-builder"

const BASE_URL = import.meta.env.PUBLIC_RAG_API
export async function askChatbot({ query }: { query: string }) {
  const url = buildUrl("/api/v1/chat/stream", BASE_URL, { query: query })
  try {
    const response = await fetch(url, {
      headers: { "accept": "application/json" }
    })

    return response
  } catch (error) {
    console.error(error)
  }
}
