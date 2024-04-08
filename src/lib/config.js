/**
 * All of these values are used throughout the site – for example,
 * in the <meta> tags, in the footer, and in the RSS feed.
 *
 * PLEASE BE SURE TO UPDATE THEM ALL! Thank you!
 **/

export const siteTitle = 'Digital Forge';
export const siteDescription = 'Forge your digital future with a high conversion website.';
export const siteURL = 'example.com';
export const siteLink = 'https://github.com/josh-collinsworth/sveltekit-blog-starter';
export const siteAuthor = 'Digital Forge';

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 10;

// Edit this to alter the main nav menu. (Also used by the footer and mobile nav.)
export const navItems = [
	{
		title: 'Home',
		route: '/blog'
	},
	{
		title: 'Pricing',
		route: '/blog'
	},
	{
		title: 'Blog',
		route: '/blog'
	},
	{
		title: 'About',
		route: '/about'
	},
	{
		title: 'Contact',
		route: '/contact'
	}
];
