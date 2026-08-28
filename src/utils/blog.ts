import { getCollection, type CollectionEntry } from "astro:content";

export async function getPublishedPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", (post) => post.data.isDraft !== true);

  return posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}
