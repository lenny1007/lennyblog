// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://lennyblog.vercel.app', // Update this to your actual domain once deployed
	integrations: [mdx(), sitemap()],
});
