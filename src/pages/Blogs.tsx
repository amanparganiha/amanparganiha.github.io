import { useState } from "react";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import { blogPosts, type BlogPost } from "@/data/portfolio";

const Blogs = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPost(null)}
            className="mb-8"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Blogs
          </Button>
          <FadeIn>
            <Badge variant="secondary" className="mb-4">{selectedPost.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedPost.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
              <span>{new Date(selectedPost.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {selectedPost.readTime}
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <article className="prose prose-neutral max-w-none">
              {selectedPost.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return <h2 key={i} className="text-xl font-bold mt-8 mb-4">{paragraph.replace("## ", "")}</h2>;
                }
                if (paragraph.startsWith("### ")) {
                  return <h3 key={i} className="text-lg font-semibold mt-6 mb-3">{paragraph.replace("### ", "")}</h3>;
                }
                if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n").filter(Boolean);
                  return (
                    <ul key={i} className="space-y-1 mb-4">
                      {items.map((item, j) => (
                        <li key={j} className="text-muted-foreground flex items-start gap-2">
                          <span className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
                          {item.replace(/^[-\d.]\s*/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
              })}
            </article>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground mb-10 max-w-xl">
            Thoughts on machine learning, data science, and building AI systems.
          </p>
        </FadeIn>

        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.08}>
              <article
                className="p-6 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
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
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
