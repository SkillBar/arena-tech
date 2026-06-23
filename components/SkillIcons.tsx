type SkillIconName = "grid" | "spark" | "eye" | "motion";

export type { SkillIconName };

export function SkillIcon({ name }: { name: SkillIconName }) {
  switch (name) {
    case "grid":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <rect x="4" y="4" width="10" height="10" fill="var(--ink)" />
          <rect x="18" y="4" width="10" height="10" fill="var(--ink)" />
          <rect x="4" y="18" width="10" height="10" fill="var(--ink)" />
          <rect x="18" y="18" width="10" height="10" fill="var(--ink)" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <circle cx="16" cy="16" r="6" fill="var(--pink)" />
          <rect x="15" y="2" width="2" height="6" fill="var(--ink)" />
          <rect x="15" y="24" width="2" height="6" fill="var(--ink)" />
          <rect x="2" y="15" width="6" height="2" fill="var(--ink)" />
          <rect x="24" y="15" width="6" height="2" fill="var(--ink)" />
          <rect x="6" y="6" width="2" height="5" fill="var(--green)" transform="rotate(-45 7 8.5)" />
          <rect x="24" y="6" width="2" height="5" fill="var(--green)" transform="rotate(45 25 8.5)" />
          <rect x="6" y="21" width="2" height="5" fill="var(--green)" transform="rotate(45 7 23.5)" />
          <rect x="24" y="21" width="2" height="5" fill="var(--green)" transform="rotate(-45 25 23.5)" />
        </svg>
      );
    case "eye":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <ellipse cx="16" cy="16" rx="12" ry="8" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="16" cy="16" r="4" fill="var(--ink)" />
          <circle cx="18" cy="14" r="1.5" fill="var(--paper)" />
          <path
            d="M24 8 L26 6 L28 10 Z"
            fill="var(--yellow)"
            stroke="var(--ink)"
            strokeWidth="1"
          />
        </svg>
      );
    case "motion":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
          <circle cx="10" cy="12" r="4" fill="var(--ink)" />
          <circle cx="22" cy="10" r="4" fill="var(--ink)" />
          <circle cx="16" cy="22" r="4" fill="var(--ink)" />
          <circle cx="8" cy="22" r="3" fill="var(--pink)" />
          <circle cx="24" cy="20" r="3" fill="var(--ink)" />
        </svg>
      );
  }
}
