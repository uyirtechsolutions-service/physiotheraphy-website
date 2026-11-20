import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const publicPaths = ["/", "/services", "/about", "/contact", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
}
