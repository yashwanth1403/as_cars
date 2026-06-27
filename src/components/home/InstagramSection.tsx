import { useEffect } from "react";
import { Instagram, ExternalLink } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/as_cars_hyd/";
const HANDLE = "@as_cars_hyd";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export default function InstagramSection() {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-400/10 border border-pink-200 text-pink-600 text-xs font-display font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-4">
            <Instagram size={13} />
            Follow Us on Instagram
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-heading mt-2">
            We're on Instagram
          </h2>
          <p className="mt-3 text-text-body text-base max-w-md mx-auto">
            Latest arrivals, behind-the-scenes, and happy customer moments.
          </p>

          {/* Follower stat */}
          <div className="mt-5 inline-flex items-center gap-3 bg-gradient-to-r from-pink-50 via-purple-50 to-orange-50 border border-pink-100 rounded-2xl px-6 py-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
              style={{ background: "linear-gradient(135deg, #f58529, #dd2a7b, #515bd4)" }}>
              <Instagram size={18} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-display font-extrabold text-2xl text-text-heading leading-none">120K+</div>
              <div className="text-text-muted text-xs font-medium mt-0.5">Instagram Followers</div>
            </div>
          </div>
        </div>

        {/* Embedded posts */}
        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
            {[
              "https://www.instagram.com/p/DR4qhvxkwtZ/",
              "https://www.instagram.com/p/DVXulx_E3ry/",
            ].map((url) => (
              <blockquote
                key={url}
                className="instagram-media !m-0"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: "0",
                  borderRadius: "12px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  width: "100%",
                  minWidth: "0",
                  padding: "0",
                }}
              />
            ))}</div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display font-bold text-sm px-6 py-3 rounded-xl text-white hover:opacity-90 transition-opacity"
            style={{
              background:
                "linear-gradient(90deg, #f58529 0%, #dd2a7b 50%, #515bd4 100%)",
            }}
          >
            <Instagram size={16} />
            Follow {HANDLE}
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
