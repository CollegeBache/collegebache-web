import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { blogPosts, categoryBySlug, categories, type BlogPost } from "@/data/blog-posts";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Tag,
  User,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  BookOpen,
  Share2,
  Bookmark,
  Mail,
  Phone,
  ChevronDown,
  ChevronRight,
  ListTree,
  Brain,
  Zap,
  Compass,
  Gem,
  Rocket,
} from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center text-center px-6 py-24">
        <div>
          <h1 className="font-display text-4xl font-bold">Article not found</h1>
          <p className="mt-3 text-muted-foreground">The story you're looking for doesn't exist.</p>
          <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-primary-foreground bg-primary px-6 py-3 rounded-full font-semibold">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Something went wrong loading this article.</p>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} - CollegeBache` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:image", content: loaderData.post.image },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: loaderData.post.image },
        ]
      : [{ title: "Article - CollegeBache" }, { name: "robots", content: "noindex" }],
  }),
});

/* ---------------- Lead form (mid-article) ---------------- */

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(150),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  year: z.string().trim().min(4, "Year of passing is required").max(4),
  comments: z.string().trim().max(500).optional().or(z.literal("")),
});

function LeadForm() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", year: "", comments: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="my-12 p-10 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
        <h3 className="mt-4 font-display text-2xl font-bold">You're in, {values.name.split(" ")[0]}!</h3>
        <p className="mt-2 text-muted-foreground">A CollegeBache mentor will reach out at {values.email} shortly.</p>
      </div>
    );
  }

  return (
    <div className="my-12 p-8 md:p-10 rounded-3xl bg-card border border-primary/30 shadow-xl shadow-primary/10">
      <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
        <Sparkles className="h-4 w-4" /> Free 1:1 Guidance
      </div>
      <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold">Talk to a Senior. Decide Smarter.</h3>
      <p className="mt-2 text-muted-foreground">
        Fill this quick form and one of our student mentors will personally reach out - no bots, no spam.
      </p>
      <form onSubmit={submit} className="mt-8 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Full name</label>
          <input value={values.name} onChange={(e) => onChange("name", e.target.value)} maxLength={80} className="w-full rounded-xl bg-input text-foreground border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Riya Sharma" />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <input type="email" value={values.email} onChange={(e) => onChange("email", e.target.value)} maxLength={150} className="w-full rounded-xl bg-input text-foreground border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@email.com" />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Phone number</label>
          <input type="tel" value={values.phone} onChange={(e) => onChange("phone", e.target.value)} maxLength={20} className="w-full rounded-xl bg-input text-foreground border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+91 98765 43210" />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Year of passing (12th)</label>
          <input type="number" min={2020} max={2030} value={values.year} onChange={(e) => onChange("year", e.target.value)} maxLength={4} className="w-full rounded-xl bg-input text-foreground border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="2026" />
          {errors.year && <p className="text-xs text-destructive mt-1">{errors.year}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium mb-1.5 block">Comments</label>
          <textarea value={values.comments} onChange={(e) => onChange("comments", e.target.value)} rows={4} maxLength={500} className="w-full rounded-xl bg-input text-foreground border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none" placeholder="What college or exam do you want to know more about?" />
        </div>
        <button type="submit" className="md:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3.5 font-semibold hover:bg-primary/90 shadow-lg shadow-primary/30 transition-colors">
          Get Free Guidance <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

/* ---------------- Summarise With AI (interactive) ---------------- */

type AiEngine = {
  id: string;
  name: string;
  icon: typeof Brain;
  color: string; // tailwind gradient classes
  tone: (bullets: string[]) => string[];
};

const aiEngines: AiEngine[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: Sparkles,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-600 border-emerald-500/30",
    tone: (b) => [
      `Here's a clear, structured take:`,
      ...b.map((x) => `• ${x}`),
      `In short: a solid, balanced resource for aspirants.`,
    ],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    icon: Compass,
    color: "from-sky-500/20 to-cyan-500/20 text-sky-600 border-sky-500/30",
    tone: (b) => [
      `Cited-style summary with the core facts:`,
      ...b.map((x, i) => `[${i + 1}] ${x}`),
      `Sources: CollegeBache editorial + student contributors.`,
    ],
  },
  {
    id: "claude",
    name: "Claude",
    icon: Brain,
    color: "from-amber-500/20 to-orange-500/20 text-amber-600 border-amber-500/30",
    tone: (b) => [
      `A thoughtful breakdown of what this article covers:`,
      ...b.map((x) => `— ${x}`),
      `Nuance: your decision should weigh cost, campus fit, and long-term ROI.`,
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: Gem,
    color: "from-indigo-500/20 to-blue-500/20 text-indigo-600 border-indigo-500/30",
    tone: (b) => [
      `Quick multimodal summary:`,
      ...b.map((x) => `▸ ${x}`),
      `Tip: pair this with official brochures for the most accurate cut-offs.`,
    ],
  },
  {
    id: "grok",
    name: "Grok",
    icon: Zap,
    color: "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-600 border-fuchsia-500/30",
    tone: (b) => [
      `Straight-talk TL;DR, no fluff:`,
      ...b.map((x) => `→ ${x}`),
      `Bottom line: read it, screenshot it, decide fast.`,
    ],
  },
];

function buildBaseBullets(post: BlogPost): string[] {
  const paragraphs = post.content.filter(Boolean);
  const picks = paragraphs.slice(0, 4).map((p) => {
    const trimmed = p.replace(/\s+/g, " ").trim();
    return trimmed.length > 180 ? `${trimmed.slice(0, 177)}...` : trimmed;
  });
  return [post.excerpt, ...picks].slice(0, 5);
}

function SummariseWithAI({ post }: { post: BlogPost }) {
  const [active, setActive] = useState<string | null>(null);
  const baseBullets = useMemo(() => buildBaseBullets(post), [post]);
  const activeEngine = aiEngines.find((e) => e.id === active) ?? null;
  const lines = activeEngine ? activeEngine.tone(baseBullets) : [];

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="p-5 border-b border-border flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h4 className="font-display font-bold text-sm">Summarise With AI</h4>
          <p className="text-[11px] text-muted-foreground">Pick an engine for an instant summary</p>
        </div>
      </div>

      <div className="p-4 flex flex-wrap gap-2">
        {aiEngines.map((e) => {
          const Icon = e.icon;
          const isActive = active === e.id;
          return (
            <button
              key={e.id}
              onClick={() => setActive(isActive ? null : e.id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all bg-gradient-to-r ${e.color} ${
                isActive ? "ring-2 ring-primary scale-105" : "hover:scale-105"
              }`}
              aria-pressed={isActive}
            >
              <Icon className="h-3.5 w-3.5" />
              {e.name}
              <ChevronDown className={`h-3 w-3 transition-transform ${isActive ? "rotate-180" : ""}`} />
            </button>
          );
        })}
      </div>

      <div
        className={`grid transition-all duration-300 ease-out ${
          activeEngine ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {activeEngine && (
            <div className="px-5 pb-5">
              <div className="rounded-xl border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <activeEngine.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {activeEngine.name} summary
                  </span>
                </div>
                <ul className="space-y-2">
                  {lines.map((l, i) => (
                    <li key={i} className="text-sm leading-relaxed text-foreground/85">
                      {l}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[10px] text-muted-foreground">
                  AI-styled preview generated locally from this article. Verify key facts before decisions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Enquiry (sidebar) ---------------- */

function EnquiryForm() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [done, setDone] = useState(false);
  const onChange = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.phone) return;
    setDone(true);
  };
  if (done) {
    return (
      <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center">
        <CheckCircle2 className="h-8 w-8 text-primary mx-auto" />
        <p className="mt-3 font-semibold">Enquiry received!</p>
        <p className="text-xs text-muted-foreground mt-1">We'll get back to you shortly.</p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-accent px-6 py-4">
        <h4 className="font-display text-lg font-bold text-primary-foreground">Send Us Your Enquiry</h4>
      </div>
      <form onSubmit={submit} className="p-5 space-y-3">
        <input required placeholder="Your name" value={values.name} onChange={(e) => onChange("name", e.target.value)} className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        <input required type="email" placeholder="Email" value={values.email} onChange={(e) => onChange("email", e.target.value)} className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        <input required type="tel" placeholder="Phone" value={values.phone} onChange={(e) => onChange("phone", e.target.value)} className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        <input placeholder="Subject" value={values.subject} onChange={(e) => onChange("subject", e.target.value)} className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        <textarea rows={3} placeholder="Your message" value={values.message} onChange={(e) => onChange("message", e.target.value)} className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
        <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90">
          Submit Enquiry
        </button>
      </form>
    </div>
  );
}

/* ---------------- Table of Contents (scroll spy) ---------------- */

type Section = { id: string; title: string; paragraphs: string[] };

function buildSections(post: BlogPost): Section[] {
  const titles = [
    "Overview",
    "Key Highlights",
    "Eligibility & Details",
    "Syllabus & Exam Pattern",
    "Preparation Strategy",
    "Final Verdict",
  ];
  const content = post.content.filter(Boolean);
  if (content.length === 0) return [];
  const buckets: string[][] = titles.map(() => []);
  content.forEach((p, i) => {
    buckets[i % titles.length].push(p);
  });
  return titles
    .map((title, i) => ({
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      paragraphs: buckets[i],
    }))
    .filter((s) => s.paragraphs.length > 0);
}

function TableOfContents({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <ListTree className="h-4 w-4 text-primary" />
        <h4 className="font-display font-bold text-sm">Table of Contents</h4>
      </div>
      <ul className="space-y-1">
        {sections.map((s, i) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left flex items-start gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-2 border-transparent"
                }`}
              >
                <span className="text-[10px] font-bold mt-0.5 opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">{s.title}</span>
                {isActive && <ChevronRight className="h-3 w-3 mt-1" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------------- FAQ Accordion (with schema) ---------------- */

function buildFaqs(post: BlogPost) {
  const cat = categoryBySlug(post.category)?.name ?? "this topic";
  return [
    {
      q: `What is "${post.title}" about?`,
      a: post.excerpt,
    },
    {
      q: `Who should read this article?`,
      a: `Students exploring ${cat}, parents helping with college decisions, and anyone researching campus life or entrance prep in India.`,
    },
    {
      q: `Is the information updated for 2026 admissions?`,
      a: `Yes. CollegeBache editors review every guide before each admission cycle so cut-offs, fees, and eligibility reflect the latest official data.`,
    },
    {
      q: `Can I talk to a real student from the college?`,
      a: `Absolutely. Use our "Talk to a Senior" form on this page and a verified student mentor will connect with you within 24 hours.`,
    },
    {
      q: `Is CollegeBache free to use?`,
      a: `Yes, all guides, reviews, and mentor connects on CollegeBache are 100% free for students.`,
    },
  ];
}

function FaqAccordion({ post }: { post: BlogPost }) {
  const faqs = useMemo(() => buildFaqs(post), [post]);
  const [open, setOpen] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faqs" className="scroll-mt-24 mt-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Rocket className="h-5 w-5 text-primary" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-sm md:text-base">{f.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}

/* ---------------- Comparison Table (semantic) ---------------- */

function ComparisonTable({ post }: { post: BlogPost }) {
  const cat = categoryBySlug(post.category)?.name ?? "Category";
  const rows = [
    { label: "Category", value: cat },
    { label: "Focus Area", value: post.subtopic ?? "General" },
    { label: "College / Exam", value: post.college ?? "Multi-college coverage" },
    { label: "State / Region", value: post.state ?? "Pan-India" },
    { label: "Read Time", value: post.readTime },
    { label: "Last Updated", value: post.date },
  ];
  return (
    <div className="my-8 rounded-2xl border border-border overflow-hidden bg-card">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-5 py-3">
        <h3 className="font-display font-bold text-sm uppercase tracking-wider text-primary">Quick Facts</h3>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label} className={i % 2 === 0 ? "bg-background/40" : ""}>
              <th scope="row" className="text-left font-semibold px-5 py-3 w-1/3 border-t border-border">
                {r.label}
              </th>
              <td className="px-5 py-3 border-t border-border text-foreground/90">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Main article ---------------- */

function BlogPost() {
  const { post } = Route.useLoaderData();
  const category = categoryBySlug(post.category);
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 4);
  const morePopular = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 5);
  const sections = useMemo(() => buildSections(post), [post]);
  const midIndex = Math.floor(sections.length / 2);
  const exploreCats = categories.filter((c) => c.slug !== post.category).slice(0, 2);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-10 max-w-7xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-primary">Blog</Link>
          {category && (
            <>
              <span>/</span>
              <Link to="/blog/category/$category" params={{ category: category.slug }} className="hover:text-primary">
                {category.name}
              </Link>
            </>
          )}
        </nav>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main column */}
          <article className="min-w-0">
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/20">
              <img src={post.image} alt={post.title} className="w-full aspect-[16/10] object-cover" />
            </div>

            <h1 className="mt-8 font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground border-b border-border pb-5">
              <span className="inline-flex items-center gap-2"><User className="h-4 w-4 text-primary" /> {post.author}</span>
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {post.date}</span>
              {category && (
                <Link to="/blog/category/$category" params={{ category: category.slug }} className="inline-flex items-center gap-2 hover:text-primary">
                  <Tag className="h-4 w-4 text-primary" /> {category.name}
                </Link>
              )}
              <span className="text-xs">{post.readTime}</span>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-foreground/90 font-medium">
              {post.excerpt}
            </p>

            {/* Mobile TOC + AI summariser */}
            <div className="lg:hidden mt-8 space-y-4">
              <TableOfContents sections={sections} />
              <SummariseWithAI post={post} />
            </div>

            <ComparisonTable post={post} />

            {/* Rendered sections with anchors */}
            <div className="mt-6 space-y-12">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="font-display text-2xl md:text-3xl font-bold border-l-4 border-primary pl-4">
                    {s.title}
                  </h2>
                  <div className="prose prose-lg max-w-none mt-5">
                    {s.paragraphs.map((p, j) => (
                      <p key={j} className="text-base md:text-lg leading-relaxed text-foreground/90 mb-5">
                        {p}
                      </p>
                    ))}
                  </div>

                  {i === midIndex && <LeadForm />}
                </section>
              ))}
            </div>

            {/* FAQ block */}
            <FaqAccordion post={post} />

            {/* Share bar */}
            <div className="mt-10 flex flex-wrap items-center gap-3 border-y border-border py-5">
              <span className="text-sm font-semibold text-muted-foreground">Share:</span>
              <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary">
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary">
                <Bookmark className="h-3.5 w-3.5" /> Save
              </button>
            </div>

            {/* Author card */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display font-black text-primary-foreground shrink-0">
                {post.author.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold text-lg">{post.author}</div>
                <div className="text-xs text-muted-foreground">Student Writer at CollegeBache</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Writes on {category?.name.toLowerCase()}. Views are their own, based on real campus experience.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 self-start hidden lg:block">
            <TableOfContents sections={sections} />
            <SummariseWithAI post={post} />

            {exploreCats[0] && (
              <Link
                to="/blog/category/$category"
                params={{ category: exploreCats[0].slug }}
                className="group block rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/30 to-accent/30 relative">
                  <img src={blogPosts.find((p) => p.category === exploreCats[0].slug)?.image ?? post.image} alt={exploreCats[0].name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 text-center">
                  <div className="inline-flex items-center gap-2 font-display font-bold text-primary text-sm">
                    <GraduationCap className="h-4 w-4" /> Explore {exploreCats[0].name}
                  </div>
                </div>
              </Link>
            )}

            <EnquiryForm />

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="font-semibold">+91 88888888</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-semibold">hello@collegebache.com</span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="font-display font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> Popular Blogs
              </h4>
              <ul className="space-y-4">
                {morePopular.map((p, i) => (
                  <li key={p.slug} className="flex gap-3">
                    <span className="font-display font-black text-2xl text-primary/60 leading-none w-6">{i + 1}</span>
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="text-sm font-semibold leading-snug line-clamp-3 hover:text-primary transition-colors">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-card/50 border-y border-border py-16 mt-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">More in {category?.name}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    {p.subtopic && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{p.subtopic}</span>
                    )}
                    <h3 className="mt-1 font-display text-base font-bold leading-snug group-hover:text-primary transition-colors line-clamp-3">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
