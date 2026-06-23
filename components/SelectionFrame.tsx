import type { CSSProperties } from "react";

export function SelectionFrame({
  color = "var(--cyan)",
  size = "16px"
}: {
  color?: string;
  size?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className="selection-frame"
      style={{ "--handle-color": color, "--handle-size": size } as CSSProperties}
    >
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}
