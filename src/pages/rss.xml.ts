import rss from "@astrojs/rss";
import { getPublishedPosts } from "@/utils/blog";

export async function GET() {
  const visiblePosts = await getPublishedPosts();

  return rss({
    title: "Inode64's Blog",
    description: "Últimos artículos y noticias",
    site: import.meta.env.WEBSITE_URL || "https://inode64.com",
    items: visiblePosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}
