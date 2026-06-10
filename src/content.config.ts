import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
  Two content collections. To change the site's data you edit Markdown files —
  nothing else. Each file's name becomes its URL slug.

  experiments/  → one file per compound. Drives the matrix table, the experiment
                  cards, the "Oneirogens tested" count, and a detail page each.
  journal/      → one file per post. Drives the journal list, the tag filter,
                  and a detail page each.
*/

const experiments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiments' }),
  schema: z.object({
    entry: z.number(),                 // matrix entry number, e.g. 23
    title: z.string(),                 // compound name
    dose: z.string().default('—'),
    protocol: z.string().default('None'),
    recall: z.number().min(0).max(5).nullable().default(null),    // 0–5 or leave out
    lucidity: z.number().min(0).max(5).nullable().default(null),  // 0–5 or leave out
    meta: z.string().optional(),       // small line under the card title
    summary: z.string(),               // one line: used as the matrix "notes" + card blurb
    tags: z.array(z.string()).default([]),
    nullResult: z.boolean().default(false), // true = style the first tag as a null marker
    draft: z.boolean().default(false), // true = hide everywhere
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),             // YYYY-MM-DD
    kind: z.enum(['Entry', 'Field Note', 'Null Result', 'Matrix Update']).default('Entry'),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { experiments, journal };
