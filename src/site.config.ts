import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "AsyncX",
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	title: "AsyncX",
	// Meta property used as the default description meta property
	// description: " ",
	// HTML lang property, found in src/layouts/Base.astro L:18
	lang: "zh-CN",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "zh-CN",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "zh-CN",
		options: {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		},
	},
	// Include view-transitions: https://docs.astro.build/en/guides/view-transitions/
	includeViewTransitions: true,
	webmentions: {
		link: " ",
	},
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string }> = [
	{
		title: "Home",
		path: "/",
	},
	{
		title: "Blog",
		path: "/posts/",
	},
	{
		title: "📖",
		path: "https://lib.asyncx.top",
	},
	{
		title: "About",
		path: "/about/",
	},
];
