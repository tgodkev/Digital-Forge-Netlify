<script>
	import Callout from '$lib/components/Callout.svelte';
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<h1>Contact</h1>

<form name="netlify-form-example" method="POST" netlify-honeypot="bot-field" data-netlify="true">
	<input type="hidden" name="form-name" value="netlify-form-example" />
	<label for="name">Name</label>
	<input name="name" id="name" required placeholder="Name" type="text" />
	<label for="email">Email</label>
	<input name="email" id="email" required placeholder="Email" type="email" />
	<label for="message">Message</label>
	<input name="message" id="message" required placeholder="Message" type="text" />
	<input type="submit" value="Submit" />
</form>
