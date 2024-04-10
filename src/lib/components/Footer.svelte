<script>
	import { siteAuthor } from '$lib/config';
	import NavItems from './NavItems.svelte';
	import Logo from './Logo.svelte';
</script>

<footer class="bg-accent text-white">
	<nav>
		<ul>
			<li>
				<a href="/api/rss.xml" data-sveltekit-reload>RSS</a>
			</li>
			<li>
				<a href="/">Home</a>
			</li>
		</ul>
	</nav>
	<nav>
		<NavItems />
	</nav>

	<div>
		<div class="h-44 w-44">
			<Logo />
		</div>
		<p>&copy;{new Date().getFullYear()} {siteAuthor}</p>
	</div>
</footer>
