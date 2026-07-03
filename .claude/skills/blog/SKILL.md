---
name: blog
description: Publish a blog post to the portfolio from content the user provides (notes, a draft, or pasted text). Formats it as markdown with the correct frontmatter, writes it to src/content/posts/, regenerates the feeds, and pushes so GitHub Pages deploys it. Use when the user says "/blog", "publish a post", "add a blog post", or pastes an article to publish.
---

# Publish a blog post

The blog is fully file-based — publishing a post is writing ONE markdown file
and pushing. No React code, no config, no other files need to change.
Do not explore the codebase; everything you need is in this skill.

## Input

The user provides raw content: notes, a rough draft, a finished article, or
bullet points. Your job is to structure and polish **their** content.

**Hard rule: never invent technical claims, numbers, results, or anecdotes the
user didn't provide.** If the content is too thin for a coherent post, ask for
the missing pieces instead of padding it with generic filler — generic AI
content on this blog was removed deliberately and must not come back.

## File format (frozen — matches src/lib/posts.ts)

Write to: `src/content/posts/<slug>.md` where `<slug>` is the kebab-case
filename that becomes the URL (`/blogs/<slug>`). Keep it short and descriptive.

```md
---
title: "Post Title"
date: 2026-07-03
tags: [RAG, LLM]
excerpt: "One-sentence summary shown on the blog list and in link previews."
---

Body in GitHub-flavored Markdown. Start with a paragraph, not a heading;
use ## for section headings (the page renders title as the h1).
```

- `date`: today, `YYYY-MM-DD`, unquoted
- `tags`: 1–3 short tags; reuse existing tags where they fit (check the
  frontmatter of the other files in `src/content/posts/`)
- `excerpt`: one sentence, shows on cards and in RSS — write it last
- Read time is computed automatically from word count; don't add it
- Never name a file `README.md` (that name is skipped by the loader)

## Workflow

1. Draft the post from the user's content. Show the user the proposed
   title, slug, tags, and excerpt for a quick OK if anything was ambiguous.
2. Write the file to `src/content/posts/<slug>.md`.
3. `npm run gen:feed` — regenerates `public/sitemap.xml` and `public/rss.xml`
   (they are committed artifacts; include them in the commit).
4. Sanity check: `npm run build` (the build fails loudly on broken frontmatter).
5. Publish:
   ```sh
   git fetch origin && git rebase origin/main   # repo is also edited via GitHub web UI
   git add src/content/posts/<slug>.md public/sitemap.xml public/rss.xml
   git commit -m "Add blog post: <title>"
   git push origin main                          # Pages deploys automatically
   ```
6. Tell the user the live URL: `https://amanparganiha.github.io/blogs/<slug>`
   (deploy takes a couple of minutes after push).

## Manual fallback (no AI needed)

Adding a `.md` file with the frontmatter above directly in the GitHub web UI
also publishes on the next Actions run — see `src/content/posts/README.md`.
