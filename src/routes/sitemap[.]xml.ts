import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { blogPosts, categories } from "@/data/blog-posts";

const BASE_URL = "https://www.collegebache.com";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString();

        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/blog", changefreq: "daily", priority: "0.9" },
          { path: "/talk-to-senior", changefreq: "monthly", priority: "0.7" },
        ];

        for (const c of categories) {
          entries.push({
            path: `/blog/category/${c.slug}`,
            changefreq: "weekly",
            priority: "0.8",
          });
        }

        for (const p of blogPosts) {
          entries.push({
            path: `/blog/${p.slug}`,
            changefreq: "monthly",
            priority: "0.8",
          });
        }

        const collegeSet = new Set(
          blogPosts.map((p) => p.college).filter((c): c is string => Boolean(c)),
        );
        for (const college of collegeSet) {
          entries.push({
            path: `/blog/college/${slugify(college)}`,
            changefreq: "weekly",
            priority: "0.7",
          });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
