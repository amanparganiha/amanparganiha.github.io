import { Link } from "react-router-dom";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import RecentRepos from "@/components/RecentRepos";
import { githubUsername } from "@/data/portfolio";

const GithubActivity = () => {
  return (
    <section className="py-20 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="flex items-center gap-2 mb-2">
            <Github size={22} className="text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">What I'm building</h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-xl">
            A live look at my latest GitHub activity — updated automatically.
          </p>
        </FadeIn>

        {/* Contribution graph (live image from GitHub) */}
        <FadeIn delay={0.1}>
          <div className="rounded-lg border border-border/50 bg-card p-4 md:p-6 mb-8 overflow-x-auto">
            <img
              src={`https://ghchart.rshah.org/3c62dd/${githubUsername}`}
              alt={`${githubUsername}'s GitHub contribution graph`}
              loading="lazy"
              className="min-w-[640px] w-full"
            />
          </div>
        </FadeIn>

        {/* Most recently pushed repositories */}
        <FadeIn delay={0.15}>
          <RecentRepos />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild variant="outline" size="sm">
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} className="mr-1" /> View GitHub profile
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/open-source">
                Open-source contributions <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default GithubActivity;
