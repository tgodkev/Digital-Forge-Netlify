<script>
	import { onMount } from 'svelte';
	import { gsap } from '$lib/gsapConfig';
	import { navItems } from '$lib/config';
	import NavItem from './NavItem.svelte';
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
