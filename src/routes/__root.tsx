import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import SiteLayout from "@/components/layout/SiteLayout";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <section className="flex min-h-screen items-center justify-center bg-surface px-4">
        <NotFoundCard />
      </section>
    </SiteLayout>
  );
}

function NotFoundCard() {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-border p-12 text-center max-w-md animate-fade-up">
      <h1
        className="font-display font-extrabold text-[100px] leading-none"
        style={{
          background: "linear-gradient(135deg, #E41919 0%, #F59090 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        404
      </h1>
      <h2 className="font-display font-bold text-2xl text-text-heading mt-2">
        Oops! Page not found.
      </h2>
      <p className="text-text-body text-base mt-3 leading-relaxed">
        This page doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex gap-3 justify-center">
        <Link
          to="/"
          className="bg-red hover:bg-red-dark text-white px-6 py-2.5 rounded-lg font-display font-semibold transition-colors shadow-red-glow"
        >
          ← Back to Home
        </Link>
        <Link
          to="/cars"
          className="border border-red text-red hover:bg-red-light px-6 py-2.5 rounded-lg font-display font-semibold transition-colors"
        >
          Browse Cars
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-text-heading">This page didn't load</h1>
        <p className="mt-2 text-sm text-text-muted">
          Something went wrong. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-red hover:bg-red-dark text-white px-4 py-2 rounded-md text-sm font-display font-semibold"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border bg-white text-text-heading px-4 py-2 rounded-md text-sm font-display font-semibold hover:border-red"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}



export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AS Cars | Buy & Sell Certified Pre-Owned Cars in Hyderabad" },
      { name: "description", content: "AS Cars — Hyderabad's trusted pre-owned car dealership in Hitech City." },
      { name: "robots", content: "index,follow" },
      { name: "theme-color", content: "#E41919" },
      { property: "og:site_name", content: "AS Cars" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: "https://www.ascars.in/hero-family.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "AS Cars — Pre-owned car dealership in Hyderabad" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.ascars.in/hero-family.png" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/logo.png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
