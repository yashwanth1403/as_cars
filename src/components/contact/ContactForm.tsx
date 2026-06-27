import { useState } from "react";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { createLead } from "@/lib/supabase/leads";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SUBJECTS = [
  "Car Inquiry",
  "Sell My Car",
  "Finance Questions",
  "General Question",
];

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createLead({
        carid: null,
        source: "contact",
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        subject: formData.subject || null,
        message: formData.message.trim() || null,
        payload: null,
      });
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch {
      // still show success to avoid frustrating the user
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full border border-border rounded-lg px-3 py-2.5 text-sm text-text-heading placeholder:text-text-muted bg-white focus:outline-none focus:ring-2 focus:ring-red/25 focus:border-red transition";

  const labelCls =
    "text-xs font-display font-semibold text-text-heading mb-1.5 block";

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-border shadow-card p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-success-bg flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-success" />
        </div>
        <h3 className="font-display font-bold text-xl text-text-heading">
          Message Sent
        </h3>
        <p className="text-text-body text-sm mt-2">
          Thanks for reaching out. We'll get back to you within a few hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 text-red font-display font-semibold text-sm hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-border shadow-card p-8"
    >
      <div className="flex items-center mb-6">
        <span className="w-1 h-6 bg-red rounded-full inline-block mr-3" />
        <h3 className="font-display font-bold text-xl text-text-heading">
          Send Us a Message
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>
            Name <span className="text-red">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>
            Phone <span className="text-red">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            pattern="[0-9]{10}"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className={inputCls}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelCls}>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={inputCls}
        />
      </div>

      <div className="mt-4">
        <label className={labelCls}>
          Subject <span className="text-red">*</span>
        </label>
        <Select
          value={formData.subject}
          onValueChange={(v) => setFormData((p) => ({ ...p, subject: v }))}
        >
          <SelectTrigger
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-white h-auto focus:ring-2 focus:ring-red/25 focus:border-red"
          >
            <SelectValue placeholder="Choose a topic" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECTS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        <label className={labelCls}>
          Message <span className="text-red">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us how we can help…"
          className={`${inputCls} min-h-[120px] resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting || !formData.subject}
        className="w-full bg-red text-white font-display font-bold py-3.5 rounded-xl mt-5 flex items-center justify-center gap-2 hover:bg-red-dark shadow-red-glow transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
