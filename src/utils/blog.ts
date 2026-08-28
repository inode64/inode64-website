import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export function postSlug(post: BlogPost): string {
  return post.id.replace(/\.md$/i, "");
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog", (post) => post.data.isDraft !== true);

  return posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}
