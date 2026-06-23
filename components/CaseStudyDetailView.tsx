import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { SelectionFrame } from "@/components/SelectionFrame";

export type CaseStudyMetaItem = {
  label: string;
  value: string;
};

export type CaseStudySection = {
  id?: string;
  eyebrow?: string;
  title: string;
  body: ReactNode;
  bullets?: string[];
  image?: string;
  imageAlt?: string;
};

export type CaseStudyDetail = {
  title: string;
  date: string;
  description?: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  meta?: CaseStudyMetaItem[];
  sections?: CaseStudySection[];
};

const noteRotations = ["-3.5deg", "2.25deg", "-1.5deg", "3deg"];

function Body({ children }: { children: ReactNode }) {
  return typeof children === "string" ? <p>{children}</p> : children;
}

export function CaseStudyDetailView({
  caseStudy,
  children,
  backHref = "/case-study"
}: {
  caseStudy: CaseStudyDetail;
  children?: ReactNode;
  backHref?: string;
}) {
  return (
    <main className="case-detail">
      <section className="case-detail-hero" aria-labelledby="case-detail-title">
        <Link href={backHref} className="case-detail-back">
          Case studies
        </Link>

        <div className="case-detail-heading">
          <div className="case-date-row case-detail-date-row">
            <span aria-hidden="true" />
            <time>{caseStudy.date}</time>
          </div>
          <h1 className="case-detail-title" id="case-detail-title">
            {caseStudy.title}
          </h1>
          <ul className="case-tag-list case-detail-tags" aria-label="Case study tags">
            {caseStudy.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {caseStudy.description ? (
            <p className="case-detail-dek">{caseStudy.description}</p>
          ) : null}
        </div>

        {caseStudy.meta?.length ? (
          <aside className="case-detail-meta-cluster" aria-label="Project details">
            {caseStudy.meta.map((item, index) => (
              <dl
                key={`${item.label}-${item.value}`}
                className="case-detail-meta-note"
                style={
                  {
                    "--note-rotation": noteRotations[index % noteRotations.length]
                  } as CSSProperties
                }
              >
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </dl>
            ))}
          </aside>
        ) : null}
      </section>

      {caseStudy.image ? (
        <figure className="case-detail-image case-detail-hero-image" data-cursor>
          <SelectionFrame color="var(--cyan)" size="18px" />
          <Image
            src={caseStudy.image}
            alt={caseStudy.imageAlt ?? ""}
            width={1440}
            height={960}
            sizes="(max-width: 809px) calc(100vw - 32px), calc(100vw - 200px)"
            priority
          />
        </figure>
      ) : null}

      <article className="case-detail-article">
        {children ??
          caseStudy.sections?.map((section) => (
            <section
              className="case-detail-section"
              id={section.id}
              key={section.id ?? section.title}
            >
              {section.eyebrow ? (
                <p className="case-detail-section-eyebrow">{section.eyebrow}</p>
              ) : null}
              <h2>{section.title}</h2>
              <div className="case-detail-copy">
                <Body>{section.body}</Body>
              </div>
              {section.bullets?.length ? (
                <ul className="case-detail-bullet-list">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.image ? (
                <figure className="case-detail-image case-detail-section-image" data-cursor>
                  <SelectionFrame color="var(--green)" size="14px" />
                  <Image
                    src={section.image}
                    alt={section.imageAlt ?? ""}
                    width={960}
                    height={640}
                    sizes="(max-width: 809px) calc(100vw - 32px), 800px"
                  />
                </figure>
              ) : null}
            </section>
          ))}
      </article>
    </main>
  );
}
