type QueryMap = Record<string, string | number | boolean>
export function buildUrl(endpoint: string, baseUrl: string, query?: QueryMap) {
  const url = new URL(endpoint, baseUrl)
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    })
  }
  return url.toString()
}
