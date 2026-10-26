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
    "Electrical repairs, upgrades and installations for Spokane homes and businesses. Call or send a request to Acorn Electric.",
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
            Tell us about <span className="text-lit">your project.</span>
          </>
        }
        body="A few details and a photo or two is plenty. We'll come back to you to talk it through."
      />
    </>
  );
}
