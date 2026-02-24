import { marked, type Tokens } from "marked";
import GithubSlugger from 'github-slugger'
export interface TocItem {
  text: string
  slug: string
  href: string
}
export async function renderMarkdownWithToc(rawMarkdown: string) {
  const slugger = new GithubSlugger()
  const toc: TocItem[] = []
  const renderer = new marked.Renderer();

  renderer.heading = ({ text, depth }: Tokens.Heading): string => {
    const slug = slugger.slug(text)
    if (depth === 1) {
      return `<div id=${slug} class="flex items-center justify-center"><h1 class="text-xl font-bold font-serif text-slate-900 mb-4 uppercase tracking-wide">${text}</h1></div>`;
    }
    if (depth === 2) {
      return `<h2 id=${slug} class="text-lg font-medium font-serif text-slate-800 leading-relaxed text-center">${text}</h2>`;
    }
    if (depth === 3) {
      toc.push({ text, slug, href: `#${slug}` })
    }
    return `<h${depth} id=${slug} class="font-serif font-bold mt-6 mb-2 uppercase text-sm text-slate-800">${text}</h${depth}>`;
  };

  renderer.paragraph = ({ text }: Tokens.Paragraph): string => {
    return `<p class="whitespace-pre-wrap my-4">${text}</p>`;
  };


  const html = await marked.parse(rawMarkdown, { renderer });

  return { html, toc }
}
