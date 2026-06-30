import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/layout/SiteLayout";
import SellHeroSection from "@/components/sell/SellHeroSection";
import HowItWorksSection from "@/components/sell/HowItWorksSection";
import SellFormSection from "@/components/sell/SellFormSection";
import WhySellSection from "@/components/sell/WhySellSection";
import FAQSection from "@/components/sell/FAQSection";

export const Route = createFileRoute("/sell-car")({
  head: () => ({
    meta: [
      { title: "Sell Your Used Car in Hyderabad | Get Best Price — AS Cars" },
      {
        name: "description",
        content:
          "Sell your used car in Hyderabad at the best price. AS Cars offers free instant valuation, zero paperwork hassle, and same-day payment. Any brand, any model. Call +91 93925 83393.",
      },
      {
        name: "keywords",
        content:
          "sell used car Hyderabad, car valuation Hyderabad, sell second hand car Hitech City, sell my car Hyderabad, instant car valuation AS Cars",
      },
      { property: "og:title", content: "Sell Your Used Car in Hyderabad — AS Cars" },
      {
        property: "og:description",
        content:
          "Free instant valuation. Zero paperwork. Same-day payment. Trusted by 500+ Hyderabad car owners.",
      },
      { property: "og:url", content: "https://ascars.in/sell-car" },
      { property: "og:image", content: "https://ascars.in/hero-family.png" },
      { name: "twitter:title", content: "Sell Your Used Car in Hyderabad — AS Cars" },
      { name: "twitter:description", content: "Free instant valuation. Zero paperwork. Same-day payment. Trusted by 500+ Hyderabad car owners." },
    ],
    links: [{ rel: "canonical", href: "https://ascars.in/sell-car" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Sell Your Car — AS Cars",
          provider: { "@type": "AutoDealer", name: "AS Cars" },
          areaServed: "Hyderabad",
          description:
            "Free car valuation and instant sale service for used vehicles in Hyderabad",
        }),
      },
    ],
  }),
  component: SellCar,
});

function SellCar() {
  return (
    <SiteLayout>
      <SellHeroSection />
      <HowItWorksSection />
      <SellFormSection />
      <WhySellSection />
      <FAQSection />
    </SiteLayout>
  );
}
