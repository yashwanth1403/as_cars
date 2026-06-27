import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Buy Cars", to: "/cars" },
  { label: "Sell Your Car", to: "/sell-car" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progressOpacity = useTransform(scrollY, [0, 80, 120], [0, 0, 1]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      <motion.div
        style={{
          scaleX,
          opacity: progressOpacity,
          transformOrigin: "left",
          background: "linear-gradient(to right, #E41919, #F59090)",
        }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[100]"
      />

      <motion.header
        initial={false}
        animate={{
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.10)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="sticky top-0 sm:top-[32px] inset-x-0 z-40 bg-black border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px] lg:h-[80px]">
          <Logo variant="light" size="md" />

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => {
              const active = isActive(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative font-display text-sm tracking-wide py-1 transition-colors duration-150 ${
                    active
                      ? "text-red font-semibold"
                      : "text-white/70 hover:text-white font-medium"
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-[6px] h-[2px] bg-red rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919392583393"
              className="hidden xl:flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Phone size={15} className="text-red" />
              +91 93925 83393
            </a>
            <Link
              to="/sell-car"
              className="hidden lg:inline-flex border border-red text-red text-sm font-display font-semibold px-4 py-2 rounded-lg hover:bg-red-light transition-colors duration-150"
            >
              Sell Car
            </Link>
            <Link
              to="/cars"
              className="bg-red text-white font-display font-semibold text-xs lg:text-sm px-3 lg:px-5 py-1.5 lg:py-2.5 rounded-lg shadow-red-glow hover:bg-red-dark hover:scale-[1.02] transition-all duration-150"
            >
              Browse Cars
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden ml-1 text-white"
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-white border-l border-border w-[300px] p-0 [&>button]:hidden flex flex-col"
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <Logo variant="light" size="sm" />
                  <SheetClose asChild>
                    <button className="text-text-muted" aria-label="Close menu">
                      <X size={22} />
                    </button>
                  </SheetClose>
                </div>

                <div className="px-5 pt-8 flex-1">
                  <p className="text-[10px] font-display tracking-[0.2em] text-text-muted uppercase mb-4">
                    Menu
                  </p>
                  <motion.nav
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                    className="flex flex-col"
                  >
                    {navLinks.map((l) => {
                      const active = isActive(l.to);
                      return (
                        <motion.div
                          key={l.to}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            show: { opacity: 1, x: 0 },
                          }}
                        >
                          <Link
                            to={l.to}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-between py-3.5 border-b border-border font-display font-semibold text-base transition-colors ${
                              active
                                ? "text-red border-l-[3px] border-l-red pl-3"
                                : "text-text-heading"
                            }`}
                          >
                            <span>{l.label}</span>
                            {active && <ChevronRight size={18} className="text-red" />}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.nav>
                </div>

                <div className="px-5 mt-auto pt-6 pb-6 border-t border-border space-y-3">
                  <a
                    href="tel:+919392583393"
                    className="flex items-center gap-2 text-red font-semibold text-sm"
                  >
                    <Phone size={16} className="text-red" /> +91 93925 83393
                  </a>
                  <a
                    href="https://wa.me/919392583393"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb957] text-white font-display font-semibold text-sm py-3 rounded-lg transition-colors"
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                  <p className="text-text-muted text-xs text-center mt-3">
                    Mon–Sat · 9 AM – 7 PM
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </>
  );
}
