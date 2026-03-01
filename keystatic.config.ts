import { config, collection, fields } from '@keystatic/core';

const CATEGORY_OPTIONS = [
	{ label: '閱讀筆記 📖', value: '閱讀筆記' },
	{ label: '健康 🌿', value: '健康' },
	{ label: '技術 💻', value: '技術' },
	{ label: 'AI 🤖', value: 'AI' },
	{ label: '學習 🧠', value: '學習' },
	{ label: '創業 🚀', value: '創業' },
	{ label: '產品 🎯', value: '產品' },
	{ label: 'Python 🐍', value: 'Python' },
	{ label: '工作、職場 💼', value: '工作、職場' },
	{ label: '人生智慧 ✨', value: '人生智慧' },
	{ label: 'SEO 🔍', value: 'SEO' },
] as const;

export default config({
	storage: {
		kind: 'local',
	},

	ui: {
		brand: {
			name: '懶泥陳的閱讀書房',
		},
	},

	collections: {
		blog: collection({
			label: '文章',
			slugField: 'title',
			path: 'src/content/blog/**/*',
			format: { contentField: 'content' },
			entryLayout: 'content',
			schema: {
				title: fields.slug({
					name: { label: '標題', validation: { isRequired: true } },
				}),
				description: fields.text({
					label: '摘要',
					multiline: true,
					validation: { isRequired: true },
				}),
				pubDate: fields.date({
					label: '發布日期',
					validation: { isRequired: true },
					defaultValue: { kind: 'today' },
				}),
				updatedDate: fields.date({
					label: '更新日期',
				}),
				category: fields.select({
					label: '分類',
					options: CATEGORY_OPTIONS,
					defaultValue: '閱讀筆記',
				}),
				tags: fields.array(
					fields.text({ label: '標籤' }),
					{
						label: '標籤',
						itemLabel: (props) => props.fields.value.value ?? '標籤',
					},
				),
				heroImage: fields.text({
					label: '封面圖片 URL',
					validation: { isRequired: false },
				}),
				content: fields.document({
					label: '內容',
					formatting: true,
					dividers: true,
					links: true,
					images: true,
				}),
			},
		}),
	},
});
