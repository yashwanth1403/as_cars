import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/layout/SiteLayout";
import HeroSection from "@/components/home/HeroSection";

import FeaturedCarsSection from "@/components/home/FeaturedCarsSection";
import BrowseByBrandSection from "@/components/home/BrowseByBrandSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import InstagramSection from "@/components/home/InstagramSection";
import LocationSection from "@/components/home/LocationSection";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "AS Cars",
  telephone: "+919392583393",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hitech City, Gopal Nagar, Hafeezpet Rd",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500085",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 09:00-19:00",
  priceRange: "₹₹",
  description:
    "Hyderabad's most trusted pre-owned car dealership offering verified cars with easy finance options.",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AS Cars | Buy & Sell Certified Pre-Owned Cars in Hyderabad" },
      {
        name: "description",
        content:
          "AS Cars is Hyderabad's most trusted pre-owned car dealership in Hitech City. Browse 100+ verified cars — Maruti, Hyundai, Honda, Toyota & more. Easy EMI, test drives, doorstep delivery.",
      },
      {
        name: "keywords",
        content:
          "used cars Hyderabad, second hand cars Hyderabad, pre-owned cars Hitech City, buy used car Hyderabad, AS Cars, car dealership Hyderabad",
      },
      { property: "og:title", content: "AS Cars | Buy & Sell Certified Pre-Owned Cars in Hyderabad" },
      {
        property: "og:description",
        content:
          "Hyderabad's most trusted pre-owned car dealership in Hitech City. 100+ verified cars, easy EMI, doorstep delivery.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSONLD),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <HeroSection />

      <FeaturedCarsSection />
      <BrowseByBrandSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <InstagramSection />
      <LocationSection />
    </SiteLayout>
  );
}
