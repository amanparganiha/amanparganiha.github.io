# Blog posts

Every `.md` file in this folder becomes a blog post automatically — no code changes needed.

## Add a new post

1. Create a new file here, e.g. `my-new-post.md`. The file name becomes the URL slug
   (`my-new-post` → `/blogs/my-new-post`).
2. Add frontmatter at the top, then write the body in normal Markdown:

   ```md
   ---
   title: "My New Post"
   date: 2026-06-05
   tags: [RAG, LLM]
   excerpt: "One-sentence summary shown on the blog list and in link previews."
   ---

   Your content here. GitHub-flavored Markdown is supported
   (headings, lists, tables, code blocks, links).
   ```

3. Commit and push. Posts are sorted by `date` (newest first) and reading time is
   computed automatically from the word count.

That's it — `git push` publishes the post. (Adding the file through the GitHub
web UI works the same way.)

**Shortcut:** in Claude Code, type `/blog` and paste your draft or notes —
the skill formats the post, regenerates the sitemap/RSS, and pushes it live.
