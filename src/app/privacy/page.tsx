import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ReviewFlag } from "@/components/ui/review-flag";
import { mailto, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy | Acorn Electric",
  description: "How Acorn Electric handles the information you send through this website.",
  path: "/privacy",
  noindex: true,
});

/**
 * Plain-language notice describing what the site actually does. Not legal
 * advice; Acorn should have it reviewed, especially if analytics are added.
 */
export default function PrivacyPage() {
  return (
    <section className="bg-mist-50">
      <div className="container-x py-12 lg:py-16">
        <Breadcrumbs tone="light" trail={[{ name: "Privacy", path: "/privacy" }]} />
        <div className="mt-8 max-w-2xl">
          <h1 className="text-5xl font-bold">Privacy</h1>
          <p className="mt-4">
            <ReviewFlag>Acorn to review this notice</ReviewFlag>
          </p>
          <div className="prose-acorn mt-8 space-y-5">
            <p>
              When you send a service request or job application through this site, the details you enter (and any
              resume you attach) are emailed to {site.name} so we can respond. They aren&apos;t stored on this website
              and we don&apos;t sell or share them for marketing.
            </p>
            <p>
              Our email is delivered through a third-party email service, which processes the message only to deliver
              it.
            </p>
            <p>
              This site doesn&apos;t use advertising trackers. If we add analytics to understand how the site is used,
              we&apos;ll update this page first.
            </p>
            <p>
              To ask what information we have about you, or to have it deleted, email{" "}
              <a href={mailto} className="underline">
                {site.email.value}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
