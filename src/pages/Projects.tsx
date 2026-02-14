import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FadeIn from "@/components/FadeIn";
import { projects, type Project } from "@/data/portfolio";

const categories = ["All", "NLP", "Computer Vision", "Data Analysis", "MLOps", "Generative AI"] as const;

const Projects = () => {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="py-16 md:py-24">
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
                className="cursor-pointer hover:border-primary/30 transition-all hover:shadow-md h-full flex flex-col"
                onClick={() => setSelected(project)}
              >
                <CardHeader className="pb-3">
                  <Badge variant="secondary" className="w-fit text-xs mb-2">
                    {project.category}
                  </Badge>
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
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
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
                    {selected.demo && (
                      <Button size="sm" asChild>
                        <a href={selected.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} className="mr-1" /> Live Demo
                        </a>
                      </Button>
                    )}
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
