import { CaseStudyCard, type CaseStudyCardProject } from "@/components/CaseStudyCard";

export function CaseStudyIndexView({
  projects,
  eyebrow = "selected case studies",
  title = "Case Study",
  intro = "A closer look at the product decisions, systems, and tradeoffs behind selected work."
}: {
  projects: readonly CaseStudyCardProject[];
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <main className="case-index">
      <section className="case-index-hero" aria-labelledby="case-index-title">
        <p className="case-index-eyebrow">{eyebrow}</p>
        <h1 className="case-page-title" id="case-index-title">
          {title}
        </h1>
        {intro ? <p className="case-index-intro">{intro}</p> : null}
      </section>

      <section className="case-card-grid" aria-label="Case studies">
        {projects.map((project, index) => (
          <CaseStudyCard
            key={project.href}
            project={project}
            index={index}
            priority={index < 2}
          />
        ))}
      </section>
    </main>
  );
}
