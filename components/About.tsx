import Image from "next/image";
import type { CSSProperties } from "react";
import { assets } from "@/data/site";
import { SelectionFrame } from "@/components/SelectionFrame";

type Service = {
  label: string;
  color: string;
};

const services: Service[] = [
  { label: "Product Strategy", color: "var(--yellow)" },
  { label: "UX/UI Design", color: "var(--green)" },
  { label: "MVP Launch", color: "var(--pink)" },
  { label: "Growth Systems", color: "var(--cyan)" }
];

function AboutCutout({
  src,
  className
}: {
  src: string;
  className: string;
}) {
  return (
    <span className={`about-cutout ${className}`} aria-hidden="true">
      <Image src={src} alt="" width={96} height={96} />
    </span>
  );
}

export function About() {
  return (
    <section className="about-section" id="about">
      <img className="wave-divider" src={assets.wave} alt="" />
      <div className="about-content">
        <div className="about-label reveal-line" data-cursor>
          <SelectionFrame color="var(--paper)" size="14px" />
          <span>О команде</span>
        </div>
        <h2 className="about-headline reveal-line">Products for Growth</h2>

        <p className="about-copy reveal-line">
          ARENA TECH{" "}
          <AboutCutout src={assets.aboutProduct3d} className="about-cutout--product" /> — продуктовая
          команда, которая проектирует{" "}
          <AboutCutout src={assets.aboutService3d} className="about-cutout--service" /> и запускает
          цифровые сервисы, интерфейсы{" "}
          <AboutCutout src={assets.aboutInterface3d} className="about-cutout--interface" /> и системы
          для роста бизнеса{" "}
          <AboutCutout src={assets.aboutGrowth3d} className="about-cutout--growth" />.
        </p>

        <ul className="service-list" aria-label="Services">
          {services.map((service) => (
            <li
              key={service.label}
              className="service-chip reveal-line"
              style={{ "--chip": service.color } as CSSProperties}
            >
              {service.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
