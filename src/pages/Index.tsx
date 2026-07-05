import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Database,
  Code,
  BarChart3,
  Clock,
  Hand,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FadeIn from "@/components/FadeIn";
import Seo from "@/components/Seo";
import GithubActivity from "@/components/GithubActivity";
import GlassCard from "@/components/home/GlassCard";
import SectionLabel from "@/components/home/SectionLabel";
import StatusDot from "@/components/home/StatusDot";
import { personalInfo, projects } from "@/data/portfolio";
import { getAllPosts, formatDate } from "@/lib/posts";

const capabilities: { icon: LucideIcon; label: string; desc: string }[] = [
  { icon: Brain, label: "Deep Learning", desc: "Neural networks & transformers" },
  { icon: Database, label: "Data Engineering", desc: "Scalable pipelines" },
  { icon: Code, label: "Full-Stack ML", desc: "End-to-end solutions" },
  { icon: BarChart3, label: "Analytics", desc: "Data-driven insights" },
];

const Index = () => {
  const latestPosts = getAllPosts().slice(0, 3);
  const airCanvas = projects.find((p) => p.demo === "/projects/air-canvas");

  return (
    <div>
      <Seo
        title="AI & Software Engineer"
        description={personalInfo.tagline}
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: personalInfo.name,
          jobTitle: personalInfo.title,
          url: "https://amanparganiha.github.io/",
          image: `https://amanparganiha.github.io${personalInfo.photo}`,
          email: `mailto:${personalInfo.email}`,
          alumniOf: "IIIT Naya Raipur",
          sameAs: Object.values(personalInfo.social),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Soft indigo aurora — translucent so the starfield still reads through */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[12%] top-[8%] h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[6%] right-[14%] h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:gap-16">
            {/* Text content */}
            <div className="flex-1">
              <FadeIn>
                <span className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 backdrop-blur-xl">
                  <StatusDot label={personalInfo.status} />
                </span>
              </FadeIn>

              <FadeIn delay={0.05}>
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-primary/80">
                  [ AI · ML · SYSTEMS ]
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
                  I'm{" "}
                  <span className="text-primary">{personalInfo.name}</span>
                  <span className="mt-3 block text-foreground/90">
                    {personalInfo.heroHeadline}
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.18}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {personalInfo.heroSub}
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg">
                    <Link to="/projects">
                      View Projects <ArrowRight className="ml-1" size={16} />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/resume">Resume</Link>
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Profile photo — glass frame with an indigo glow ring */}
            <FadeIn delay={0.15} className="flex-shrink-0">
              <div className="group relative">
                <div className="absolute -inset-3 rounded-[1.75rem] bg-primary/20 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
                <div className="relative h-72 w-48 overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-1.5 shadow-2xl backdrop-blur-xl md:h-96 md:w-60">
                  <div className="h-full w-full overflow-hidden rounded-[1.35rem] ring-1 ring-primary/30">
                    <img
                      src={personalInfo.photo}
                      alt={personalInfo.name}
                      width={480}
                      height={501}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
                {/* Coordinate-style caption */}
                <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {personalInfo.location} · M.Tech AI/ML
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionLabel index="01" className="mb-6">
              Telemetry
            </SectionLabel>
          </FadeIn>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {personalInfo.stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <GlassCard hover className="flex h-full flex-col justify-between p-5 md:p-6">
                  <p className="font-mono text-3xl font-medium tracking-tight text-primary md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionLabel index="02" className="mb-3">
              Field Notes
            </SectionLabel>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="mb-10 text-2xl font-semibold tracking-tight md:text-3xl">
              About
            </h2>
          </FadeIn>
          <div className="grid items-start gap-12 md:grid-cols-2">
            <FadeIn delay={0.1}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {personalInfo.about}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {capabilities.map((item) => (
                  <GlassCard key={item.label} hover className="p-5">
                    <item.icon size={20} strokeWidth={1.5} className="mb-3 text-primary" />
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-foreground/80">{item.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Live demo — Air Canvas */}
      {airCanvas && (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn>
              <SectionLabel index="03" className="mb-3">
                Live Demo
              </SectionLabel>
            </FadeIn>
            <FadeIn delay={0.05}>
              <GlassCard hover className="relative overflow-hidden p-8 md:p-10">
                {/* Soft glow accent in the card's corner */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-[80px]" />
                <div className="flex flex-col gap-8 md:flex-row md:items-center">
                  <div className="flex-1">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Badge className="gap-1 text-xs">
                        <Sparkles size={11} /> Live
                      </Badge>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Runs in your browser · no install
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      Air Canvas
                    </h2>
                    <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">
                      {airCanvas.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {airCanvas.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-7">
                      <Button asChild size="lg">
                        <Link to="/projects/air-canvas">
                          Try it live <ArrowRight className="ml-1" size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  {/* Decorative panel — same icon language as the capability cards */}
                  <div className="hidden flex-shrink-0 md:block">
                    <div className="flex h-40 w-40 items-center justify-center rounded-3xl border border-border/60 bg-card/40 ring-1 ring-primary/20">
                      <Hand size={56} strokeWidth={1.25} className="text-primary" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Live GitHub activity */}
      <GithubActivity />

      {/* Latest writing */}
      {latestPosts.length > 0 && (
        <section className="border-t border-border/50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn>
              <SectionLabel index="04" className="mb-3">
                Transmissions
              </SectionLabel>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Latest writing
                </h2>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/blogs">
                    All posts <ArrowRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 0.08}>
                  <Link to={`/blogs/${post.slug}`} className="block h-full">
                    <GlassCard hover className="flex h-full flex-col p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="mb-2 font-semibold tracking-tight">{post.title}</h3>
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {formatDate(post.date)}
                      </p>
                    </GlassCard>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
