<script>
	import { isMenuOpen } from '../assets/js/store';
	import { Menu, X } from 'lucide-svelte';

	export let closeOnly = false;
	export let open = false;

	const toggleIsMenuOpen = () => {
		isMenuOpen.set(!$isMenuOpen);
	};
</script>

<span class="sr-only">Toggle hamburger menu</span>
<button
	class="text-white hover:text-gray-700 cursor-pointer mr-4 border-none focus:outline-none"
	class:closeOnly
	on:click={() => (closeOnly = !closeOnly)}
>
	<svg width="32" height="24">
		<line id="top" x1="0" y1="2" x2="32" y2="2" />
		<line id="middle" x1="0" y1="12" x2="24" y2="12" />
		<line id="bottom" x1="0" y1="22" x2="32" y2="22" />
	</svg>
</button>

<style>
	svg {
		min-height: 24px;
		transition: transform 0.3s ease-in-out;
	}

	svg line {
		stroke: currentColor;
		stroke-width: 3;
		transition: transform 0.3s ease-in-out;
	}

	button {
		z-index: 20;
	}

	.closeOnly svg {
		transform: scale(0.7);
	}

	.closeOnly #top {
		transform: translate(6px, 0px) rotate(45deg);
	}

	.closeOnly #middle {
		opacity: 0;
	}

	.closeOnly #bottom {
		transform: translate(-12px, 9px) rotate(-45deg);
	}
</style>
