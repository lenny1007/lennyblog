export const SITE_TITLE = '懶泥陳的閱讀書房';
export const SITE_DESCRIPTION = '透過輸出轉化自己的閱讀，也希望能讓偶然逛到這裡的你能更喜歡閱讀。';
export const SITE_AUTHOR = 'Lenny Chen';

// 單一來源：分類名稱 → Emoji（依實際文章分類）
export const CATEGORY_EMOJI: Record<string, string> = {
	'閱讀筆記':   '📖',
	'健康':       '🌿',
	'技術':       '💻',
	'AI':         '🤖',
	'學習':       '🧠',
	'創業':       '🚀',
	'產品':       '🎯',
	'Python':     '🐍',
	'工作、職場': '💼',
	'人生智慧':   '✨',
	'SEO':        '🔍',
};

// Footer / 導覽用的分類清單（依文章數排序）
export const CATEGORIES = Object.entries(CATEGORY_EMOJI).map(([name, emoji]) => ({ name, emoji }));
