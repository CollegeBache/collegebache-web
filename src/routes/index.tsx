import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight, TrendingUp, Clock, Mail, Flame } from "lucide-react";
import { blogPosts, categories, categoryBySlug } from "@/data/blog-posts";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "CollegeBache - India's Student-First Education Blog" },
      { name: "description", content: "Honest engineering college reviews, entrance exam guides, branch deep-dives and career playbooks - written by real students, for real students." },
      { property: "og:title", content: "CollegeBache - India's Student-First Education Blog" },
      { property: "og:description", content: "Honest engineering college reviews, entrance exam guides, branch deep-dives and career playbooks - written by real students, for real students." },
    ],
  }),
});

function Home() {
  const trending = blogPosts.filter((p) => p.trending).slice(0, 5);
  const [heroPost, ...sideStack] = blogPosts.filter((p) => p.featured);
  const sideFeatured = sideStack.slice(0, 3);
  const latest = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero magazine block */}
      <section className="container mx-auto px-6 pt-10 pb-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Big hero */}
          {heroPost && (
            <Link
              to="/blog/$slug"
              params={{ slug: heroPost.slug }}
              className="group relative lg:col-span-2 rounded-3xl overflow-hidden bg-card border border-border min-h-[440px] flex items-end"
            >
              <img
                src={heroPost.image}
                alt={heroPost.title}
                className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              <div className="relative p-8 md:p-10 max-w-2xl">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground px-3 py-1.5 rounded-full">
                  <Flame className="h-3.5 w-3.5" /> Editor's Pick
                </span>
                <h1 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.1] text-foreground">
                  {heroPost.title}
                </h1>
                <p className="mt-4 text-muted-foreground md:text-lg line-clamp-2">{heroPost.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{heroPost.author}</span>
                  <span>•</span>
                  <span>{heroPost.date}</span>
                  <span>•</span>
                  <span>{heroPost.readTime}</span>
                </div>
              </div>
            </Link>
          )}

          {/* Side featured stack */}
          <div className="flex flex-col gap-4">
            {sideFeatured.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex gap-4 p-3 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <img src={p.image} alt={p.title} className="h-24 w-28 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {categoryBySlug(p.category)?.name}
                  </span>
                  <h3 className="mt-1 font-display text-sm font-bold leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <div className="mt-2 text-[11px] text-muted-foreground">{p.readTime}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tagline strip */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 py-6 border-y border-border">
          <p className="font-display text-lg md:text-xl text-foreground/90">
            Real Stories. Real Campuses. <span className="text-primary font-bold">Zero Filters.</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/blog/category/$category"
                params={{ category: c.slug }}
                className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending strip */}
      <section className="bg-card/40 border-y border-border py-14">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl md:text-3xl font-bold">Trending Now</h2>
            <div className="ml-4 flex-1 h-px bg-border" />
            <Link to="/blog" className="text-sm text-primary font-semibold hover:underline">See all</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {trending.map((p, i) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute top-3 left-3 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-black text-sm">
                  {i + 1}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {categoryBySlug(p.category)?.name}
                  </span>
                  <h3 className="mt-1 font-display text-sm font-bold text-white leading-snug line-clamp-3">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category rails */}
      {categories.map((cat) => {
        const posts = blogPosts.filter((p) => p.category === cat.slug).slice(0, 4);
        if (posts.length === 0) return null;
        return (
          <section key={cat.slug} className="container mx-auto px-6 py-14">
            <div className="flex items-end justify-between gap-4 mb-8 border-b border-border pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Category</span>
                <h2 className="mt-1 font-display text-2xl md:text-4xl font-bold">{cat.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{cat.tagline}</p>
              </div>
              <Link
                to="/blog/category/$category"
                params={{ category: cat.slug }}
                className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Explore all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    {p.subtopic && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{p.subtopic}</span>
                    )}
                    <h3 className="mt-1 font-display text-base font-bold leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <div className="mt-3 text-xs text-muted-foreground flex gap-2">
                      <span>{p.author}</span>•<span>{p.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* Newsletter */}
      <section className="container mx-auto px-6 py-14">
        <div className="rounded-3xl bg-gradient-to-br from-primary/25 via-accent/20 to-primary/25 border border-primary/40 p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-background/40 border border-primary/30 px-3 py-1.5 rounded-full">
              <Mail className="h-3.5 w-3.5" /> The CollegeBache Weekly
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold">
              One honest college review. Every Sunday. Free.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Join 1 lakh+ students already reading the CollegeBache Weekly - hand-picked reviews, exam updates and career playbooks in a 5-minute read.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 rounded-full bg-background text-foreground border border-border px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold hover:bg-primary/90 shadow-lg shadow-primary/30"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Latest */}
      <section className="container mx-auto px-6 pb-20">
        <div className="flex items-center gap-2 mb-8">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl md:text-3xl font-bold">Latest Articles</h2>
          <div className="ml-4 flex-1 h-px bg-border" />
          <Link to="/blog" className="text-sm text-primary font-semibold hover:underline">Read all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {categoryBySlug(p.category)?.name}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                <div className="mt-4 text-xs text-muted-foreground flex justify-between border-t border-border pt-4">
                  <span>{p.author}</span>
                  <span>{p.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
