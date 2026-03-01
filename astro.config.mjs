// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Keystatic 只在開發時啟動（生產 build 保持純靜態）
const isDev = process.env.NODE_ENV !== 'production';
const devIntegrations = isDev
	? [await import('@keystatic/astro').then((m) => m.default())]
	: [];

export default defineConfig({
	site: 'https://lennychen.com',
	integrations: [
		mdx(),
		react(),
		...devIntegrations,
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
