import { Download, Briefcase, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FadeIn from "@/components/FadeIn";
import { experiences, education, skillCategories, certifications } from "@/data/portfolio";

const Resume = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Resume</h1>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </FadeIn>

        {/* Experience */}
        <section className="mb-16">
          <FadeIn>
            <div className="flex items-center gap-2 mb-8">
              <Briefcase size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Experience</h2>
            </div>
          </FadeIn>
          <div className="space-y-8 border-l-2 border-border pl-6">
            {experiences.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-primary" />
                  <p className="text-xs text-muted-foreground mb-1">{exp.period}</p>
                  <h3 className="font-semibold">{exp.role}</h3>
                  <p className="text-sm text-primary mb-2">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-2">{exp.description}</p>
                  <ul className="space-y-1">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <FadeIn>
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Education</h2>
            </div>
          </FadeIn>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-4 rounded-lg border border-border/50 bg-card">
                  <p className="text-xs text-muted-foreground mb-1">{edu.period}</p>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-sm text-primary">{edu.school}</p>
                  {edu.details && (
                    <p className="text-xs text-muted-foreground mt-1">{edu.details}</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <FadeIn>
            <h2 className="text-xl font-semibold mb-8">Skills</h2>
          </FadeIn>
          <div className="space-y-6">
            {skillCategories.map((cat, i) => (
              <FadeIn key={cat.category} delay={i * 0.08}>
                <div>
                  <p className="text-sm font-medium mb-2">{cat.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <FadeIn>
            <div className="flex items-center gap-2 mb-6">
              <Award size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Certifications</h2>
            </div>
          </FadeIn>
          <ul className="space-y-2">
            {certifications.map((cert, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {cert}
                </li>
              </FadeIn>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Resume;
