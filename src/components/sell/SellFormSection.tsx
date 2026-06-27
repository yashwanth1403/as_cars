import { useState } from "react";
import { Star, CheckCircle } from "lucide-react";
import { createLead } from "@/lib/supabase/leads";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BRANDS = ["Maruti", "Hyundai", "Honda", "Toyota", "Tata", "Kia", "Mahindra", "Other"];
const YEARS = Array.from({ length: 10 }, (_, i) => String(2024 - i));

export default function SellFormSection() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [km, setKm] = useState("");
  const [fuel, setFuel] = useState("");
  const [trans, setTrans] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pref, setPref] = useState("");
  const [agree1, setAgree1] = useState(true);
  const [agree2, setAgree2] = useState(true);

  const step1Valid = brand && model && year && km && fuel && trans && condition;
  const step2Valid = name.trim().length >= 2 && phone.trim().length >= 10 && agree1 && agree2;
  const [submitting, setSubmitting] = useState(false);

  const inputCls =
    "border border-border rounded-lg px-3 py-2.5 text-sm w-full outline-none focus:ring-2 focus:ring-red/30 focus:border-red";
  const triggerCls =
    "border border-border rounded-lg px-3 py-2.5 text-sm w-full focus:ring-2 focus:ring-red/30 focus:border-red bg-white h-auto";

  return (
    <section id="sell-form" className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-12 items-start">
        {/* LEFT info */}
        <div>
          <span className="bg-red-light border border-red/20 text-red text-xs font-display font-bold tracking-[0.18em] rounded-full px-3 py-1 inline-block">
            FREE VALUATION
          </span>
          <h2 className="font-display font-extrabold text-3xl text-text-heading mt-3">
            Tell Us About Your Car
          </h2>
          <p className="text-text-body mt-3 leading-relaxed max-w-sm">
            Fill in your car details and our team will contact you with the best price — usually
            within 2 hours.
          </p>

          <div className="mt-8 space-y-4">
            {[
              ["Submit your car details", "Takes less than 2 minutes"],
              ["We call you for inspection", "At your home or our showroom"],
              ["Get your best offer", "Transparent pricing, no haggling"],
              ["Get paid same day", "Instant bank transfer"],
            ].map(([t, s], i) => (
              <div key={t} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red text-white font-display font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <div className="font-display font-semibold text-sm text-text-heading">{t}</div>
                  <div className="text-text-muted text-xs mt-0.5">{s}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-surface rounded-2xl border border-border p-5">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-warning fill-warning" />
              ))}
            </div>
            <p className="text-text-body text-sm italic leading-relaxed">
              "Sold my Hyundai i20 in just 24 hours! Best price in Hyderabad. Zero hassle, full
              payment same day."
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="bg-red text-white w-8 h-8 rounded-full font-display font-bold text-sm flex items-center justify-center">
                SK
              </div>
              <span className="text-text-muted text-xs">Suresh Kumar, Gachibowli</span>
            </div>
          </div>
        </div>

        {/* RIGHT form */}
        <div className="bg-white rounded-2xl border-2 border-border shadow-card p-8">
          {submitted ? (
            <div className="bg-success-bg rounded-2xl p-10 text-center">
              <CheckCircle size={48} className="text-success mx-auto" />
              <h3 className="font-display font-extrabold text-2xl text-success mt-4">
                Request Received!
              </h3>
              <p className="text-text-body mt-3">
                We'll call you within 2 hours with your free valuation.
              </p>
              <p className="text-text-muted text-sm mt-2">Calling: {phone}</p>
              <a
                href="https://wa.me/919392583393?text=Hi!%20I%20submitted%20a%20car%20valuation%20request."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-display font-semibold mt-5 inline-block hover:bg-[#1EA855] transition-colors"
              >
                Get Faster Response on WhatsApp →
              </a>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-red text-white text-xs font-display font-bold flex items-center justify-center">
                    1
                  </div>
                  <span className="text-[10px] text-text-muted mt-1">Car Details</span>
                </div>
                <div
                  className={`flex-1 h-0.5 -mt-4 ${step === 2 ? "bg-red" : "bg-border"}`}
                />
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full text-xs font-display font-bold flex items-center justify-center ${
                      step === 2
                        ? "bg-red text-white"
                        : "bg-surface border border-border text-text-muted"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-[10px] text-text-muted mt-1">Your Info</span>
                </div>
              </div>

              {step === 1 && (
                <>
                  <h3 className="font-display font-bold text-xl text-text-heading mb-5">
                    Car Details
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={brand} onValueChange={setBrand}>
                        <SelectTrigger className={triggerCls}>
                          <SelectValue placeholder="Brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {BRANDS.map((b) => (
                            <SelectItem key={b} value={b}>
                              {b}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input
                        placeholder="Model (e.g. Swift, Creta)"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={year} onValueChange={setYear}>
                        <SelectTrigger className={triggerCls}>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {YEARS.map((y) => (
                            <SelectItem key={y} value={y}>
                              {y}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input
                        type="number"
                        placeholder="Kilometres Driven"
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={fuel} onValueChange={setFuel}>
                        <SelectTrigger className={triggerCls}>
                          <SelectValue placeholder="Fuel Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Petrol", "Diesel", "CNG", "Electric"].map((f) => (
                            <SelectItem key={f} value={f}>
                              {f}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={trans} onValueChange={setTrans}>
                        <SelectTrigger className={triggerCls}>
                          <SelectValue placeholder="Transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Manual", "Automatic"].map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Select value={condition} onValueChange={setCondition}>
                      <SelectTrigger className={triggerCls}>
                        <SelectValue placeholder="Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">
                          Excellent — No scratches, perfect interiors
                        </SelectItem>
                        <SelectItem value="Good">Good — Minor wear, well maintained</SelectItem>
                        <SelectItem value="Fair">Fair — Visible wear, some repairs needed</SelectItem>
                        <SelectItem value="Needs Repair">Needs Repair — Major work required</SelectItem>
                      </SelectContent>
                    </Select>
                    <textarea
                      rows={3}
                      placeholder="Any modifications, issues, or extra features... (optional)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <button
                    disabled={!step1Valid}
                    onClick={() => setStep(2)}
                    className="bg-red text-white w-full py-3.5 rounded-xl font-display font-semibold mt-6 hover:bg-red-dark hover:shadow-red-glow transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next: Your Details →
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="font-display font-bold text-xl text-text-heading mb-2">
                    Your Contact Info
                  </h3>
                  <p className="text-text-muted text-sm mb-5">
                    We'll reach out to you with the valuation.
                  </p>
                  <div className="space-y-4">
                    <input
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputCls}
                    />
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputCls}
                    />
                    <input
                      type="email"
                      placeholder="Email (optional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputCls}
                    />
                    <Select value={pref} onValueChange={setPref}>
                      <SelectTrigger className={triggerCls}>
                        <SelectValue placeholder="Preferred Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9AM – 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM – 4PM)</SelectItem>
                        <SelectItem value="evening">Evening (4PM – 7PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-text-body">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agree1}
                        onChange={(e) => setAgree1(e.target.checked)}
                        className="mt-0.5 accent-red"
                      />
                      I agree to be contacted by AS Cars regarding my vehicle
                    </label>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agree2}
                        onChange={(e) => setAgree2(e.target.checked)}
                        className="mt-0.5 accent-red"
                      />
                      I confirm this is my vehicle and the details are accurate
                    </label>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="border border-border text-text-body px-5 py-3 rounded-xl font-semibold hover:border-red hover:text-red transition"
                    >
                      ← Back
                    </button>
                    <button
                      disabled={!step2Valid || submitting}
                      onClick={async () => {
                        setSubmitting(true);
                        try {
                          await createLead({
                            carid: null,
                            source: "sell",
                            name: name.trim(),
                            phone: phone.trim(),
                            email: email.trim() || null,
                            subject: `Sell Car: ${brand} ${model} ${year}`,
                            message: notes || null,
                            payload: { brand, model, year, km, fuel, transmission: trans, condition, preferredTime: pref },
                          });
                        } catch {
                          // still show success — don't block UX
                        }
                        setSubmitted(true);
                        setSubmitting(false);
                      }}
                      className="bg-red text-white flex-1 py-3 rounded-xl font-display font-semibold hover:bg-red-dark hover:shadow-red-glow transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Submitting..." : "Submit Valuation Request"}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
