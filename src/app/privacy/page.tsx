import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { mailto, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy | Acorn Electric",
  description: "How the Acorn Electric website handles service requests, job applications, photos, PDFs and resumes.",
  path: "/privacy",
  noindex: true,
});

/**
 * Plain-language notice describing what the site ACTUALLY does. Every
 * statement here was checked against the code (Nov 2026):
 *   - Forms: src/lib/forms/handlers.ts + mail.ts. Fields and files are checked
 *     in memory and emailed through Resend. Nothing is written to disk or a
 *     database. Logs carry status codes and counts only.
 *   - Rate limit: src/lib/forms/guard.ts keeps IP addresses in memory for up
 *     to 10 minutes; never saved.
 *   - Photos are re-encoded in the browser (src/lib/forms/compress-image.ts).
 *   - No analytics, ad pixels or cookies set by the site; fonts and images
 *     are self-hosted.
 * If any of that changes (analytics, a CRM, file storage), update this page in
 * the same change. Business-policy lines (selling, retention) are Acorn's
 * statements; see docs/client-facts-checklist.md for what Eric still confirms.
 * Not legal advice.
 */
const UPDATED = "November 13, 2026";

export default function PrivacyPage() {
  return (
    <section className="bg-mist-50">
      <div className="container-x py-12 lg:py-16">
        <Breadcrumbs tone="light" trail={[{ name: "Privacy", path: "/privacy" }]} />
        <div className="mt-8 max-w-2xl">
          <h1 className="text-5xl font-bold">Privacy</h1>
          <p className="mt-4 text-sm text-ink-mute">Last updated {UPDATED}</p>
          <div className="prose-acorn mt-8 space-y-8">
            <section aria-labelledby="pv-forms">
              <h2 id="pv-forms" className="text-2xl text-ink">What you send us</h2>
              <p className="mt-3">
                The service request form asks for your name, how to reach you, your service address or ZIP code and a
                description of the work. You can also attach photos (JPG, PNG or WebP) and PDFs such as plans or spec
                sheets. The careers form asks about your experience and certificate, and lets you attach a resume.
              </p>
              <p className="mt-3">
                We use this only to respond to your request or consider your application.
              </p>
            </section>

            <section aria-labelledby="pv-delivery">
              <h2 id="pv-delivery" className="text-2xl text-ink">How it reaches us</h2>
              <p className="mt-3">
                When you press send, the website checks your entries and files, then emails them, with any attachments,
                to {site.name}&apos;s business inbox. The website itself doesn&apos;t save your form or files to a
                database or file storage.
              </p>
              <p className="mt-3">
                The email is sent through Resend, an email delivery service, which handles the message to deliver it and
                keeps its own delivery records under its policies. Once it arrives, it&apos;s kept in our business email
                like any other message from a customer or applicant.
              </p>
              <p className="mt-3">
                To keep uploads small, the form resizes photos in your browser before sending. That usually removes
                hidden photo details such as GPS location. PDFs and resumes are sent exactly as you attach them.
              </p>
            </section>

            <section aria-labelledby="pv-tech">
              <h2 id="pv-tech" className="text-2xl text-ink">Technical information</h2>
              <p className="mt-3">
                The site is hosted on Vercel. Like most web hosts, Vercel processes technical details such as your IP
                address, browser type and the pages requested, to deliver the site and keep it secure. Our form code
                briefly holds your IP address in memory to limit repeated submissions; it isn&apos;t saved. Error
                logs record whether a message was sent, never what you wrote.
              </p>
              <p className="mt-3">
                This site doesn&apos;t use analytics, advertising trackers or its own cookies. If that changes,
                we&apos;ll update this page first. Links to Google (for reviews and our business profile) take you to
                Google&apos;s site, where Google&apos;s privacy policy applies.
              </p>
            </section>

            <section aria-labelledby="pv-choices">
              <h2 id="pv-choices" className="text-2xl text-ink">Your choices</h2>
              <p className="mt-3">
                We don&apos;t sell your information or share it for marketing. You don&apos;t have to use the form:
                you can call {site.phone.value.display} instead. To ask what we have from you, or to have your messages
                and files deleted from our email, write to{" "}
                <a href={mailto} className="underline">
                  {site.email.value}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
