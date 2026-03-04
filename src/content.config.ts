import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx,mdoc}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.string().optional(),
			category: z.string().optional(),
			subcategories: z.array(z.string()).optional(),
			tags: z.array(z.string()).optional(),
		featured: z.boolean().optional(),
		rating: z.coerce.number().min(1).max(5).optional(),
		series: z.string().optional(),
		seriesOrder: z.coerce.number().optional(),
		}),
});

export const collections = { blog };
