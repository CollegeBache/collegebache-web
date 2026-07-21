import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { categories } from "@/data/blog-posts";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg shrink-0">
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
            <span className="font-display font-black text-primary-foreground text-lg leading-none">Cb</span>
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-brand ring-2 ring-background" />
          </span>
          <span className="text-foreground tracking-tight">
            College<span className="text-primary">Bache</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors [&.active]:text-primary">Home</Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/blog/category/$category"
              params={{ category: c.slug }}
              className="text-foreground/80 hover:text-primary transition-colors [&.active]:text-primary"
            >
              {c.name}
            </Link>
          ))}
          <Link to="/blog" className="text-foreground/80 hover:text-primary transition-colors [&.active]:text-primary">All Blogs</Link>
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/blog"
            aria-label="Search articles"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 hover:text-primary hover:border-primary transition-colors"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            to="/talk-to-senior"
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Talk to a Senior
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-6 py-5 flex flex-col gap-3 text-sm">
            <Link to="/" onClick={() => setOpen(false)} className="py-2">Home</Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/blog/category/$category"
                params={{ category: c.slug }}
                onClick={() => setOpen(false)}
                className="py-2"
              >
                {c.name}
              </Link>
            ))}
            <Link to="/blog" onClick={() => setOpen(false)} className="py-2">All Blogs</Link>
            <Link to="/talk-to-senior" onClick={() => setOpen(false)} className="py-2 text-primary font-semibold">
              Talk to a Senior
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
