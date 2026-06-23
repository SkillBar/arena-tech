import Image from "next/image";
import type { CSSProperties } from "react";
import { assets, projects } from "@/data/site";
import { CanvasButton } from "@/components/CanvasButton";
import { Ruler } from "@/components/Ruler";
import { FloatingLabel } from "@/components/FloatingLabel";
import { SelectionFrame } from "@/components/SelectionFrame";

const heroProjects = projects.slice(0, 2);

export function Hero() {
  return (
    <section className="hero-section">
      <Ruler />
      <div className="hero-content">
        <div className="hero-name-block">
          <p className="handwritten hero-hand">we are</p>
          <div className="hero-name" data-cursor>
            <SelectionFrame />
            <h1 className="hero-name-title letter-reveal">Arena Tech</h1>
          </div>
          <div className="status-pill status-current">
            Currently at Meridian Health
          </div>
          <div className="status-pill status-previous">
            Previously at Searchless AI
          </div>
          <div className="availability">
            <span />
            Available for thoughtful projects
          </div>
        </div>

        {heroProjects.map((project, index) => (
          <div
            key={project.href}
            className={`hero-project-sticker hero-project-sticker--${index === 0 ? "left" : "right"}`}
            style={{ "--sticker-accent": project.color } as CSSProperties}
            data-cursor
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={80}
              height={56}
              sizes="56px"
            />
          </div>
        ))}

        <div className="hero-copy">
          <FloatingLabel variant="product">Product Designer</FloatingLabel>
          <FloatingLabel variant="location">Chicago, IL</FloatingLabel>
          <div className="hero-lines">
            <p className="hero-line hero-line-reveal">
              I design <img src={assets.target} alt="" /> outstanding
            </p>
            <p className="hero-line hero-line-reveal">
              digital products <img src={assets.flower} alt="" />.
            </p>
          </div>
          <CanvasButton href="/contact" variant="hero" className="hero-cta">
            COntact me
          </CanvasButton>
        </div>
      </div>
    </section>
  );
}

