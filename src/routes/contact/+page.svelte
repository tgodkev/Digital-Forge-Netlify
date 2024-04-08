<script>
	import Callout from '$lib/components/Callout.svelte';
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<h1>Contact</h1>

<Callout>This form does nothing! It's just here to show default styling.</Callout>

<form name="netlify-form-example" method="POST" netlify-honeypot="bot-field" data-netlify="true">
	<div class="form-section">
		<label for="name">Name</label>
		<input type="text" id="name" placeholder="First name" />
	</div>

	<div class="form-section">
		<label for="email">Email</label>
		<input type="email" id="email" placeholder="Email address" />
		<input type="submit" value="Submit" />
	</div>
</form>
