import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const index = posts.map((post) => ({
		id: post.id,
		title: post.data.title,
		description: post.data.description,
		category: post.data.category ?? '',
		tags: post.data.tags ?? [],
		pubDate: post.data.pubDate.toISOString().slice(0, 10),
		url: `/blog/${post.id}/`,
	}));

	return new Response(JSON.stringify(index), {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
};
