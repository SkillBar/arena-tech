"use client";

import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { CustomCursor } from "@/components/CustomCursor";
import { FeaturedWorks } from "@/components/FeaturedWorks";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Loader } from "@/components/Loader";
import { PageMotion } from "@/components/PageMotion";

export function HomePage() {
  return (
    <>
      <Loader />
      <Header />
      <PageMotion home />
      <div className="tg-magic-scroll-bg" aria-hidden="true" />
      <main className="canvas-page">
        <Hero />
        <About />
        <FeaturedWorks />
        <CTA />
      </main>
      <CustomCursor />
    </>
  );
}
