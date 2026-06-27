import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TopBar from "./TopBar";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-text-heading overflow-x-hidden w-full">
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      <AnimatePresence>
        {showTop && (
          <motion.button
            key="totop"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full bg-white border border-border shadow-card flex items-center justify-center hover:border-red transition-colors"
          >
            <ChevronUp size={20} className="text-red" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/919392583393"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        className="group fixed bottom-6 right-6 z-50 flex items-center justify-center"
      >
        {/* Subtle pulse ring */}
        <motion.span
          className="absolute w-16 h-16 rounded-full bg-[#25D366]/25"
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Button */}
        <span className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-green-900/30 group-hover:scale-110 transition-transform">
          <svg viewBox="0 0 32 32" className="w-8 h-8" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.563.658 4.972 1.806 7.07L2 30l7.13-1.869A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm7.07 19.77c-.295.833-1.46 1.525-2.4 1.726-.638.136-1.472.244-4.28-.92-3.593-1.468-5.908-5.118-6.085-5.356-.172-.239-1.437-1.912-1.437-3.648s.905-2.588 1.245-2.943c.295-.304.782-.443 1.25-.443.151 0 .287.008.409.014.358.016.537.037.774.6.295.705 1.012 2.44 1.099 2.617.088.177.176.414.052.657-.117.249-.22.36-.397.564-.177.204-.345.36-.522.58-.162.196-.346.405-.14.762.205.35.913 1.503 1.958 2.433 1.344 1.2 2.438 1.578 2.836 1.735.295.117.644.088.856-.138.268-.29.6-.769.938-1.244.24-.337.544-.38.864-.26.326.112 2.052.968 2.404 1.144.352.177.587.264.673.41.085.147.085.849-.21 1.682z"/>
          </svg>
        </span>
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 bg-dark text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
