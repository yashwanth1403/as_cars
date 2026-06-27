import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/layout/SiteLayout";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import TrustFeatures from "@/components/about/TrustFeatures";
import BusinessHighlights from "@/components/about/BusinessHighlights";
import AboutCTA from "@/components/about/AboutCTA";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AS Cars | Trusted Used Car Dealer in Hyderabad" },
      {
        name: "description",
        content:
          "AS Cars is Hyderabad's trusted used car dealership in Hitech City. Transparent pricing, verified vehicles, easy finance, and RC transfer support. 500+ happy customers.",
      },
      {
        name: "keywords",
        content:
          "AS Cars Hyderabad, used car dealer Hitech City, about AS Cars, trusted car dealer Hyderabad",
      },
      { property: "og:title", content: "About AS Cars | Trusted Used Car Dealer in Hyderabad" },
      { property: "og:description", content: "Hyderabad's trusted used car dealership in Hitech City." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          name: "AS Cars",
          url: "https://ascars.in",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Gopal Nagar, Hafeezpet Rd",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "500085",
            addressCountry: "IN",
          },
          telephone: "+919392583393",
          description: "Hyderabad's trusted used car dealership",
        }),
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <AboutHero />
      <OurStory />
      <TrustFeatures />
      <BusinessHighlights />
      <AboutCTA />
    </SiteLayout>
  );
}
