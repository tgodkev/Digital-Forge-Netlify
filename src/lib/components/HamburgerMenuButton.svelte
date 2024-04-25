<script>
	import { isMenuOpen } from '../assets/js/store';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Menu, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { gsap } from '$lib/gsapConfig';
	import { onMount } from 'svelte';
	import { navItems } from '$lib/config';
	import NavItem from './NavItem.svelte';

	onMount(() => {
		// Define the maximum width for what you consider 'mobile'
		const maxWidthForMobile = 768; // This is a common breakpoint for mobile devices

		if (window.innerWidth <= maxWidthForMobile) {
			gsap.from('.nav-item', {
				duration: 0.3,
				x: 100, // Horizontal slide from the right
				opacity: 0,
				stagger: 0.1,
				ease: 'power1.out'
			});
		}
	});
</script>

<span class="sr-only">Toggle hamburger menu</span>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline"><Menu class="text-black" /></Button>
	</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Digital Forge</Sheet.Title>
		</Sheet.Header>
		<Sheet.Description class="flex flex-col pt-3">
			{#each navItems as page}
				<Sheet.Close asChild let:builder>
					<Button class="nav-item" builders={[builder]} variant="ghost" href={page.route}
						>{page.title}</Button
					>
				</Sheet.Close>
			{/each}
		</Sheet.Description>
	</Sheet.Content>
</Sheet.Root>
