import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/Icons";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function CanvasButton({
  href,
  children,
  variant = "dark",
  className = ""
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "white" | "hero";
  className?: string;
}) {
  const classNames = `canvas-button canvas-button-${variant} ${className}`;
  const external = isExternalHref(href);

  if (external) {
    return (
      <a
        href={href}
        className={classNames}
        data-cursor
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="button-border" />
        <span className="button-fill" />
        <span className="button-dot top-left" />
        <span className="button-dot bottom-left" />
        <span className="button-dot bottom-right" />
        <span className="button-dot top-right" />
        <span className="button-icon">
          <ArrowIcon />
        </span>
        <span className="button-label">{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classNames} data-cursor>
      <span className="button-border" />
      <span className="button-fill" />
      <span className="button-dot top-left" />
      <span className="button-dot bottom-left" />
      <span className="button-dot bottom-right" />
      <span className="button-dot top-right" />
      <span className="button-icon">
        <ArrowIcon />
      </span>
      <span className="button-label">{children}</span>
    </Link>
  );
}
