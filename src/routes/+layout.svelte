<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { currentPage, isMenuOpen } from '../lib/assets/js/store.js';
	import { navItems } from '$lib/config';
	import { preloadCode } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { siteTitle, siteURL } from '$lib/config.js';
	import { gsap } from '$lib/gsapConfig';
	import Logo from '$lib/components/Logo.svelte';

	import '@fontsource/galindo';
	import '@fontsource/cormorant-garamond';
	import '../app.postcss';
	export let data;

	/**
	 * Updates the global store with the current path. (Used for highlighting
	 * the current page in the nav, but could be useful for other purposes.)
	 **/
	$: currentPage.set(data.path);

	/**
	 * This pre-fetches all top-level routes on the site in the background for faster loading.
	 * https://kit.svelte.dev/docs/modules#$app-navigation-preloaddata
	 *
	 * Any route added in src/lib/config.js will be preloaded automatically. You can add your
	 * own preloadData() calls here, too.
	 **/
	onMount(() => {
		customEnter();
		const navRoutes = navItems.map((item) => item.route);
		preloadCode(...navRoutes);
	});

	let overlay;

	function customEnter(node) {
		// Ensure the overlay starts off the screen to the left
		gsap.set(overlay, { x: '-100%', display: 'block' });

		// Animate overlay to cover the screen
		gsap.to(overlay, {
			x: '0%',
			duration: 0.4,
			ease: 'power1.inOut',
			onComplete: () => {
				// After covering, animate the overlay to slide out to the right
				gsap.to(overlay, {
					x: '100%',
					duration: 0.6,
					ease: 'power1.inOut',
					onComplete: () => {
						// Hide overlay after animation to prevent it from blocking interaction
						gsap.set(overlay, { display: 'none' });
					}
				});
			}
		});
	}

	function customLeave(node) {
		// Optionally fade out content quickly before new content comes in
		gsap.to(node, {
			opacity: 0,
			duration: 0.1,
			ease: 'power1.inOut'
		});
	}
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title={siteTitle}
		href="http://{siteURL}/api/rss.xml"
	/>
</svelte:head>

<!--
	The below markup is used on every page in the site. The <slot> is where the page's
	actual contents will show up.
-->
<div class:open={$isMenuOpen}>
	<Header />
	{#key $currentPage}
		<main tabindex="-1">
			<slot />
			<div
				in:customEnter
				out:customLeave
				bind:this={overlay}
				class="fixed inset-0 z-50 hidden h-screen overlay bg-accent"
			>
				<div class="lg:w-[450px] lg:h-[450px] lg:mx-auto lg:mt-20">
					<Logo />
				</div>
			</div>
		</main>
	{/key}
	<Footer />
</div>
