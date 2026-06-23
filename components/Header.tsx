"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/data/site";
import { LogoMark, MenuIcon, NavIcon } from "@/components/Icons";
import { CanvasButton } from "@/components/CanvasButton";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={`site-header ${open ? "is-open" : ""}`}>
      <nav className="header-nav" aria-label="Main navigation">
        <div className="header-inner">
          <div className="logo-zone">
            <LogoMark />
            <span className="header-divider" />
          </div>

          <div className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-tab ${isActive(item.href) ? "is-active" : ""}`}
                data-cursor
              >
                <NavIcon icon={item.icon} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <button
            className="mobile-menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            data-cursor
          >
            <span>{open ? "Close" : "Menu"}</span>
            <MenuIcon open={open} />
          </button>

          <div className="header-contact">
            <button className="round-pill" type="button" data-cursor>
              EM
            </button>
            <button className="round-pill" type="button" data-cursor>
              PH
            </button>
            <CanvasButton href="/contact" variant="white" className="top-contact">
              Contact
            </CanvasButton>
          </div>
        </div>

        <div className="mobile-panel">
          <div className="mobile-panel-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-tab mobile-row ${isActive(item.href) ? "is-active" : ""}`}
                data-cursor
                onClick={() => setOpen(false)}
              >
                <NavIcon icon={item.icon} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="mobile-contact-row">
            <button className="round-pill" type="button" data-cursor>
              EM
            </button>
            <button className="round-pill" type="button" data-cursor>
              PH
            </button>
            <CanvasButton href="/contact" variant="white" className="top-contact">
              Contact
            </CanvasButton>
          </div>
        </div>
      </nav>
      <span className="header-line" />
    </header>
  );
}
