export function ProjectStepIcon({ outline = false }: { outline?: boolean }) {
  if (outline) {
    return (
      <svg
        aria-hidden="true"
        className="project-step-icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <rect x="0.5" y="8.5" width="3" height="3" stroke="currentColor" />
        <rect x="4.5" y="5.5" width="3" height="6" stroke="currentColor" />
        <rect x="8.5" y="2.5" width="3" height="9" stroke="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="project-step-icon"
      width="12"
      height="12"
      viewBox="0 0 12 12"
    >
      <rect x="0" y="9" width="3" height="3" fill="currentColor" />
      <rect x="4" y="6" width="3" height="6" fill="currentColor" />
      <rect x="8" y="3" width="3" height="9" fill="currentColor" />
    </svg>
  );
}
