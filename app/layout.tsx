import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nudge - Premium Portfolio Template",
  description:
    "Nudge is a bold, personality-driven portfolio template for product designers who want to stand out. Built for storytelling, not just showcasing."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
