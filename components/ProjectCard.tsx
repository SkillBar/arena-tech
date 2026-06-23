import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/data/site";
import { CanvasButton } from "@/components/CanvasButton";
import { ProjectStepIcon } from "@/components/ProjectStepIcon";
import { SelectionFrame } from "@/components/SelectionFrame";

export function ProjectCard({
  project,
  index,
  total
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const light = project.textColor === "light";
  const isLokalKeep = project.href.includes("lokalkeep") || project.href.includes("local-keep");
  const isMusicGen = project.href.includes("musicgen");
  const isYGroup = project.href.includes("homestead");
  const isTgMagic = project.href.includes("north-light");
  const isAiTrade = project.href.includes("ai-trade");
  const isHyperArt = project.href.includes("hyperart");
  const isLast = index === total - 1;
  const themeClass = isLokalKeep
    ? " project-shell--lokal-keep"
    : isMusicGen
      ? " project-shell--musicgen"
      : isYGroup
        ? " project-shell--y-group"
        : isTgMagic
          ? " project-shell--tg-magic"
          : isHyperArt || isAiTrade
            ? " project-shell--aitrade"
            : "";

  return (
    <article
      className={`project-shell ${light ? "is-light" : "is-dark"}${themeClass}`}
      style={{ "--project-color": project.color } as CSSProperties}
    >
      <div className="project-number-wrap">
        {isLast ? (
          <div
            className="project-number project-number--4"
            style={{
              marginLeft: `${index * 23.7}%`,
              width: `${100 - index * 23.7}%`
            }}
          >
            <div className="project-number__head">
              <ProjectStepIcon outline={light} />
              <span>{project.number}</span>
            </div>
            <span className="project-number__tail" aria-hidden="true" />
          </div>
        ) : (
          <div
            className={`project-number project-number--${isTgMagic && index === 3 ? 3 : index + 1}`}
            style={{ marginLeft: `${index * 23.7}%` }}
          >
            <ProjectStepIcon outline={light} />
            <span>{project.number}</span>
          </div>
        )}
      </div>

      <div className="project-card">
        <span className="project-fix-color" />
        <div className="project-content">
          <div className="project-copy">
            <div className="project-date">
              <span />
              {project.date}
            </div>
            <h3 className="project-title letter-reveal">{project.title}</h3>
            <p className="project-desc reveal-line">{project.description}</p>
            <CanvasButton
              href={project.href}
              variant={light ? "white" : "dark"}
              className="project-link"
            >
              View Project
            </CanvasButton>
          </div>

          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">
                <i />
                <em>{tag}</em>
              </span>
            ))}
          </div>
        </div>

        <div className="project-image" data-cursor>
          <SelectionFrame color="var(--cyan)" />
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={1200}
            height={800}
            sizes="(max-width: 809px) 326px, (max-width: 1199px) 456px, 844px"
            priority={index === 0}
          />
          <div className="image-label">
            <span>JPG</span>
            Image.webp
          </div>
        </div>
      </div>
    </article>
  );
}
