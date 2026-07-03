// Generates public/rss.xml and public/sitemap.xml from the markdown posts.
// Runs automatically before every build via the "prebuild" npm script.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fm from "front-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const POSTS_DIR = join(ROOT, "src", "content", "posts");
const PUBLIC_DIR = join(ROOT, "public");
const SITE_URL = "https://amanparganiha.github.io";

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeDate(date) {
  if (date instanceof Date) return date.toISOString().slice(0, 10);
  return String(date ?? "");
}

const posts = readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
  .map((file) => {
    const raw = readFileSync(join(POSTS_DIR, file), "utf-8");
    const { attributes } = fm(raw);
    const slug = file.replace(/\.md$/, "");
    return {
      slug,
      title: attributes.title ?? slug,
      excerpt: attributes.excerpt ?? "",
      date: normalizeDate(attributes.date),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

// BrowserRouter URLs take the form /blogs/<slug> (must match Seo.tsx canonicals)
const blogUrl = (slug) => `${SITE_URL}/blogs/${slug}`;

const rssItems = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${blogUrl(p.slug)}</link>
      <guid isPermaLink="false">${esc(p.slug)}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.excerpt)}</description>
    </item>`
  )
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Aman Parganiha — Blog</title>
    <link>${SITE_URL}/blogs</link>
    <description>Thoughts on machine learning, data science, and building AI systems.</description>
    <language>en-us</language>
${rssItems}
  </channel>
</rss>
`;

const staticRoutes = ["/", "/resume", "/projects", "/open-source", "/blogs", "/contact"];
const urls = [
  ...staticRoutes.map((r) => (r === "/" ? `${SITE_URL}/` : `${SITE_URL}${r}`)),
  ...posts.map((p) => blogUrl(p.slug)),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join("\n")}
</urlset>
`;

writeFileSync(join(PUBLIC_DIR, "rss.xml"), rss);
writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), sitemap);

console.log(`gen-feed: wrote rss.xml and sitemap.xml (${posts.length} posts).`);
