import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FadeIn from "@/components/FadeIn";
import Seo from "@/components/Seo";
import { githubSocialCard, projects, type Project } from "@/data/portfolio";

/** Custom image first, then GitHub's auto-generated repo card. */
const thumbnail = (p: Project) =>
  p.image ?? (p.github ? githubSocialCard(p.github) : undefined);

const categories = ["All", "NLP", "Computer Vision", "Data Analysis", "MLOps", "Generative AI", "Reinforcement Learning", "Tools"] as const;

const Projects = () => {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Deep link from the command palette: /projects?p=<id> opens that
  // project's detail dialog.
  useEffect(() => {
    const id = searchParams.get("p");
    if (!id) return;
    const project = projects.find((x) => x.id === id);
    if (project) setSelected(project);
  }, [searchParams]);

  const closeDialog = () => {
    setSelected(null);
    // Drop ?p= so closing really closes (and back button behaves).
    if (searchParams.has("p")) setSearchParams({}, { replace: true });
  };

  // A demo that points at an in-app route (starts with "/") is a live demo on
  // this site, so we navigate internally instead of opening a new tab.
  const isInternal = (url?: string) => !!url && url.startsWith("/");

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="py-16 md:py-24">
      <Seo
        title="Projects"
        description="ML/AI projects by Aman Parganiha — from research prototypes to production systems."
        path="/projects"
      />
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground mb-8 max-w-xl">
            A selection of ML/AI projects I've built — from research prototypes to production systems.
          </p>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.08}>
              <Card
                className="group cursor-pointer hover:border-primary/30 transition-all hover:shadow-md h-full flex flex-col overflow-hidden"
                onClick={() => setSelected(project)}
              >
                {thumbnail(project) && (
                  <div className="aspect-video overflow-hidden border-b border-border/50 bg-muted/30">
                    <img
                      src={thumbnail(project)}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      onError={(e) => {
                        // Hide the banner if the image can't load (e.g. a
                        // repo went private) — the card still reads fine.
                        e.currentTarget.parentElement!.style.display = "none";
                      }}
                    />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="w-fit text-xs">
                      {project.category}
                    </Badge>
                    {project.demo && (
                      <Badge className="w-fit text-xs gap-1">
                        <Sparkles size={11} /> Live
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Detail Dialog */}
        <Dialog open={!!selected} onOpenChange={closeDialog}>
          <DialogContent className="max-w-lg">
            {selected && (
              <>
                <DialogHeader>
                  <Badge variant="secondary" className="w-fit text-xs mb-2">
                    {selected.category}
                  </Badge>
                  <DialogTitle>{selected.title}</DialogTitle>
                  <DialogDescription className="pt-2">
                    {selected.longDescription}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  <div>
                    <p className="text-sm font-medium mb-2">Results</p>
                    <p className="text-sm text-muted-foreground">{selected.results}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Tech Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {selected.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selected.github} target="_blank" rel="noopener noreferrer">
                          <Github size={14} className="mr-1" /> GitHub
                        </a>
                      </Button>
                    )}
                    {selected.demo &&
                      (isInternal(selected.demo) ? (
                        <Button
                          size="sm"
                          onClick={() => {
                            const to = selected.demo!;
                            setSelected(null);
                            navigate(to);
                          }}
                        >
                          <Sparkles size={14} className="mr-1" /> Try Live Demo
                        </Button>
                      ) : (
                        <Button size="sm" asChild>
                          <a href={selected.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} className="mr-1" /> Live Demo
                          </a>
                        </Button>
                      ))}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Projects;
