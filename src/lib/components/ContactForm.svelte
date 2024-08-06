<script lang="ts">
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button/index.js';
	import { gsap } from '$lib/gsapConfig';

	onMount(() => {
		gsap.from('.anim-label, .anim-input, .anim-button', {
			duration: 1,
			x: -500, // Horizontal slide from left
			opacity: 0,
			stagger: 0.3, // Time delay between starting animations for each element
			ease: 'power1.out'
		});
	});

	export let location: string;
</script>

<section class="p-5">
	<form
		name={`${location}-form`}
		class="max-w-2xl"
		method="POST"
		netlify-honeypot="bot-field"
		data-netlify="true"
	>
		<input type="hidden" name="form-name" value={`${location}-form`} />
		<label for="name" class="anim-label">Name</label>
		<Input class="anim-input" name="name" id="name" required placeholder="Name" type="text" />
		<label for="email" class="anim-label">Email</label>
		<Input class="anim-input" name="email" id="email" required placeholder="Email" type="email" />
		<label for="message" class="anim-label">Message</label>
		<Input
			class="anim-input"
			name="message"
			id="message"
			required
			placeholder="Message"
			type="text"
		/>
		<Button class="anim-button mt-2" type="submit" size="lg" value="Submit">Submit</Button>
	</form>
</section>
