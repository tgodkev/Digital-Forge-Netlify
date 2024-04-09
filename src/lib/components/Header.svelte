<script>
	import MainNav from './MainNav.svelte';
	import HamburgerMenuButton from './HamburgerMenuButton.svelte';
	import { siteTitle } from '$lib/config';

	const focusMain = () => {
		const main = document.querySelector('main');
		main.focus();
	};
</script>

<header class="bg-primary text-white">
	<a href="/" class="site-title">
		<h3>{siteTitle}</h3>
	</a>

	<HamburgerMenuButton />
	<MainNav />
</header>
