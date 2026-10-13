import { AreasBlock, CareersTeaser } from "@/components/home/areas-and-careers";
import { FeaturedServices } from "@/components/home/featured-services";
import { Hero } from "@/components/home/hero";
import { Principles } from "@/components/home/principles";
import { Reviews } from "@/components/home/reviews";
import { Story } from "@/components/home/story";
import { CtaSection } from "@/components/sections/cta-section";
import { Process } from "@/components/sections/process";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Acorn Electric | Residential Electrician in Spokane, WA",
  description:
    "Spokane residential electrician: EV chargers, panel upgrades, subpanels, hot tub wiring, lighting and repairs. Permitted, inspected, explained plainly.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <FeaturedServices />
      <Principles />
      <Reviews />
      <Process />
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
