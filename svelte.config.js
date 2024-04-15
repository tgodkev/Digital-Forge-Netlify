import adapter from '@sveltejs/adapter-netlify';
import { mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Ensures both .svelte and .md files are treated as components (can be imported and used anywhere, or used as pages)
	extensions: ['.svelte', '.md'],

	preprocess: [
		mdsvex({
			// The default mdsvex extension is .svx; this overrides that.
			extensions: ['.md'],

			// Adds IDs to headings, and anchor links to those IDs. Note: must stay in this order to work.
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
		}),

		vitePreprocess()
	],

	kit: {
		adapter: adapter(),
		prerender: {
			entries: [
				'*',
				'/api/posts/page/*',
				'/blog/category/*/page/',
				'/blog/category/*/page/*',
				'/blog/category/page/',
				'/blog/category/page/*',
				'/blog/page/',
				'/blog/page/*'
			]
		},
		alias: {
			'@/*': './path/to/lib/*'
		}
	}
};

export default config;
