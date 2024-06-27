<script>
	import MainNav from './MainNav.svelte';
	import HamburgerMenuButton from './HamburgerMenuButton.svelte';
	import Logo from './Logo.svelte';
</script>

<header class="grid grid-cols-3 text-white bg-primary lg:grid-cols-12">
	<div class="col-span-2 lg:col-span-4">
		<div class="w-32 lg:w-44 lg:h-44">
			<a href="/" class="">
				<Logo />
			</a>
		</div>
	</div>
	<div
		class="lg:block place-self-center lg:col-span-4 lg:col-start-10 lg:text-3xl lg:place-self-center"
	>
		<MainNav />
	</div>
</header>
