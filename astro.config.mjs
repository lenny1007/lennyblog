// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://lennychen.com',
	integrations: [
		mdx(),
		react(),
		sitemap({
			filter: (page) => !page.includes('/search'),
			serialize(item) {
				if (item.url === 'https://lennychen.com/') {
					return { ...item, changefreq: 'daily', priority: 1.0 };
				}
				if (item.url.includes('/blog/')) {
					return { ...item, changefreq: 'weekly', priority: 0.8 };
				}
				return { ...item, changefreq: 'monthly', priority: 0.5 };
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
