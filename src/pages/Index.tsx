import { Link } from "react-router-dom";
import { ArrowRight, Brain, Database, Code, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import { personalInfo } from "@/data/portfolio";

const Index = () => {
  return (
    <div>
      {/* Hero */}
<section className="relative overflow-hidden py-24 md:py-32">
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
  </div>
  <div className="mx-auto max-w-6xl px-6">
    <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

      {/* Text Content */}
      <div className="flex-1">
        <FadeIn>
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-4">
            Welcome to my portfolio
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Hi, I'm{" "}
            <span className="text-primary">{personalInfo.name}</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-4">
            {personalInfo.title}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg text-muted-foreground max-w-xl mb-8">
            {personalInfo.tagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/projects">
                View Projects <ArrowRight className="ml-1" size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/resume">My Resume</Link>
            </Button>
          </div>
        </FadeIn>
      </div>

      {/* Profile Photo */}
      <FadeIn delay={0.15} className="flex-shrink-0">
  <div className="relative">
    <div className="absolute inset-0 bg-primary/20 blur-2xl scale-110 rounded-2xl" />
    <div className="relative w-48 h-72 md:w-60 md:h-96 rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl">
  <img
    src={personalInfo.photo}
    alt={personalInfo.name}
    className="w-full h-full object-cover object-top"
  />
</div>
  </div>
</FadeIn>

    </div>
  </div>
</section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {personalInfo.stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">About Me</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {personalInfo.about}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Brain, label: "Deep Learning", desc: "Neural networks & transformers" },
                  { icon: Database, label: "Data Engineering", desc: "Scalable pipelines" },
                  { icon: Code, label: "Full-Stack ML", desc: "End-to-end solutions" },
                  { icon: BarChart3, label: "Analytics", desc: "Data-driven insights" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-colors"
                  >
                    <item.icon size={20} className="text-primary mb-2" />
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
