<script>
	import MainNav from './MainNav.svelte';
	import HamburgerMenuButton from './HamburgerMenuButton.svelte';
	import Logo from './Logo.svelte';
	import { siteTitle } from '$lib/config';

	const focusMain = () => {
		const main = document.querySelector('main');
		main.focus();
	};
</script>

<header class="bg-primary text-white lg:grid lg:grid-cols-12">
	<div class=" col-span-2">
		<a href="/" class="">
			<Logo />
		</a>
	</div>
	<div class="lg:col-span-10 lg:col-start-4 lg:text-3xl">
		<HamburgerMenuButton />
		<MainNav />
	</div>
</header>
