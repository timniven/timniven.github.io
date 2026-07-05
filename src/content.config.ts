import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/publications' }),
  schema: z.object({
    authors: z.string(),
    year: z.number(),
    title: z.string(),
    venue: z.string(),
    pages: z.string().optional(),
    url: z.string().optional(),
  }),
});

export const collections = { publications };
