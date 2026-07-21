import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { blogPosts, colleges, categoryBySlug, type BlogPost } from "@/data/blog-posts";
import { ArrowLeft, ArrowRight, MapPin, BookOpen } from "lucide-react";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const Route = createFileRoute("/blog/college/$college")({
  component: CollegeLanding,
  loader: ({ params }) => {
    const college = colleges.find((c) => c !== "All Colleges" && slugify(c) === params.college);
    if (!college) throw notFound();
    const posts = blogPosts.filter((p) => p.college === college);
    return { college, posts };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center text-center px-6 py-24">
        <div>
          <h1 className="font-display text-4xl font-bold">College not found</h1>
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
      <p className="text-muted-foreground">Something went wrong loading this college.</p>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.college} - Reviews, Placements & Student Life | CollegeBache` },
          { name: "description", content: `Honest student-written reviews, placements, hostel life, and admissions guides for ${loaderData.college}.` },
          { property: "og:title", content: `${loaderData.college} - CollegeBache` },
          { property: "og:description", content: `End-to-end reviews of ${loaderData.college} from current students and alumni.` },
        ]
      : [{ title: "College - CollegeBache" }, { name: "robots", content: "noindex" }],
  }),
});

function CollegeLanding() {
  const { college, posts } = Route.useLoaderData();
  const state = posts.find((p: BlogPost) => p.state)?.state;

  return (
    <div className="min-h-screen">
      <Header />
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs">
            <span className="font-semibold text-primary bg-primary/15 border border-primary/30 px-3 py-1 rounded-full uppercase tracking-wider">College Landing</span>
            {state && (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {state}
              </span>
            )}
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">{college}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Every article, review, and student story published on CollegeBache about {college} - academics, placements, hostel life, food, fests, and the honest cons.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/talk-to-senior" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 shadow-lg shadow-primary/30">
              Talk to a Senior from {college} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-6 py-3 font-semibold hover:border-primary">
              Browse all blogs
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl font-bold">Articles on {college}</h2>
          <span className="ml-2 text-sm text-muted-foreground">({posts.length})</span>
        </div>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No articles yet - check back soon or explore the full blog.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((p: BlogPost) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-primary bg-primary/15 border border-primary/30 px-2.5 py-1 rounded-full">{categoryBySlug(p.category)?.name}</span>
                  <h3 className="mt-4 font-display text-xl font-bold leading-tight group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  <div className="mt-5 pt-5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.author}</span>
                    <span>{p.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
