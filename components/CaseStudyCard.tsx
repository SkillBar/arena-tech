import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { SelectionFrame } from "@/components/SelectionFrame";

export type CaseStudyCardProject = {
  number?: string;
  date: string;
  title: string;
  description: string;
  href: string;
  color?: string;
  tags: string[];
  image: string;
  imageAlt: string;
};

const fallbackAccents = [
  "var(--cyan)",
  "var(--yellow)",
  "var(--green)",
  "var(--pink)"
];

export function CaseStudyCard({
  project,
  index = 0,
  priority = false,
  className = ""
}: {
  project: CaseStudyCardProject;
  index?: number;
  priority?: boolean;
  className?: string;
}) {
  const accent = project.color ?? fallbackAccents[index % fallbackAccents.length];
  const number = project.number ?? `case ${String(index + 1).padStart(2, "0")}`;
  const external = project.href.startsWith("http://") || project.href.startsWith("https://");

  return (
    <article
      className={["case-card", className].filter(Boolean).join(" ")}
      style={{ "--case-accent": accent } as CSSProperties}
    >
      <div className="case-card-tab" aria-hidden="true">
        <span>{number}</span>
      </div>

      {external ? (
        <a
          href={project.href}
          className="case-card-link"
          aria-label={`Open ${project.title} case study`}
          data-cursor
          target="_blank"
          rel="noopener noreferrer"
        >
          <CaseStudyCardContent project={project} priority={priority} />
        </a>
      ) : (
        <Link
          href={project.href}
          className="case-card-link"
          aria-label={`Open ${project.title} case study`}
          data-cursor
        >
          <CaseStudyCardContent project={project} priority={priority} />
        </Link>
      )}
    </article>
  );
}

function CaseStudyCardContent({
  project,
  priority
}: {
  project: CaseStudyCardProject;
  priority: boolean;
}) {
  return (
    <>
        <div className="case-card-media">
          <SelectionFrame color="var(--case-accent)" size="14px" />
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={960}
            height={720}
            sizes="(max-width: 809px) calc(100vw - 64px), (max-width: 1199px) 44vw, 560px"
            priority={priority}
          />
          <span className="case-card-file">JPG</span>
        </div>

        <div className="case-card-body">
          <div className="case-date-row">
            <span aria-hidden="true" />
            <time>{project.date}</time>
          </div>
          <h2 className="case-card-title">{project.title}</h2>
          <p className="case-card-description">{project.description}</p>

          <ul className="case-tag-list" aria-label={`${project.title} tags`}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </>
  );
}
