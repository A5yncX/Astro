import rss from "@astrojs/rss";
import { siteConfig } from "@/site-config";
import { getAllPosts } from "@/utils";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export const GET = async () => {
	const posts = await getAllPosts();
	// 将文章按照时间降序排列
	posts.sort((a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate));

	return rss({
		title: siteConfig.title,
		description: siteConfig.title,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.title,
			pubDate: post.data.publishDate,
			link: `posts/${post.slug}`,
			content: sanitizeHtml(parser.render(post.body)),
		})),
	});
};

