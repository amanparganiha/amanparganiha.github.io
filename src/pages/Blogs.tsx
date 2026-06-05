import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FadeIn from "@/components/FadeIn";
import Seo from "@/components/Seo";
import { getAllPosts, getAllTags, formatDate } from "@/lib/posts";

const Blogs = () => {
  const posts = getAllPosts();
  const tags = ["All", ...getAllTags()];
  const [filter, setFilter] = useState<string>("All");

  const filtered =
    filter === "All" ? posts : posts.filter((p) => p.tags.includes(filter));

  return (
    <div className="py-16 md:py-24">
      <Seo
        title="Blog"
        description="Thoughts on machine learning, data science, and building AI systems by Aman Parganiha."
        path="/blogs"
      />
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground mb-8 max-w-xl">
            Thoughts on machine learning, data science, and building AI systems.
          </p>
        </FadeIn>

        {/* Tag filters */}
        {tags.length > 1 && (
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filter === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        <div className="space-y-6">
          {filtered.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.08}>
              <Link to={`/blogs/${post.slug}`} className="block">
                <article className="p-6 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-all">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground">
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </article>
              </Link>
            </FadeIn>
          ))}

          {filtered.length === 0 && (
            <p className="text-muted-foreground">No posts yet. Check back soon.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
