import { caseStudies, getCaseStudyHref } from "@/data/case-studies";

export type NavItem = {
  label: string;
  href: string;
  icon: "home" | "asterisk" | "stack" | "bars";
};

export type Project = {
  number: string;
  date: string;
  title: string;
  description: string;
  href: string;
  color: string;
  textColor: "dark" | "light";
  tags: string[];
  image: string;
  imageAlt: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about", icon: "asterisk" },
  { label: "Case study", href: "/case-study", icon: "stack" },
  { label: "Playground", href: "/play-ground", icon: "bars" }
];

export const projects: Project[] = caseStudies
  .filter((caseStudy) => caseStudy.showOnHome !== false)
  .map((caseStudy) => ({
  number: caseStudy.number,
  date: caseStudy.date,
  title: caseStudy.title,
  description: caseStudy.summary,
  href: getCaseStudyHref(caseStudy),
  color: caseStudy.accent,
  textColor: caseStudy.textColor,
  tags: caseStudy.tags,
  image: caseStudy.cover,
  imageAlt: caseStudy.coverAlt
}));

export const assets = {
  avatar: "/assets/images/avatar.webp",
  workspace: "/assets/images/workspace.webp",
  wave: "/assets/images/wave.svg",
  target: "/assets/images/target.webp",
  flower: "/assets/images/flower.svg",
  stamp: "/assets/images/stamp.webp",
  bolt: "/assets/images/bolt.webp",
  aboutAccent: "/assets/images/about-accent.webp",
  aboutProduct3d: "/assets/images/about-product-cube-3d.webp",
  aboutService3d: "/assets/images/about-service-window-3d.webp",
  aboutInterface3d: "/assets/images/about-interface-cursor-3d.webp",
  aboutGrowth3d: "/assets/images/about-growth-arrow-3d.webp",
  commentAvatar: "/assets/images/comment-avatar.webp"
};
