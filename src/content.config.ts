import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: z.string(),
    category: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    isDraft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
