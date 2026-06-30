import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { signInAdmin } from "@/lib/supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BUSINESS_NAME } from "@/config/business";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: `Admin Login | ${BUSINESS_NAME}` },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.documentElement.classList.add("admin-theme");
    return () => document.documentElement.classList.remove("admin-theme");
  }, []);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signInAdmin(email, password);
      navigate({ to: "/admin" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-theme relative flex min-h-screen items-center justify-center overflow-hidden bg-primary p-4">
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center text-primary-foreground">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <img src="/logo.png" alt={BUSINESS_NAME} className="h-20 w-auto object-contain" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
            {BUSINESS_NAME}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-white">Dealer Console</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-white/10 bg-card p-6 shadow-2xl sm:p-8"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Sign in to manage inventory</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-xl"
              required
            />
          </div>
          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-secondary font-bold text-secondary-foreground hover:bg-secondary/90"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Enter Dashboard"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
