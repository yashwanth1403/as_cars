import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/layout/SiteLayout";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactCards from "@/components/contact/ContactCards";
import ContactForm from "@/components/contact/ContactForm";
import ShowroomMap from "@/components/contact/ShowroomMap";
import ContactCTA from "@/components/contact/ContactCTA";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AS Cars | Used Car Dealer Hyderabad | +91 93925 83393" },
      {
        name: "description",
        content:
          "Contact AS Cars Hyderabad. Call, WhatsApp, or visit our showroom in Hitech City. We're open Mon–Sat 10AM–8PM. Enquire about cars, finance, or sell your vehicle.",
      },
      {
        name: "keywords",
        content:
          "contact AS Cars, AS Cars phone number, used car dealer contact Hyderabad, AS Cars Hitech City address, car dealer WhatsApp Hyderabad",
      },
      { property: "og:title", content: "Contact AS Cars | Used Car Dealer Hyderabad" },
      { property: "og:description", content: "Call, WhatsApp, or visit our Hitech City showroom." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          name: "AS Cars",
          telephone: "+919392583393",
          openingHours: ["Mo-Sa 10:00-20:00", "Su 11:00-18:00"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Gopal Nagar, Hafeezpet Rd",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "500085",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <ContactHeader />
      <ContactCards />
      <section className="bg-surface py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ContactForm />
          <ShowroomMap />
        </div>
      </section>
      <ContactCTA />
    </SiteLayout>
  );
}
