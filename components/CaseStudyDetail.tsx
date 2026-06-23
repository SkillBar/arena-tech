import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { CaseStudy, CaseStudySection } from "@/data/case-studies";
import { CTA } from "@/components/CTA";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { PageMotion } from "@/components/PageMotion";
import { Ruler } from "@/components/Ruler";
import { SelectionFrame } from "@/components/SelectionFrame";

export function CaseStudyDetail({ caseStudy }: { caseStudy: CaseStudy }) {
  const hasFullDetail = Boolean(caseStudy.detailSections?.length);

  return (
    <>
      <Header />
      <PageMotion />
      <main className="canvas-page case-shell case-detail-page">
        <Ruler />
        <article>
          <section className="case-detail-hero case-container">
            <div className="case-detail-primary">
              <div className="case-detail-date">
                <span />
                {caseStudy.date}
              </div>
              <h1 className="case-page-title case-detail-title letter-reveal">{caseStudy.title}</h1>
              <p className="case-detail-summary reveal-line">{caseStudy.summary}</p>
              <div className="case-detail-tags">
                {caseStudy.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="case-note-cluster" aria-label="Project details">
              {(caseStudy.metaNotes ?? defaultMetaNotes).map((note) => (
                <div
                  key={note.label}
                  className="case-note"
                  style={
                    {
                      "--note-color": note.color,
                      "--note-rotation": `${note.rotation}deg`
                    } as CSSProperties
                  }
                >
                  <span>{note.label}</span>
                  <strong>{note.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <CaseImageFrame
            className="case-hero-image"
            src={caseStudy.cover}
            alt={caseStudy.coverAlt}
            priority
          />

          {hasFullDetail ? (
            <div className="case-detail-content">
              {caseStudy.detailSections?.map((section, index) => (
                <CaseDetailSection key={section.title} section={section} index={index} />
              ))}
            </div>
          ) : (
            <section className="case-container case-stub-panel">
              <p className="case-stub-kicker">Full case study</p>
              <h2>{caseStudy.title} is being shaped up.</h2>
              <p>
                The card, hero, metadata, and cover are ready so the route behaves like the finished
                system. The long-form story can be dropped into the same structure when the copy is
                approved.
              </p>
              <Link href="/case-study" className="case-back-link" data-cursor>
                Back to case studies
              </Link>
            </section>
          )}
        </article>
        <CTA />
      </main>
      <CustomCursor />
    </>
  );
}

const defaultMetaNotes = [
  { label: "Role", value: "Product Design", color: "#a4e5f8", rotation: -4 },
  { label: "Timeline", value: "TBD", color: "#f5dda1", rotation: 7 },
  { label: "Team", value: "Product", color: "#a1dfc5", rotation: 5 },
  { label: "Platform", value: "Web", color: "#fabed1", rotation: 2 }
];

function CaseDetailSection({
  section,
  index
}: {
  section: CaseStudySection;
  index: number;
}) {
  return (
    <section className="case-detail-section">
      <div className="case-text-block">
        <h2>{section.title}</h2>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.bullets ? (
          <ul>
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>

      {section.image ? (
        <CaseImageFrame
          src={section.image}
          alt={section.imageAlt ?? ""}
          className={index === 0 ? "case-section-image is-first" : "case-section-image"}
        />
      ) : null}
    </section>
  );
}

function CaseImageFrame({
  src,
  alt,
  className,
  priority = false
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`case-detail-image ${className ?? ""}`}>
      <SelectionFrame color="var(--paper)" size="16px" />
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1045}
        sizes="(max-width: 809px) 358px, (max-width: 1199px) 740px, 1240px"
        priority={priority}
      />
    </figure>
  );
}
