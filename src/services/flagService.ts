import { buildUrl } from "@/utils/url-builder"
const BASE_URL = import.meta.env.PUBLIC_BACKEND_URL
export const ISSUE_TYPES = [
  "Typo/Grammer",
  "Formatting",
  "Factual Error",
  "Outdated Info",
]
export type IssueType = typeof ISSUE_TYPES[number]
interface FlagProps {
  documentId: string
  issueType: IssueType
  description: string
}

interface FlagStatus {
  success: boolean
  message: string
}
export async function createFlag({ documentId, issueType, description }: FlagProps) {
  const url = buildUrl("/api/v1/document-flags/", BASE_URL)
  console.log(url)
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "accept": "application/json", "Content-Type": "application/json", "x-api-key": import.meta.env.PUBLIC_INTERNAL_API },
      body: JSON.stringify({ document_id: documentId, issue_type: issueType, description })
    })
    if (response.ok) {
      return { success: true, message: "Report submitted successfully!" }
    } else {
      return { success: false, message: "Report submission failed" }
    }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Server Error! Try again later" }
  }

}
