<script>
	import MainNav from './MainNav.svelte';
	import HamburgerMenuButton from './HamburgerMenuButton.svelte';
	import Logo from './Logo.svelte';
</script>

<header class="bg-primary text-white lg:grid lg:grid-cols-12">
	<div class=" col-span-4">
		<div class="w-44 h-44">
			<a href="/" class="">
				<Logo />
			</a>
		</div>
	</div>
	<div class="lg:block lg:col-span-4 lg:col-start-8 lg:text-3xl lg:place-self-center">
		<MainNav />
	</div>
</header>
