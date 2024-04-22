<script>
	import { currentPage, isMenuOpen } from '../assets/js/store';

	export let href;

	$: isCurrentPage = $currentPage.startsWith(href);

	const maybeCloseMenu = () => {
		if (href != $currentPage) {
			isMenuOpen.set(false);
		}
	};
</script>

<div>
	<li class="text-2xl">
		<a
			{href}
			on:click={maybeCloseMenu}
			class:active={isCurrentPage}
			aria-current={isCurrentPage ? 'page' : false}
		>
			<slot />
		</a>
	</li>
</div>
