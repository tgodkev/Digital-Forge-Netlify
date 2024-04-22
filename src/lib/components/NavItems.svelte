<script>
	import { onMount } from 'svelte';
	import { gsap } from '$lib/gsapConfig';
	import { navItems } from '$lib/config';
	import NavItem from './NavItem.svelte';

	onMount(() => {
		// Define the maximum width for what you consider 'mobile'
		const maxWidthForMobile = 768; // This is a common breakpoint for mobile devices

		if (window.innerWidth <= maxWidthForMobile) {
			gsap.from('.nav-item', {
				duration: 0.4,
				x: 100, // Horizontal slide from the right
				opacity: 0,
				stagger: 0.2,
				ease: 'power1.out'
			});
		}
	});
</script>

<ul
	class="flex flex-col w-fit mx-auto items-start lg:flex-row lg:space-x-5 lg:items-center lg:justify-center"
>
	{#each navItems as page}
		<div class="nav-item">
			<NavItem href={page.route}>
				{page.title}
			</NavItem>
		</div>
	{/each}
</ul>
