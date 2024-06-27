<script lang="ts">
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button/index.js';

	import { gsap } from '$lib/gsapConfig';

	onMount(() => {
		gsap.from('input, label, button', {
			duration: 1,
			x: -500, // Horizontal slide from left
			opacity: 0,
			stagger: 0.3, // Time delay between starting animations for each input
			ease: 'power1.out'
		});
	});

	export let location: string;
</script>

<section class="p-5">
	<form
		name="{location}-page-form"
		class="max-w-2xl"
		method="POST"
		netlify-honeypot="bot-field"
		data-netlify="true"
	>
		<input type="hidden" name="form-name" value="{location}-page-form" />
		<label for="name">Name</label>
		<Input name="name" id="name" required placeholder="Name" type="text" />
		<label for="email">Email</label>
		<Input name="email" id="email" required placeholder="Email" type="email" />
		<label for="message">Message</label>
		<Input name="message" id="message" required placeholder="Message" type="text" />
		<Button type="submit" class="mt-2" size="lg" value="Submit">Submit</Button>
	</form>
</section>
