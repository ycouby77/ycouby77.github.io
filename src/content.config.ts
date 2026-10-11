import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One folder per project: src/content/projects/<slug>/index.md plus its images.
// The folder name becomes the URL: /projects/<slug>.
const projects = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Display order on the home page (1 = first).
      order: z.number(),
      // Featured projects get a full case-study card; the rest are listed compactly.
      featured: z.boolean().default(false),
      // Short context label, e.g. "ARM Lab research" or "Personal build".
      context: z.string(),
      period: z.string(),
      disciplines: z.array(z.string()),
      summary: z.string(),
      objective: z.string().optional(),
      tools: z.array(z.string()).default([]),
      // Key/value rows rendered as a spec table / drawing title block.
      specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      results: z.array(z.string()).default([]),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            label: z.string(),
            caption: z.string(),
            // CAD renders on a plain backdrop: the backdrop colour. Where the image must fit a
            // fixed box, it's shown whole on this colour (seamless) instead of being cropped.
            matte: z.string().optional(),
          }),
        )
        .default([]),
      // 'stack' shows images full-width at their own aspect ratio (good for UI screenshots).
      galleryLayout: z.enum(['grid', 'stack']).default('grid'),
      // Image for the home-page card only, when the case study shouldn't show it
      // (e.g. the flood sim, whose page has the live map instead).
      cover: z.object({ src: image(), alt: z.string() }).optional(),
      // Shown under the gallery, e.g. confidentiality notes.
      galleryNote: z.string().optional(),
      links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
      // Prior work this project builds on, shown as citation cards.
      references: z
        .array(
          z.object({
            title: z.string(),
            authors: z.string(),
            venue: z.string(),
            year: z.number(),
            url: z.url(),
            note: z.string(),
            image: image().optional(),
          }),
        )
        .default([]),
      // Interactive flood map; src is JSON from `python -m floodsim.export_web`.
      simulation: z.object({ src: z.string() }).optional(),
      // Interactive 3D viewer. Files live in public/models/<slug>/ (.glb, .gltf or .stl).
      viewer: z
        .object({
          title: z.string(),
          note: z.string().optional(),
          models: z
            .array(
              z.object({
                label: z.string(),
                src: z.string().regex(/\.(glb|gltf|stl)$/i, 'Use a .glb, .gltf or .stl file'),
                // Shown under the canvas when this model is selected.
                caption: z.string().optional(),
                // Extra rotation in degrees [x, y, z] for exports whose "up" isn't +Y.
                rotation: z.tuple([z.number(), z.number(), z.number()]).optional(),
                // 'plastic' replaces the file's materials (for exports that carry no colours).
                finish: z.enum(['original', 'plastic']).default('original'),
              }),
            )
            .min(1),
        })
        .optional(),
    }),
});

export const collections = { projects };
