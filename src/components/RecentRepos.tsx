import { useQuery } from "@tanstack/react-query";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { fetchRecentRepos } from "@/lib/github";
import { Skeleton } from "@/components/ui/skeleton";

const RecentRepos = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recent-repos"],
    queryFn: () => fetchRecentRepos(6),
  });

  if (isError) {
    return (
      <p className="text-sm text-muted-foreground">
        Couldn't load recent activity from GitHub right now.
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))
        : data?.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-colors flex flex-col"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-medium text-sm truncate">{repo.name}</span>
                <ExternalLink size={14} className="text-muted-foreground shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                {repo.description ?? "No description provided."}
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star size={12} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
    </div>
  );
};

export default RecentRepos;
