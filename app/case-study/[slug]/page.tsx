import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { CaseStudyDetail } from "@/components/CaseStudyDetail";
import { AiTradeCaseStudy } from "@/components/AiTradeCaseStudy";
import { MusicGenCaseStudy } from "@/components/MusicGenCaseStudy";

type CaseStudyDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug
  }));
}

export async function generateMetadata({
  params
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case Study - Nudge"
    };
  }

  return {
    title: `${caseStudy.title} - Nudge Case Study`,
    description: caseStudy.summary
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  if (caseStudy.variant === "musicgen-presentation") {
    return <MusicGenCaseStudy caseStudy={caseStudy} />;
  }

  if (caseStudy.variant === "aitrade-presentation") {
    return <AiTradeCaseStudy caseStudy={caseStudy} />;
  }

  return <CaseStudyDetail caseStudy={caseStudy} />;
}
