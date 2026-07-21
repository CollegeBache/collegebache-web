import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { colleges } from "@/data/blog-posts";
import { submitLead } from "@/lib/leads.functions";
import { ArrowRight, CheckCircle2, GraduationCap, MessageCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/talk-to-senior")({
  component: TalkToSenior,
  head: () => ({
    meta: [
      { title: "Talk to a Senior - CollegeBache" },
      { name: "description", content: "Connect 1:1 with a current student or alum from your target engineering college. Free, unfiltered guidance from real seniors." },
      { property: "og:title", content: "Talk to a Senior - CollegeBache" },
      { property: "og:description", content: "Pick a college, share your doubt, and get honest guidance from a real senior." },
    ],
  }),
});

const collegeOptions = colleges.filter((c) => c !== "All Colleges");
const states = [
  "Andhra Pradesh", "Delhi", "Karnataka", "Kerala", "Maharashtra", "Odisha",
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Other",
];
const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Marathi", "Bengali", "Punjabi", "Other"];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(6, "Enter a valid phone").max(20),
  college: z.string().trim().min(1, "Pick a college"),
  state: z.string().trim().min(1, "Pick a state"),
  language: z.string().trim().min(1, "Pick a language"),
  message: z.string().trim().min(5, "Tell us your doubt").max(1000),
});

function TalkToSenior() {
  const [values, setValues] = useState({
    name: "", email: "", phone: "",
    college: collegeOptions[0], state: states[0], language: languages[0],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      await submitLead({ data: { ...parsed.data, source: "talk-to-senior" } });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 text-primary border border-primary/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Connect with Seniors
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-bold leading-tight">
            Talk to a <span className="text-primary">Senior</span>. Get Real Answers.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Pick a college, drop your doubt, and one of our student mentors will personally reach out. No bots, no scripts.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 max-w-5xl grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="h-4 w-4" /> Colleges We Cover
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold">Seniors from these campuses</h2>
          <ul className="mt-6 space-y-2">
            {collegeOptions.map((c) => (
              <li key={c} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border text-sm">
                <MessageCircle className="h-4 w-4 text-primary shrink-0" /> {c}
              </li>
            ))}
          </ul>
        </div>

        {submitted ? (
          <div className="p-10 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 text-center self-start">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
            <h3 className="mt-4 font-display text-2xl font-bold">Thanks, {values.name.split(" ")[0]}!</h3>
            <p className="mt-2 text-muted-foreground">A senior from {values.college} will reach out at {values.email} shortly.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-8 rounded-3xl bg-card border border-border shadow-xl shadow-primary/10 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" error={errors.name}>
                <input value={values.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Riya Sharma" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" value={values.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="you@email.com" />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input type="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} placeholder="+91 98765 43210" />
              </Field>
              <Field label="College" error={errors.college}>
                <select value={values.college} onChange={(e) => set("college", e.target.value)} className={inputCls}>
                  {collegeOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="State" error={errors.state}>
                <select value={values.state} onChange={(e) => set("state", e.target.value)} className={inputCls}>
                  {states.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Preferred language" error={errors.language}>
                <select value={values.language} onChange={(e) => set("language", e.target.value)} className={inputCls}>
                  {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Your doubt / message" error={errors.message}>
              <textarea value={values.message} onChange={(e) => set("message", e.target.value)} rows={5} maxLength={1000} className={`${inputCls} resize-none`} placeholder="Ask anything - hostel, placements, food, faculty, anything." />
            </Field>
            {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
            <button disabled={busy} type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3.5 font-semibold hover:bg-primary/90 shadow-lg shadow-primary/30 disabled:opacity-70">
              {busy ? "Submitting..." : (<>Submit & Connect <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </form>
        )}
      </section>

      <Footer />
    </div>
  );
}

const inputCls = "w-full rounded-xl bg-input text-foreground border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
