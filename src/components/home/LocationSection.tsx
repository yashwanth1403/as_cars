import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="bg-white py-20 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-red-light text-red text-xs font-display font-bold tracking-[0.18em] px-3 py-1 rounded-full uppercase mb-4">
            Find Us
          </span>
          <h2 className="font-display font-extrabold text-4xl text-text-heading">
            Visit Our Showroom
          </h2>
          <p className="text-text-body mt-3">
            Located in the heart of Hyderabad&apos;s tech hub.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4 bg-white rounded-xl border border-border p-4 shadow-card">
              <MapPin size={20} className="text-red mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-sm text-text-heading">
                  Showroom Address
                </h3>
                <p className="text-text-body text-sm leading-relaxed mt-1">
                  Hitech City, Gopal Nagar, Hafeezpet Rd, near Masjid-e-Ghousia,
                  Hyderabad – 500085
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white rounded-xl border border-border p-4 shadow-card">
              <Phone size={20} className="text-red mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-sm text-text-heading">
                  Call Us
                </h3>
                <a
                  href="tel:+919392583393"
                  className="block text-text-body text-sm mt-1 hover:text-red transition-colors"
                >
                  +91 93925 83393
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white rounded-xl border border-border p-4 shadow-card">
              <Clock size={20} className="text-red mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-sm text-text-heading">
                  Working Hours
                </h3>
                <p className="text-text-body text-sm mt-1">
                  Monday to Saturday: 9:00 AM – 7:00 PM
                </p>
                <p className="text-text-muted text-xs mt-0.5">
                  Sundays by appointment only
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/919392583393"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-[#25D366] text-white font-display font-semibold px-7 py-3.5 rounded-xl hover:bg-[#1EA855] transition-colors shadow-md"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </motion.div>

        {/* Right map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl overflow-hidden border border-border shadow-card aspect-[4/3] w-full"
        >
          <iframe
            title="AS Cars Showroom Location"
            src="https://maps.google.com/maps?q=AS%20cars,%20hitech%20city,%20Hyderabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
