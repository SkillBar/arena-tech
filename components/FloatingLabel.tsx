import type { ReactNode } from "react";

type FloatingLabelProps = {
  variant: "product" | "location";
  children: ReactNode;
};

export function FloatingLabel({ variant, children }: FloatingLabelProps) {
  return (
    <div
      className={`floating-label ${variant === "product" ? "product-label" : "location-label"}`}
      data-floating-label={variant}
    >
      <div className="floating-label__loop">
        <div className="floating-label__hover">
          <span>{children}</span>
          <i />
        </div>
      </div>
    </div>
  );
}
