import fm from "front-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readTime: string;
}

export interface Post extends PostMeta {
  body: string;
}

interface FrontmatterAttributes {
  title?: string;
  date?: string | Date;
  tags?: string[];
  excerpt?: string;
}

// Eagerly load every markdown file in src/content/posts as a raw string.
const modules = import.meta.glob("../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

function computeReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

function normalizeDate(date: string | Date | undefined): string {
  if (date instanceof Date) return date.toISOString().slice(0, 10);
  return String(date ?? "");
}

const posts: Post[] = Object.entries(modules)
  // README.md lives in the folder for documentation — skip anything without frontmatter.
  .filter(([path]) => slugFromPath(path).toLowerCase() !== "readme")
  .map(([path, raw]) => {
    const { attributes, body } = fm<FrontmatterAttributes>(raw);
    const slug = slugFromPath(path);
    return {
      slug,
      title: attributes.title ?? slug,
      date: normalizeDate(attributes.date),
      tags: attributes.tags ?? [],
      excerpt: attributes.excerpt ?? "",
      readTime: computeReadTime(body),
      body,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function formatDate(date: string, opts?: Intl.DateTimeFormatOptions): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(
    "en-US",
    opts ?? { year: "numeric", month: "short", day: "numeric" }
  );
}
