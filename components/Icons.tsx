import type { NavItem } from "@/data/site";

export function NavIcon({ icon }: { icon: NavItem["icon"] }) {
  return <span aria-hidden="true" className={`nav-icon nav-icon-${icon}`} />;
}

export function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon" />;
}

export function LogoMark() {
  return (
    <span aria-hidden="true" className="logo-mark">
      <span />
      <span />
      <span />
    </span>
  );
}

export function MenuIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className={`menu-icon ${open ? "is-open" : ""}`}>
      <span />
      <span />
    </span>
  );
}

