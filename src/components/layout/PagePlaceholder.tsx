import { motion } from "framer-motion";

interface Props {
  title: string;
  description?: string;
  subtitle?: string;
  badge?: string;
}

export default function PagePlaceholder({ title, description, subtitle, badge }: Props) {
  const sub = subtitle ?? description ?? "";
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-surface overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1A1A1A 0 1px, transparent 1px 14px)",
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="relative z-10 text-center max-w-lg px-6"
      >
        {badge && (
          <motion.span
            variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center bg-red-light text-red border border-red/20 text-xs font-display font-bold tracking-[0.18em] px-3 py-1 rounded-full uppercase"
          >
            {badge}
          </motion.span>
        )}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-display font-extrabold text-4xl sm:text-5xl text-text-heading mt-5 leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-text-body text-lg mt-4 leading-relaxed"
        >
          {sub}
        </motion.p>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-12 h-1 bg-red rounded-full mx-auto mt-7"
        />
        <motion.p
          variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-text-muted text-sm mt-4 italic"
        >
          Full content coming in next build phase
        </motion.p>
      </motion.div>
    </section>
  );
}
