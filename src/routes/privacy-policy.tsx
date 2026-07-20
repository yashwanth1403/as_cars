import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/layout/SiteLayout";
import { BUSINESS_NAME, BUSINESS_ADDRESS, PHONE_DISPLAY, PHONE_E164 } from "@/config/business";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | AS Cars" },
      {
        name: "description",
        content:
          "Privacy Policy for AS Cars, describing how we collect, use, and protect information, including data shared via WhatsApp Business Platform.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.ascars.in/privacy-policy" }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <SiteLayout>
      <section className="bg-dark py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Privacy <span className="text-red">Policy</span>
          </h1>
          <p className="mt-2 text-white/50 text-sm">Last updated: July 20, 2026</p>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto text-text-body text-base leading-relaxed space-y-8">
          <p>
            {BUSINESS_NAME} ("we", "us", "our") operates a used car dealership in Hyderabad and
            communicates with customers over phone, WhatsApp, and this website. This Privacy Policy
            explains what information we collect and how we use it, including when you message us
            through the WhatsApp Business Platform.
          </p>

          <div>
            <h2 className="font-display font-bold text-xl text-text-heading mb-2">
              Information We Collect
            </h2>
            <p>
              When you contact us through WhatsApp, our website, or by phone, we may collect your
              name, phone number, WhatsApp profile information, and the content of your messages
              (such as questions about cars, appointment requests, or documents you choose to
              share).
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl text-text-heading mb-2">
              How We Use Your Information
            </h2>
            <p>We use this information only to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1.5">
              <li>Respond to your inquiries and share car details, pricing, and offers</li>
              <li>Schedule test drives, showroom visits, and follow-ups</li>
              <li>Send updates related to buying or selling a car with us</li>
              <li>Improve our customer service</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl text-text-heading mb-2">
              WhatsApp Business Platform
            </h2>
            <p>
              We use the WhatsApp Business Platform to send and receive messages with customers.
              Messages sent to us over WhatsApp are processed by Meta Platforms, Inc. in accordance
              with WhatsApp's own privacy policy and terms. We do not use your WhatsApp data for
              advertising, and we do not sell your information to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl text-text-heading mb-2">Data Sharing</h2>
            <p>
              We do not sell or rent your personal information. We only share it with service
              providers who help us operate (such as our messaging and hosting providers) and where
              required by law.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl text-text-heading mb-2">
              Data Retention
            </h2>
            <p>
              We retain conversation and contact information only as long as needed to assist you
              and for our business records, and delete it when it is no longer needed.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl text-text-heading mb-2">Your Choices</h2>
            <p>
              You can stop messaging us on WhatsApp at any time, and you may ask us to delete the
              information we hold about you by contacting us using the details below.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl text-text-heading mb-2">Contact Us</h2>
            <p>For any questions about this Privacy Policy or your data, contact us at:</p>
            <p className="mt-2">
              {BUSINESS_NAME}
              <br />
              {BUSINESS_ADDRESS}
              <br />
              Phone:{" "}
              <a href={`tel:${PHONE_E164}`} className="text-red hover:underline">
                {PHONE_DISPLAY}
              </a>
              <br />
              Or visit our{" "}
              <Link to="/contact" className="text-red hover:underline">
                Contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
