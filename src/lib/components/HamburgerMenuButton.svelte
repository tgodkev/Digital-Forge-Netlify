<script>
	import { isMenuOpen } from '../assets/js/store';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Menu, X } from 'lucide-svelte';
	import NavItems from './NavItems.svelte';

	export let closeOnly = false;
	export let open = false;

	const toggleIsMenuOpen = () => {
		isMenuOpen.set(!$isMenuOpen);
	};
</script>

<span class="sr-only">Toggle hamburger menu</span>

<Sheet.Root>
	<Sheet.Trigger>
		<Menu />
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
			<Sheet.Description>
				<NavItems />
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>

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
