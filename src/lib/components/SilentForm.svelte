<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button/index.js';
	export let location: string;
</script>

<form
	name="contact-form"
	class="hidden"
	method="POST"
	netlify-honeypot="bot-field"
	data-netlify="true"
>
	<input type="hidden" name="form-name" value="contact-form" />
	<label for="name">Name</label>
	<Input name="name" id="name" required placeholder="Name" type="text" />
	<label for="email">Email</label>
	<Input name="email" id="email" required placeholder="Email" type="email" />
	<label for="message">Message</label>
	<Input name="message" id="message" required placeholder="Message" type="text" />
	<Button type="submit" class="mt-2" size="lg" value="Submit">Submit</Button>
</form>
