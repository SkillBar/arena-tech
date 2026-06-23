import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { CaseStudy } from "@/data/case-studies";
import { getCaseStudyHref } from "@/data/case-studies";
import { CTA } from "@/components/CTA";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { PageMotion } from "@/components/PageMotion";
import { Ruler } from "@/components/Ruler";

export function CaseStudyIndex({ cases }: { cases: CaseStudy[] }) {
  return (
    <>
      <Header />
      <PageMotion />
      <main className="canvas-page case-shell">
        <section className="case-index-section">
          <Ruler />
          <div className="case-container">
            <h1 className="case-page-title letter-reveal">Case studies</h1>
            <div className="case-grid">
              {cases.map((caseStudy) => (
                <CaseStudyFolderCard key={caseStudy.slug} caseStudy={caseStudy} />
              ))}
            </div>
          </div>
        </section>
        <CTA />
      </main>
      <CustomCursor />
    </>
  );
}

function CaseStudyFolderCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article
      className="case-folder-card"
      style={{ "--case-accent": caseStudy.accent } as CSSProperties}
    >
      <Link
        href={getCaseStudyHref(caseStudy)}
        className="case-folder-link"
        aria-label={`Open ${caseStudy.title} case study`}
        data-cursor
        {...(caseStudy.externalUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <div className="case-folder-tab">
          <div className="case-folder-date">
            <span />
            {caseStudy.date}
          </div>
          <i aria-hidden="true" />
        </div>
        <div className="case-folder-image">
          <div className="case-folder-image-frame">
            <div className="case-folder-image-inner">
              <Image
                src={caseStudy.cover}
                alt={caseStudy.coverAlt}
                width={1200}
                height={800}
                sizes="(max-width: 809px) 342px, (max-width: 1199px) 48vw, 592px"
              />
            </div>
          </div>
        </div>
      </Link>
      <div className="case-card-copy">
        <h2>{caseStudy.title}</h2>
        <p>{caseStudy.summary}</p>
      </div>
    </article>
  );
}
