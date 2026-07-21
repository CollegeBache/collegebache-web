import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { blogPosts, categories, colleges, categoryBySlug } from "@/data/blog-posts";
import { Search, ArrowRight, ChevronLeft, ChevronRight, Star, Clock } from "lucide-react";

const PAGE_SIZE = 6;

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Blog - CollegeBache | India's Student-First Education Blog" },
      { name: "description", content: "Browse hundreds of student-written articles on engineering colleges, entrance exams, branches and careers." },
      { property: "og:title", content: "CollegeBache Blog - Honest Education Content" },
      { property: "og:description", content: "End-to-end honest reviews and guides for India's engineering aspirants." },
    ],
  }),
});

function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState<"all" | string>("all");
  const [activeCollege, setActiveCollege] = useState("All Colleges");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchCollege = activeCollege === "All Colleges" || p.college === activeCollege;
      const matchQ = !q
        || p.title.toLowerCase().includes(q)
        || p.excerpt.toLowerCase().includes(q)
        || (p.college?.toLowerCase().includes(q) ?? false)
        || (categoryBySlug(p.category)?.name.toLowerCase().includes(q) ?? false);
      return matchCat && matchCollege && matchQ;
    });
  }, [activeCategory, activeCollege, query]);

  const featured = useMemo(() => filtered.filter((p) => p.featured), [filtered]);
  const latest = useMemo(() => {
    return [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(latest.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = latest.slice(pageStart, pageStart + PAGE_SIZE);

  const resetPage = () => setPage(1);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <span className="inline-block bg-primary/15 text-primary border border-primary/30 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
            The CollegeBache Blog
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-tight">
            Every Article. <span className="text-primary">One Place.</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-lg">
            Search hundreds of student-written articles on engineering colleges, entrance exams, branches and careers.
          </p>
          <div className="mt-10 relative max-w-xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); resetPage(); }}
              placeholder="Search by college, exam, or keyword..."
              className="w-full rounded-full bg-input text-foreground border border-border pl-14 pr-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10 space-y-5">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => { setActiveCategory("all"); resetPage(); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => { setActiveCategory(c.slug); resetPage(); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === c.slug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {colleges.map((c) => (
            <button
              key={c}
              onClick={() => { setActiveCollege(c); resetPage(); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                activeCollege === c
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {filtered.length === 0 && (
        <div className="container mx-auto px-6 pb-24 text-center text-muted-foreground">
          No posts found. Try a different search or filter.
        </div>
      )}

      {featured.length > 0 && (
        <section className="container mx-auto px-6 pb-6">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-brand fill-brand" />
            <h2 className="font-display text-2xl font-bold">Featured</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.slice(0, 2).map((p) => (
              <FeaturedCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl font-bold">Latest Articles</h2>
          <span className="ml-2 text-sm text-muted-foreground">({latest.length})</span>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((p) => (
            <BlogCard key={p.slug} p={p} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-full border border-border disabled:opacity-40 hover:border-primary"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-9 min-w-9 px-3 rounded-full text-sm font-semibold border ${
                  n === currentPage
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary hover:text-primary"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-full border border-border disabled:opacity-40 hover:border-primary"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

function FeaturedCard({ p }: { p: typeof blogPosts[number] }) {
  const cat = categoryBySlug(p.category);
  return (
    <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block rounded-3xl overflow-hidden bg-card border border-border hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all">
      <div className="aspect-[16/9] overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-primary-foreground bg-primary px-2.5 py-1 rounded-full">Featured</span>
          <span className="text-xs text-muted-foreground">{cat?.name}</span>
          {p.college && <span className="text-xs text-accent">• {p.college}</span>}
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight group-hover:text-primary transition-colors">{p.title}</h3>
        <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-primary font-semibold text-sm">
          Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

function BlogCard({ p }: { p: typeof blogPosts[number] }) {
  const cat = categoryBySlug(p.category);
  return (
    <Link to="/blog/$slug" params={{ slug: p.slug }} className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-primary bg-primary/15 border border-primary/30 px-2.5 py-1 rounded-full">{cat?.name}</span>
          {p.college && <span className="text-xs text-muted-foreground">• {p.college}</span>}
        </div>
        <h3 className="mt-4 font-display text-xl font-bold leading-tight group-hover:text-primary transition-colors">{p.title}</h3>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-primary font-semibold text-sm">
          Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="mt-5 pt-5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>{p.author}</span>
          <span>{p.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
