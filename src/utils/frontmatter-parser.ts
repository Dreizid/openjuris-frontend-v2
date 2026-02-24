export function removeFrontmatter(rawMarkdown: string) {
  return rawMarkdown.replace(/---[\s\S]*?---/, "").trim();
}
