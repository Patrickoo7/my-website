import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    year: z.number(),
    featured: z.boolean().default(false),
    repo: z.string().url().optional(),
    link: z.string().url().optional(),
    category: z.enum(['research', 'engineering']).default('engineering'),
    highlight: z.string().optional(),
    order: z.number().default(0),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    type: z.enum(['paper', 'preprint', 'talk', 'poster', 'thesis']).default('paper'),
    url: z.string().url().optional(),
    pdf: z.string().optional(),
    code: z.string().url().optional(),
    note: z.string().optional(),
    order: z.number().default(0),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    start: z.string(),
    end: z.string().default('Present'),
    kind: z.enum(['research', 'industry', 'teaching', 'other']).default('industry'),
    order: z.number().default(0),
  }),
});

export const collections = { projects, publications, experience };
