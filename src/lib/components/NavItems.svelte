<script>
	import { navItems } from '$lib/config';
	import NavItem from './NavItem.svelte';
</script>

<ul class="lg:flex lg:space-x-5 lg:items-center lg:justify-center">
	{#each navItems as page}
		<NavItem href={page.route}>
			{page.title}
		</NavItem>
	{/each}
</ul>
