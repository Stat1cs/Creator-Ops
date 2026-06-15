import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Service — Creator Ops",
  description:
    "Terms governing use of the Creator Ops website and services, including our founding creator program.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      description="Terms that apply when you use creator-ops.site and engage with Creator Ops services."
    >
      <LegalSection title="1. Agreement">
        <p>
          By accessing{" "}
          <a href="https://creator-ops.site" className="text-accent hover:underline">
            creator-ops.site
          </a>{" "}
          or submitting an application, you agree to these Terms of Service (&quot;Terms&quot;).
          If you do not agree, do not use the website or our services. These Terms apply to
          website visitors, applicants, and clients unless a separate signed agreement
          expressly overrides them.
        </p>
      </LegalSection>

      <LegalSection title="2. About our services">
        <p>
          Creator Ops designs, builds, and operates branded AI platforms for coaches, course
          creators, and educators. Services may include AI assistants trained on client
          content, deployment across channels (such as web embeds, Discord, or WhatsApp),
          subscription infrastructure, and ongoing platform operations. Specific deliverables,
          timelines, and pricing are defined in a separate proposal, statement of work, or
          client agreement.
        </p>
      </LegalSection>

      <LegalSection title="3. Website use">
        <p>You agree to use this website lawfully and not to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Attempt unauthorized access to our systems or data</li>
          <li>Interfere with site security, performance, or availability</li>
          <li>Scrape, harvest, or automate access in a way that burdens our infrastructure</li>
          <li>Submit false, misleading, or malicious information through our forms</li>
          <li>Use the site for spam, harassment, or unlawful purposes</li>
        </ul>
        <p>
          We may suspend or restrict access if we reasonably believe these Terms have been
          violated.
        </p>
      </LegalSection>

      <LegalSection title="4. Applications and founding program">
        <p>
          Submitting a founding program or inquiry form does not guarantee acceptance,
          partnership, or any specific commercial terms. Founding program benefits described
          on our website — including $0 setup fees or revenue-share arrangements — apply only
          to accepted founding creators and are subject to a separate written agreement.
          We may accept, decline, or waitlist applicants at our sole discretion.
        </p>
      </LegalSection>

      <LegalSection title="5. Client content and responsibilities">
        <p>
          Clients and applicants are responsible for ensuring they have the rights to any
          content, materials, trademarks, or data they provide for training or deployment of
          an AI platform. You represent that your content does not infringe third-party
          rights and complies with applicable laws. You are responsible for how your deployed
          platform is used with your audience, including disclosures required in your industry.
        </p>
      </LegalSection>

      <LegalSection title="6. Intellectual property">
        <p>
          The Creator Ops website, brand, templates, underlying technology, and pre-existing
          materials remain our intellectual property unless otherwise agreed in writing.
          Client-specific deliverables, branding, and content ownership will be defined in
          your client agreement. Nothing in these Terms transfers ownership of our core
          platform, methods, or tooling to visitors or applicants.
        </p>
      </LegalSection>

      <LegalSection title="7. AI disclaimers">
        <p>
          AI-generated outputs may be inaccurate, incomplete, or inappropriate in certain
          contexts. Platforms we build are tools to extend a creator&apos;s knowledge and
          voice — they are not a substitute for professional advice (including medical,
          legal, financial, or therapeutic advice) unless explicitly configured and licensed
          for that purpose. Clients are responsible for setting appropriate use policies
          and reviewing high-risk use cases.
        </p>
      </LegalSection>

      <LegalSection title="8. Fees and payment">
        <p>
          Standard pricing shown on our website is indicative and may change. Binding fees,
          setup costs, revenue-share percentages, billing intervals, and payment methods are
          specified in your client agreement. Late payments may pause work or platform access
          as described in that agreement. Applicant forms do not create a billing relationship.
        </p>
      </LegalSection>

      <LegalSection title="9. Confidentiality">
        <p>
          Information shared during sales conversations, applications, or discovery may be
          treated as confidential by mutual understanding, but no formal confidentiality
          obligation arises from website use alone. Formal confidentiality terms apply when
          set out in a signed agreement.
        </p>
      </LegalSection>

      <LegalSection title="10. Disclaimer of warranties">
        <p>
          THE WEBSITE AND ANY PRE-SALES MATERIALS ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
          AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
          INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          AND NON-INFRINGEMENT. WE DO NOT WARRANT UNINTERRUPTED OR ERROR-FREE WEBSITE
          OPERATION.
        </p>
      </LegalSection>

      <LegalSection title="11. Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, CREATOR OPS AND ITS FOUNDERS, EMPLOYEES,
          AND CONTRACTORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR
          GOODWILL, ARISING FROM YOUR USE OF THE WEBSITE OR RELIANCE ON PRE-SALES
          INFORMATION.
        </p>
        <p>
          OUR TOTAL LIABILITY FOR CLAIMS RELATING TO THE WEBSITE OR APPLICATION PROCESS WILL
          NOT EXCEED ONE HUNDRED U.S. DOLLARS (USD $100), EXCEPT WHERE LIABILITY CANNOT BE
          LIMITED BY APPLICABLE LAW.
        </p>
      </LegalSection>

      <LegalSection title="12. Indemnification">
        <p>
          You agree to indemnify and hold harmless Creator Ops from claims, damages, and
          expenses (including reasonable legal fees) arising from your misuse of the website,
          your content, or your violation of these Terms or applicable law.
        </p>
      </LegalSection>

      <LegalSection title="13. Termination">
        <p>
          We may modify or discontinue the website or any program at any time. These Terms
          remain in effect while you use the site. Provisions that by nature should survive
          termination — including intellectual property, disclaimers, limitations of
          liability, and indemnification — will survive.
        </p>
      </LegalSection>

      <LegalSection title="14. Governing law">
        <p>
          These Terms are governed by the laws of the United States and the State of Delaware,
          without regard to conflict-of-law principles, except where mandatory consumer
          protection laws in your jurisdiction provide otherwise. Disputes will be resolved
          in the courts located in Delaware, unless we agree in writing to an alternative
          forum.
        </p>
      </LegalSection>

      <LegalSection title="15. Changes">
        <p>
          We may update these Terms from time to time. Continued use of the website after
          changes are posted constitutes acceptance of the revised Terms. The date at the top
          of this page indicates the latest version.
        </p>
      </LegalSection>

      <LegalSection title="16. Contact">
        <p>
          Questions about these Terms:{" "}
          <a href="mailto:hello@creator-ops.site" className="text-accent hover:underline">
            hello@creator-ops.site
          </a>
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
