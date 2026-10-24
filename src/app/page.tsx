import { AreasBlock, CareersTeaser } from "@/components/home/areas-and-careers";
import { FeaturedServices } from "@/components/home/featured-services";
import { Hero } from "@/components/home/hero";
import { Reviews } from "@/components/home/reviews";
import { CtaSection } from "@/components/sections/cta-section";
import { Process } from "@/components/sections/process";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Acorn Electric | Electrician in Spokane, WA",
  description:
    "Electrical repairs, upgrades and installations for Spokane homes and businesses. Explore common services or tell Acorn Electric about your project.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <Process />
      <Reviews />
      <AreasBlock />
      <CareersTeaser />
      <CtaSection
        source="/"
        title={
          <>
            Tell us what&apos;s going on. <span className="text-lit">We&apos;ll take it from there.</span>
          </>
        }
        body="A few details and, if you can, a photo of your panel. We'll come back to you to talk it through."
      />
    </>
  );
}
