import { Link } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  ChevronRight,
} from "lucide-react";
import Logo from "./Logo";

const links = [
  { label: "Home", to: "/" },
  { label: "Buy Cars", to: "/cars" },
  { label: "Sell Your Car", to: "/sell-car" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
] as const;

const trustBadges = ["✓ 200+ Cars Sold", "✓ 5★ Rated", "✓ Est. 2018"];

export default function Footer() {
  return (
    <footer className="bg-dark border-t-2 border-red pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Logo variant="dark" size="lg" />
            <p className="mt-4 text-white/55 text-sm leading-relaxed max-w-[210px]">
              Hyderabad's Most Trusted Pre-Owned Car Dealership
            </p>
            <div className="mt-5 flex gap-2 flex-wrap">
              {trustBadges.map((label) => (
                <span
                  key={label}
                  className="bg-dark-2 border border-white/10 text-white/70 text-xs px-2.5 py-1 rounded-full"
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-dark-2 border border-dark-border text-white/50 flex items-center justify-center hover:border-red hover:text-red transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/as_cars_hyd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-dark-2 border border-dark-border text-white/50 flex items-center justify-center hover:border-pink-500 hover:text-pink-400 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-dark-2 border border-dark-border text-white/50 flex items-center justify-center hover:border-red hover:text-red transition-colors"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.2em] text-red uppercase mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/55 text-sm hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight size={11} className="text-red/70" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.2em] text-red uppercase mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-2.5 text-white/55 leading-relaxed">
                <MapPin size={16} className="mt-0.5 shrink-0 text-red" />
                <span>Hitech City, Gopal Nagar, Hyderabad 500085</span>
              </li>
              <li>
                <a
                  href="tel:+919392583393"
                  className="flex gap-2.5 text-white font-semibold hover:text-red transition-colors"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-red" />
                  +91 93925 83393
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919392583393"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2.5 text-[#25D366] font-semibold hover:opacity-80 transition-opacity"
                >
                  <MessageCircle size={16} className="mt-0.5 shrink-0" />
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex gap-2.5 text-white/55">
                <Clock size={16} className="mt-0.5 shrink-0 text-red" />
                Mon – Sat: 9 AM – 7 PM
              </li>
            </ul>
          </div>

          {/* CTA Card — solid red */}
          <div className="bg-red rounded-xl p-6">
            <p className="text-white/70 text-[10px] font-display font-bold tracking-wider">
              READY TO BUY?
            </p>
            <h4 className="text-white font-display font-bold text-lg mt-1.5 leading-tight">
              Find Your Perfect Car Today
            </h4>
            <p className="text-white/70 text-sm mt-2 leading-relaxed">
              Verified pre-owned cars. Easy EMI. Zero hidden costs.
            </p>
            <Link
              to="/cars"
              className="block text-center bg-white text-red w-full mt-5 py-2.5 rounded-lg font-display font-bold text-sm hover:bg-white/90 transition-colors"
            >
              Browse Inventory →
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white/30 text-xs">© 2025 AS Cars. All rights reserved.</p>
          <div className="flex gap-3 text-white/30 text-xs">
            <Link to="/privacy-policy" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <a href="#" className="hover:text-white/60 transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
