"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEventHandler } from "react";
import { SelectionFrame } from "@/components/SelectionFrame";

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ContactMascot({
  className,
  ariaLabel,
  decorative = true
}: {
  className?: string;
  ariaLabel?: string;
  decorative?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const resetEyes = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    root.style.setProperty("--mascot-look-x", "0px");
    root.style.setProperty("--mascot-look-y", "0px");
  }, []);

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    const root = rootRef.current;
    if (!root) return;

    const rect = root.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    root.style.setProperty("--mascot-look-x", `${Math.max(-1, Math.min(1, x * 2)) * 7}px`);
    root.style.setProperty("--mascot-look-y", `${Math.max(-1, Math.min(1, y * 2)) * 5}px`);
  };

  return (
    <div
      ref={rootRef}
      className={joinClasses("mascot-shell", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetEyes}
      data-cursor
      aria-hidden={decorative ? true : undefined}
    >
      <SelectionFrame color="var(--green)" size="14px" />
      <svg
        className="mascot-svg"
        viewBox="0 0 260 260"
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : ariaLabel ?? "Contact mascot"}
        focusable="false"
      >
        {!decorative ? <title>{ariaLabel ?? "Contact mascot"}</title> : null}
        <path
          className="mascot-shadow"
          d="M62 230c24 15 112 16 142 1 15-8 13-24-6-30-30-10-101-9-132 0-22 7-24 18-4 29Z"
        />
        <path
          className="mascot-body"
          d="M52 121c0-58 36-96 84-96 47 0 82 38 82 95 0 53-34 98-83 98-48 0-83-44-83-97Z"
        />
        <path
          className="mascot-ear mascot-ear-left"
          d="M76 60 42 35c-7-5-15 1-12 10l16 52"
        />
        <path
          className="mascot-ear mascot-ear-right"
          d="m186 60 33-25c8-5 16 1 13 10l-16 52"
        />
        <path
          className="mascot-face-patch"
          d="M81 122c0-31 22-54 53-54s53 23 53 54c0 33-22 59-53 59s-53-26-53-59Z"
        />
        <g className="mascot-eye mascot-eye-left">
          <ellipse className="mascot-eye-white" cx="113" cy="118" rx="17" ry="22" />
          <circle className="mascot-pupil" cx="115" cy="120" r="7" />
        </g>
        <g className="mascot-eye mascot-eye-right">
          <ellipse className="mascot-eye-white" cx="154" cy="118" rx="17" ry="22" />
          <circle className="mascot-pupil" cx="156" cy="120" r="7" />
        </g>
        <path className="mascot-mouth" d="M116 156c9 9 27 9 36 0" />
        <path className="mascot-cheek mascot-cheek-left" d="M88 148c8-5 18-5 26 0" />
        <path className="mascot-cheek mascot-cheek-right" d="M154 148c8-5 18-5 26 0" />
        <path className="mascot-cursor-mark" d="m188 183 40 18-20 7 15 24-13 8-15-24-14 16 7-49Z" />
      </svg>
      <span className="mascot-cursor-tip" aria-hidden="true">
        Hover
      </span>
    </div>
  );
}

export function ContactFlourish({
  className
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (drawn) return undefined;

    const svg = svgRef.current;
    if (!svg) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setDrawn(true);
        observer.disconnect();
      },
      { threshold: 0.32 }
    );

    observer.observe(svg);

    return () => observer.disconnect();
  }, [drawn]);

  return (
    <svg
      ref={svgRef}
      className={joinClasses("cta-flourish", drawn ? "is-drawn" : undefined, className)}
      viewBox="0 0 760 260"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="cta-flourish-path cta-stroke-path"
        pathLength={1}
        d="M52 154c83-74 190-103 318-87 119 15 221 58 313 129"
      />
      <path
        className="cta-flourish-path cta-flourish-path--accent"
        pathLength={1}
        d="M118 211c88-29 167-35 238-18 45 11 87 33 138 25 37-6 71-27 104-54"
      />
    </svg>
  );
}
