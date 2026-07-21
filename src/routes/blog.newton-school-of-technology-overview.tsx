import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Tag,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Briefcase,
  Users,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const CANONICAL =
  "https://www.collegebache.com/blog/newton-school-of-technology-overview";
const HERO_IMAGE_ALT =
  "Newton School of Technology campus - Sonipat, Delhi NCR";

export const Route = createFileRoute("/blog/newton-school-of-technology-overview")({
  head: () => ({
    meta: [
      {
        title:
          "Overview of Newton School of Technology - Courses, Fees, Placements",
      },
      {
        name: "description",
        content:
          "Know everything about the Newton School of Technology, including the courses offered, placement opportunities, infrastructure facilities, and more.",
      },
      {
        property: "og:title",
        content: "Overview of Newton School of Technology",
      },
      {
        property: "og:description",
        content:
          "Complete guide to Newton School of Technology - B.Tech in CS & AI, fees, admission process, scholarships, and placements.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: NewtonOverview,
});

/* ---------------- Data ---------------- */

const HIGHLIGHTS: Array<{ label: string; value: string }> = [
  { label: "Establishment", value: "2019" },
  { label: "University Collaboration", value: "Rishihood University" },
  {
    label: "Flagship Course",
    value: "B.Tech in Computer Science and Artificial Intelligence",
  },
  { label: "Application Mode", value: "Online / Offline" },
  {
    label: "Top Recruiters",
    value: "Amazon, Google, Zomato, Razorpay, Deloitte, Lenskart",
  },
  {
    label: "Scholarships",
    value: "Merit-Based (up to 100% tuition fee waiver for the first year)",
  },
  { label: "Total Fee Range", value: "INR 22.85 Lakhs" },
  {
    label: "Contact",
    value: "support@newtonschool.co | +91 8147146756",
  },
  { label: "Address", value: "Sonipat, Delhi NCR, India" },
];

const SEMESTERS = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];

const FEE_ROWS: Array<{ label: string; values: string[] }> = [
  {
    label: "Seat Block Fees",
    values: ["₹50,000", "-", "-", "-", "-", "-", "-", "-"],
  },
  {
    label: "Tuition Fees",
    values: [
      "₹2,25,000",
      "₹2,25,000",
      "₹2,50,000",
      "₹2,50,000",
      "₹2,75,000",
      "₹2,75,000",
      "₹3,00,000",
      "₹3,00,000",
    ],
  },
  {
    label: "Upskilling Fees",
    values: [
      "₹25,000",
      "₹25,000",
      "₹30,000",
      "₹30,000",
      "₹35,000",
      "₹35,000",
      "₹40,000",
      "₹40,000",
    ],
  },
  {
    label: "Refundable Deposit",
    values: ["₹12,500", "-", "-", "-", "-", "-", "-", "-"],
  },
  {
    label: "Total Payable",
    values: [
      "₹3,12,500",
      "₹2,50,000",
      "₹2,80,000",
      "₹2,80,000",
      "₹3,10,000",
      "₹3,10,000",
      "₹3,40,000",
      "₹3,40,000",
    ],
  },
];

const TIMELINE: Array<{ title: string; detail: string }> = [
  { title: "Submit Your Application", detail: "Deadline: 24 March 2025" },
  { title: "Register for NSAT", detail: "Newton Scholastic Aptitude Test" },
  { title: "Take Mock Tests", detail: "2 practice tests to build exam readiness" },
  { title: "Attend NSAT Exam", detail: "Online on 26th March & 25th April" },
  { title: "Personal Interview", detail: "Conducted online with the admissions panel" },
  {
    title: "Counseling Session",
    detail: "RU Campus, ADYPU Pune, or Online from 8th April onwards",
  },
  {
    title: "Document Verification & Seat Booking",
    detail: "Final step to confirm your admission",
  },
];

const METHODOLOGY: Array<{ icon: typeof GraduationCap; title: string; body: string }> = [
  {
    icon: GraduationCap,
    title: "Project-Based Learning",
    body: "Hands-on projects across all four years, mapped to real-world engineering problems rather than rote theory.",
  },
  {
    icon: Briefcase,
    title: "Industry Collaboration",
    body: "Curriculum co-designed with industry leaders and top recruiters like Amazon, Google, and Razorpay.",
  },
  {
    icon: Users,
    title: "Mentorship & Facilities",
    body: "1:1 mentorship from senior engineers, modern labs, hostels, and collaborative learning spaces.",
  },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What is the average package at Newton School of Technology?",
    a: "The average placement package for students at Newton School of Technology is approximately 12 LPA, with top recruiters including Amazon, Google, Razorpay, and Deloitte.",
  },
  {
    q: "What is the four-year total fee at Newton School of Technology?",
    a: "The total four-year B.Tech fee at Newton School of Technology is around 22 Lakhs, covering tuition, upskilling, and one-time components.",
  },
  {
    q: "Is Newton School of Technology good for B.Tech?",
    a: "Newton School of Technology offers a strong industry-aligned B.Tech in CS & AI. That said, aspirants also consider alternatives like NxtWave Institute of Advanced Technologies (NIAT) for a broader range of tech specialisations before finalising their choice.",
  },
  {
    q: "How can I get a scholarship at Newton School of Technology?",
    a: "Scholarships are merit-based and awarded through the NSAT (Newton Scholastic Aptitude Test). Strong performers can get up to a 100% tuition fee waiver for the first year.",
  },
  {
    q: "Which is the best institute for CSE in India?",
    a: "Top choices for CSE in India include NIAT, the IITs, and the NITs. Each has different strengths - IITs and NITs for research and government recognition, NIAT for industry-first practical training.",
  },
];

const TOC = [
  { id: "introduction", label: "Introduction & Vision" },
  { id: "highlights", label: "Highlights" },
  { id: "courses-fees", label: "Courses & Fees" },
  { id: "admission", label: "Admission Process" },
  { id: "scholarships", label: "Scholarships & Teaching" },
  { id: "faqs", label: "FAQs" },
];

/* ---------------- Component ---------------- */

function NewtonOverview() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState<string>("introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    TOC.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="container mx-auto px-6 pt-6 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/blog" className="hover:text-primary">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">Newton School of Technology</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="container mx-auto px-6 pt-8 pb-10">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            <Tag className="h-3.5 w-3.5" /> College Overview
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Overview of Newton School of Technology
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> Published June 12, 2026
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> 5 min read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" /> Reviewed by Rohan Mehta
            </span>
          </div>

          {/* Meta description callout */}
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5 text-base md:text-lg leading-relaxed text-foreground">
            <Sparkles className="inline h-5 w-5 text-primary mr-2 -mt-1" />
            Know everything about the Newton School of Technology, including the
            courses offered, placement opportunities, infrastructure facilities,
            etc.
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12">
          {/* Main article */}
          <article className="max-w-3xl w-full mx-auto lg:mx-0 prose-article">
            {/* Hero image placeholder */}
            <figure className="mb-10 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-brand/20 aspect-[16/9] flex items-center justify-center border border-border">
              <span className="sr-only">{HERO_IMAGE_ALT}</span>
              <GraduationCap className="h-20 w-20 text-primary/50" aria-hidden />
            </figure>

            {/* Section 1 */}
            <section id="introduction" className="scroll-mt-24">
              <h2 className="font-display text-3xl font-bold text-foreground mb-5">
                Introduction & Vision
              </h2>
              <div className="space-y-5 text-lg leading-[1.8] text-foreground/90">
                <p>
                  Newton School of Technology is an institute focused on
                  providing high-quality education and training in emerging
                  technologies, designed to bridge the gap between traditional
                  engineering degrees and real-world industry expectations.
                </p>
                <p>
                  The core mission of Newton School of Technology is to provide
                  accessible, world-class technology education that equips
                  students with the practical skills and mentorship needed to
                  thrive in modern engineering roles.
                </p>
                <p>
                  Newton School of Technology's vision is to empower individuals
                  from every background to build meaningful careers in tech
                  through a curriculum co-created with top industry leaders and
                  a rigorous, project-first learning model.
                </p>
              </div>
            </section>

            {/* Section 2 - Highlights */}
            <section id="highlights" className="scroll-mt-24 mt-16">
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Newton School of Technology Highlights
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl border border-border overflow-hidden bg-card">
                {HIGHLIGHTS.map((h, i) => (
                  <div
                    key={h.label}
                    className={`p-5 border-border ${
                      i % 2 === 0 ? "sm:border-r" : ""
                    } ${i < HIGHLIGHTS.length - (HIGHLIGHTS.length % 2 === 0 ? 2 : 1) ? "border-b" : ""}`}
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {h.label}
                    </dt>
                    <dd className="mt-1.5 text-base font-medium text-foreground">
                      {h.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Section 3 - Courses & Fees */}
            <section id="courses-fees" className="scroll-mt-24 mt-16">
              <h2 className="font-display text-3xl font-bold text-foreground mb-5">
                Newton School of Technology Courses and Fees
              </h2>

              <div className="rounded-xl border border-primary/25 bg-primary/5 p-5 text-[15px] leading-relaxed text-foreground/90 mb-8">
                <strong className="text-primary">Note:</strong> Newton School of
                Technology offers comprehensive programs in Computer Science &
                AI, but NxtWave Institute of Advanced Technologies offers an
                even broader range of tech courses - worth comparing before you
                make your final call.
              </div>

              {/* Main course */}
              <div className="overflow-hidden rounded-xl border border-border mb-8">
                <table className="w-full text-left">
                  <thead className="bg-muted text-sm">
                    <tr>
                      <th className="p-4 font-semibold">Course</th>
                      <th className="p-4 font-semibold">1st Year Fees</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-4 font-medium">
                        B.Tech (Computer Science & AI)
                      </td>
                      <td className="p-4 text-primary font-semibold">
                        ₹5,12,500
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Semester breakdown */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Semester-wise Fee Breakdown
              </h3>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm min-w-[720px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-left font-semibold sticky left-0 bg-muted z-10">
                        Component
                      </th>
                      {SEMESTERS.map((s) => (
                        <th key={s} className="p-3 text-right font-semibold">
                          {s}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {FEE_ROWS.map((row, idx) => (
                      <tr
                        key={row.label}
                        className={`border-t border-border ${
                          idx === FEE_ROWS.length - 1
                            ? "bg-primary/5 font-semibold"
                            : ""
                        }`}
                      >
                        <td className="p-3 sticky left-0 bg-card z-10">
                          {row.label}
                        </td>
                        {row.values.map((v, i) => (
                          <td key={i} className="p-3 text-right tabular-nums">
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4 - Admission timeline */}
            <section id="admission" className="scroll-mt-24 mt-16">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                Newton School of Technology Admission Process
              </h2>
              <ol className="relative border-l-2 border-primary/25 pl-8 space-y-8">
                {TIMELINE.map((t, i) => (
                  <li key={t.title} className="relative">
                    <span className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {t.title}
                    </h3>
                    <p className="mt-1 text-[15px] text-muted-foreground leading-relaxed">
                      {t.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Section 5 - Scholarships & methodology */}
            <section id="scholarships" className="scroll-mt-24 mt-16">
              <h2 className="font-display text-3xl font-bold text-foreground mb-5">
                Scholarships & Practical Learning
              </h2>
              <p className="text-lg leading-[1.8] text-foreground/90 mb-8">
                Newton School of Technology awards merit-based scholarships
                through the <strong>NSAT (Newton Scholastic Aptitude Test)</strong>.
                Top performers can secure up to a{" "}
                <strong>100% tuition fee waiver for the first year</strong>,
                making the program significantly more accessible for
                deserving aspirants.
              </p>

              <div className="grid gap-5 sm:grid-cols-3">
                {METHODOLOGY.map((m) => (
                  <div
                    key={m.title}
                    className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <m.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1.5">
                      {m.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {m.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6 - FAQs */}
            <section id="faqs" className="scroll-mt-24 mt-16">
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {FAQS.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div
                      key={f.q}
                      className="rounded-xl border border-border bg-card overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/40 transition-colors"
                      >
                        <span className="font-display font-semibold text-foreground text-base md:text-lg">
                          {f.q}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {open && (
                        <div className="px-5 pb-5 -mt-1 text-[15px] leading-relaxed text-muted-foreground">
                          {f.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </article>

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* TOC */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Table of Contents
                </h3>
                <ul className="space-y-2 text-sm">
                  {TOC.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`block border-l-2 pl-3 py-1 transition-colors ${
                          activeSection === s.id
                            ? "border-primary text-primary font-semibold"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick highlights */}
              <div className="rounded-xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                  Quick Highlights
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {HIGHLIGHTS.slice(0, 6).map((h) => (
                    <li key={h.label} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-muted-foreground text-xs">
                          {h.label}
                        </div>
                        <div className="text-foreground font-medium">
                          {h.value}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
