import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { blogPosts, categories, categoryBySlug, type BlogPost } from "@/data/blog-posts";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/blog/category/$category")({
  component: CategoryLanding,
  loader: ({ params }) => {
    const category = categoryBySlug(params.category);
    if (!category) throw notFound();
    const posts = blogPosts.filter((p) => p.category === category.slug);
    return { category, posts };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center text-center px-6 py-24">
        <div>
          <h1 className="font-display text-4xl font-bold">Category not found</h1>
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
      <p className="text-muted-foreground">Something went wrong loading this category.</p>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.name} - CollegeBache Blog` },
          { name: "description", content: loaderData.category.description },
          { property: "og:title", content: `${loaderData.category.name} - CollegeBache` },
          { property: "og:description", content: loaderData.category.description },
        ]
      : [{ title: "Category - CollegeBache" }, { name: "robots", content: "noindex" }],
  }),
});

function CategoryLanding() {
  const { category, posts } = Route.useLoaderData();
  const [hero, ...rest] = posts;
  const others = rest;

  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-card border-b border-border py-14">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{category.name}</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Category</span>
          <h1 className="mt-2 font-display text-4xl md:text-6xl font-bold">{category.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{category.description}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
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

      {posts.length === 0 && (
        <div className="container mx-auto px-6 py-24 text-center text-muted-foreground">
          No articles in this category yet. Check back soon.
        </div>
      )}

      {hero && (
        <section className="container mx-auto px-6 py-14">
          <Link
            to="/blog/$slug"
            params={{ slug: hero.slug }}
            className="group grid md:grid-cols-2 gap-8 items-center rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all"
          >
            <div className="aspect-[16/11] overflow-hidden">
              <img src={hero.image} alt={hero.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 md:p-10">
              {hero.subtopic && (
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{hero.subtopic}</span>
              )}
              <h2 className="mt-2 font-display text-2xl md:text-4xl font-bold leading-tight group-hover:text-primary transition-colors">
                {hero.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{hero.excerpt}</p>
              <div className="mt-6 text-xs text-muted-foreground">
                {hero.author} • {hero.date} • {hero.readTime}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-primary font-semibold text-sm">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {others.length > 0 && (
        <section className="container mx-auto px-6 pb-20">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-bold">More in {category.name}</h2>
            <span className="ml-2 text-sm text-muted-foreground">({others.length})</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p: BlogPost) => (
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
                  {p.subtopic && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{p.subtopic}</span>
                  )}
                  <h3 className="mt-1 font-display text-lg font-bold leading-snug group-hover:text-primary transition-colors">
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
      )}

      <Footer />
    </div>
  );
}
