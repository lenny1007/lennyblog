import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';
import { CATEGORY_EMOJI, SITE_TITLE } from '../../consts';

export async function getStaticPaths() {
	const posts = await getCollection('blog');
	return posts.map((post) => ({
		params: { slug: post.id },
		props: { post },
	}));
}

// Load CJK font once (IPA Gothic supports CJK/Chinese characters)
const fontData = readFileSync('/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf');

export const GET: APIRoute = async ({ props }) => {
	const { post } = props;
	const { title, description, category, pubDate } = post.data;

	const emoji = CATEGORY_EMOJI[category ?? ''] ?? '✨';
	const dateStr = pubDate.toLocaleDateString('zh-TW', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	// Truncate title if too long
	const displayTitle = title.length > 28 ? title.slice(0, 27) + '…' : title;
	const displayDesc = description.length > 60 ? description.slice(0, 59) + '…' : description;

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '1200px',
					height: '630px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
					padding: '60px',
					fontFamily: 'IPA Gothic',
					boxSizing: 'border-box',
				},
				children: [
					// Top: Site name + category
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: '20px',
											color: '#94a3b8',
											fontWeight: '600',
											letterSpacing: '0.05em',
										},
										children: SITE_TITLE,
									},
								},
								...(category ? [
									{
										type: 'div',
										props: {
											style: {
												background: '#1e40af',
												color: '#bfdbfe',
												fontSize: '16px',
												fontWeight: '700',
												padding: '4px 14px',
												borderRadius: '9999px',
												marginLeft: '8px',
											},
											children: `${emoji} ${category}`,
										},
									},
								] : []),
							],
						},
					},
					// Middle: Title + description
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								flexDirection: 'column',
								gap: '20px',
								flex: '1',
								justifyContent: 'center',
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: '52px',
											fontWeight: '900',
											color: '#f1f5f9',
											lineHeight: '1.25',
											letterSpacing: '-0.02em',
										},
										children: displayTitle,
									},
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '22px',
											color: '#94a3b8',
											lineHeight: '1.6',
											fontWeight: '400',
										},
										children: displayDesc,
									},
								},
							],
						},
					},
					// Bottom: Author + date
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											display: 'flex',
											alignItems: 'center',
											gap: '12px',
										},
										children: [
											{
												type: 'div',
												props: {
													style: {
														width: '40px',
														height: '40px',
														borderRadius: '50%',
														background: '#2563eb',
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														fontSize: '20px',
													},
													children: '📚',
												},
											},
											{
												type: 'div',
												props: {
													style: {
														fontSize: '18px',
														fontWeight: '700',
														color: '#e2e8f0',
													},
													children: '懶泥陳 Lenny Chen',
												},
											},
										],
									},
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '16px',
											color: '#64748b',
											fontWeight: '500',
										},
										children: dateStr,
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'IPA Gothic',
					data: fontData,
					weight: 400,
					style: 'normal',
				},
				{
					name: 'IPA Gothic',
					data: fontData,
					weight: 700,
					style: 'normal',
				},
				{
					name: 'IPA Gothic',
					data: fontData,
					weight: 900,
					style: 'normal',
				},
			],
		}
	);

	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
