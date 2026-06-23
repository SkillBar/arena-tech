import type { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";
import { CaseStudyIndex } from "@/components/CaseStudyIndex";

export const metadata: Metadata = {
  title: "Case Studies - Nudge",
  description:
    "Selected product design case studies across healthcare, SaaS, proptech, and enterprise strategy."
};

export default function CaseStudyPage() {
  return <CaseStudyIndex cases={caseStudies} />;
}
