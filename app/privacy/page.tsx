import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy — Creator Ops",
  description:
    "How Creator Ops collects, uses, and protects personal information when you visit our website or apply to our programs.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      description="How we handle your information when you use creator-ops.site and apply to Creator Ops programs."
    >
      <LegalSection title="1. Who we are">
        <p>
          Creator Ops (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates{" "}
          <a href="https://creator-ops.site" className="text-accent hover:underline">
            creator-ops.site
          </a>{" "}
          and provides branded AI platform services for coaches, course creators, and
          educators. For privacy-related questions, contact us at{" "}
          <a href="mailto:hello@creator-ops.site" className="text-accent hover:underline">
            hello@creator-ops.site
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>We may collect the following information depending on how you interact with us:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-ink">Contact details</strong> — name and email address
            when you register interest, submit an application, or contact us.
          </li>
          <li>
            <strong className="text-ink">Application information</strong> — audience size,
            business context, and messages you provide in founding or inquiry forms.
          </li>
          <li>
            <strong className="text-ink">Technical data</strong> — IP address, browser type,
            device information, pages visited, and approximate usage data collected through
            analytics tools.
          </li>
          <li>
            <strong className="text-ink">Communications</strong> — content of emails or
            messages you send us, including replies to automated confirmations.
          </li>
        </ul>
        <p>
          We do not intentionally collect sensitive personal data through this website. Please
          do not submit payment card numbers or government ID numbers through our forms.
        </p>
      </LegalSection>

      <LegalSection title="3. How we use your information">
        <p>We use personal information to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Review and respond to founding program applications and inquiries</li>
          <li>Send program updates, confirmations, and service-related emails</li>
          <li>Operate, maintain, and improve our website and services</li>
          <li>Understand aggregate traffic and usage patterns</li>
          <li>Protect against abuse, fraud, and security incidents</li>
          <li>Comply with legal obligations</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Legal bases for processing">
        <p>
          Where applicable under data protection laws (including GDPR), we process personal
          data based on: your consent (for example, when you submit a form), our legitimate
          interests in operating and improving our business, and steps taken at your request
          before entering into a service agreement.
        </p>
      </LegalSection>

      <LegalSection title="5. How we share information">
        <p>
          We do not sell your personal information. We may share data with trusted service
          providers who help us operate our website and communications, including:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-ink">Vercel</strong> — website hosting and infrastructure
          </li>
          <li>
            <strong className="text-ink">Resend</strong> — transactional email delivery
          </li>
          <li>
            <strong className="text-ink">Vercel Analytics</strong> — privacy-focused usage
            analytics
          </li>
        </ul>
        <p>
          These providers process data on our behalf and are permitted to use it only to
          perform services for us. We may also disclose information if required by law or to
          protect our rights, users, or the public.
        </p>
      </LegalSection>

      <LegalSection title="6. Data retention">
        <p>
          We retain application and inquiry records for as long as needed to evaluate your
          request, maintain business records, and comply with legal obligations. Analytics
          data is retained according to our providers&apos; default retention settings. You
          may request deletion of your contact information where we are not required to keep
          it.
        </p>
      </LegalSection>

      <LegalSection title="7. Your rights">
        <p>
          Depending on your location, you may have the right to access, correct, delete, or
          restrict processing of your personal data, to object to certain processing, and to
          withdraw consent where processing is consent-based. You may also have the right to
          lodge a complaint with a supervisory authority.
        </p>
        <p>
          To exercise these rights, email{" "}
          <a href="mailto:hello@creator-ops.site" className="text-accent hover:underline">
            hello@creator-ops.site
          </a>
          . We may need to verify your identity before fulfilling a request.
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies and analytics">
        <p>
          Our website may use cookies and similar technologies for essential functionality
          and analytics. Vercel Analytics is designed to collect aggregated, privacy-friendly
          usage metrics without cross-site tracking. You can control cookies through your
          browser settings, though disabling them may affect site functionality.
        </p>
      </LegalSection>

      <LegalSection title="9. International transfers">
        <p>
          We and our service providers may process data in the United States and other
          countries. Where required, we take appropriate steps to protect personal data
          transferred internationally.
        </p>
      </LegalSection>

      <LegalSection title="10. Children&apos;s privacy">
        <p>
          Our services are directed at adult creators and business operators. We do not
          knowingly collect personal information from children under 16. If you believe a
          child has provided us data, contact us and we will delete it promptly.
        </p>
      </LegalSection>

      <LegalSection title="11. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot;
          date at the top of this page will reflect the latest version. Material changes may
          also be communicated by email or a notice on our website where appropriate.
        </p>
      </LegalSection>

      <LegalSection title="12. Contact">
        <p>
          Questions about this Privacy Policy or our data practices:{" "}
          <a href="mailto:hello@creator-ops.site" className="text-accent hover:underline">
            hello@creator-ops.site
          </a>
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
