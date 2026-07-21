import { Link } from "@tanstack/react-router";
import { blogPosts, categories } from "@/data/blog-posts";

export function Footer() {
  const popularBlogs = blogPosts.slice(0, 5);

  return (
    <footer className="bg-card text-foreground mt-24 border-t border-border">
      <div className="container mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <span className="font-display font-black text-primary-foreground text-lg leading-none">Cb</span>
            </span>
            <h3 className="font-display text-xl font-bold">
              College<span className="text-primary">Bache</span>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            India's student-first education blog. Honest engineering college reviews, exam guides, branch deep-dives and career playbooks - written by real students.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/blog/category/$category"
                  params={{ category: c.slug }}
                  className="hover:text-primary transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Popular Blogs</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {popularBlogs.map((p) => (
              <li key={p.slug}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary transition-colors line-clamp-1">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/blog" className="hover:text-primary">All Articles</Link></li>
            <li><Link to="/talk-to-senior" className="hover:text-primary">Talk to a Senior</Link></li>
            <li><a href="#" className="hover:text-primary">Write for us</a></li>
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-6 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} CollegeBache. Built by students, for students.
        </div>
      </div>
    </footer>
  );
}
