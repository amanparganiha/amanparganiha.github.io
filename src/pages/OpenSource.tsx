import { useQuery } from "@tanstack/react-query";
import { GitPullRequest, GitMerge, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import FadeIn from "@/components/FadeIn";
import Seo from "@/components/Seo";
import {
  fetchPullRequests,
  repoFromUrl,
  prStatus,
  type PullRequest,
} from "@/lib/github";
import { contributions, githubUsername } from "@/data/portfolio";

const statusStyles: Record<string, string> = {
  merged: "bg-[hsl(265_60%_55%)] text-white",
  open: "bg-[hsl(140_60%_40%)] text-white",
  closed: "bg-muted text-muted-foreground",
};

const StatusBadge = ({ status }: { status: string }) => (
  <Badge className={`${statusStyles[status] ?? "bg-muted"} capitalize border-0`}>
    {status === "merged" ? (
      <GitMerge size={12} className="mr-1" />
    ) : (
      <GitPullRequest size={12} className="mr-1" />
    )}
    {status}
  </Badge>
);

const PullRequestRow = ({ pr }: { pr: PullRequest }) => {
  const repo = repoFromUrl(pr.repository_url);
  const status = prStatus(pr);
  return (
    <a
      href={pr.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-colors"
    >
      <div className="min-w-0">
        <p className="text-xs text-primary font-medium mb-1">{repo}</p>
        <p className="text-sm font-medium truncate">{pr.title}</p>
        <p className="text-xs text-muted-foreground mt-1">
          #{pr.number} · {new Date(pr.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="shrink-0">
        <StatusBadge status={status} />
      </div>
    </a>
  );
};

const OpenSource = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pull-requests"],
    queryFn: () => fetchPullRequests(30),
  });

  return (
    <div className="py-16 md:py-24">
      <Seo
        title="Open Source"
        description="Open-source contributions and pull requests by Aman Parganiha across GitHub."
        path="/open-source"
      />
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Open Source</h1>
          <p className="text-muted-foreground mb-10 max-w-xl">
            Contributions to the open-source ecosystem — featured work plus a live feed
            of my pull requests across GitHub.
          </p>
        </FadeIn>

        {/* Curated highlights */}
        {contributions.length > 0 && (
          <section className="mb-14">
            <FadeIn>
              <h2 className="text-xl font-semibold mb-6">Featured Contributions</h2>
            </FadeIn>
            <div className="space-y-4">
              {contributions.map((c, i) => (
                <FadeIn key={c.url} delay={i * 0.08}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-5 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-sm text-primary font-medium">{c.repo}</span>
                      <StatusBadge status={c.status} />
                    </div>
                    <p className="font-medium mb-1">{c.title}</p>
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                  </a>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {/* Live PR feed */}
        <section>
          <FadeIn>
            <h2 className="text-xl font-semibold mb-6">All Pull Requests</h2>
          </FadeIn>

          {isError ? (
            <p className="text-sm text-muted-foreground">
              Couldn't load pull requests from GitHub right now. View them directly on{" "}
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                my GitHub profile
              </a>
              .
            </p>
          ) : isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          ) : data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((pr) => (
                <PullRequestRow key={pr.id} pr={pr} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No public pull requests yet — more contributions on the way.
            </p>
          )}
        </section>

        <FadeIn>
          <div className="mt-10">
            <Button asChild variant="outline" size="sm">
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} className="mr-1" /> View GitHub profile
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default OpenSource;
