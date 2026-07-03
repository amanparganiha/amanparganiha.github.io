import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import Seo from "@/components/Seo";
import { getPostBySlug, formatDate } from "@/lib/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="py-16 md:py-24">
        <Seo title="Post not found" description="This blog post could not be found." />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-8">
            The post you're looking for doesn't exist or may have been moved.
          </p>
          <Button asChild variant="outline">
            <Link to="/blogs">
              <ArrowLeft size={16} className="mr-1" /> Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blogs/${post.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          url: `https://amanparganiha.github.io/blogs/${post.slug}`,
          author: {
            "@type": "Person",
            name: "Aman Parganiha",
            url: "https://amanparganiha.github.io/",
          },
        }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <Button asChild variant="ghost" size="sm" className="mb-8">
          <Link to="/blogs">
            <ArrowLeft size={16} className="mr-1" /> Back to Blog
          </Link>
        </Button>

        <FadeIn>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
            <span>{formatDate(post.date, { year: "numeric", month: "long", day: "numeric" })}</span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {post.readTime}
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </article>
        </FadeIn>
      </div>
    </div>
  );
};

export default BlogPost;
