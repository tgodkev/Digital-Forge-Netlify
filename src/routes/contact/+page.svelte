<script>
	import Callout from '$lib/components/Callout.svelte';
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<h1>Contact</h1>

<Callout>This form does nothing! It's just here to show default styling.</Callout>

<form on:submit|preventDefault>
	<div class="form-section">
		<label for="name">Name</label>
		<input type="text" id="name" placeholder="First name" />
	</div>

	<div class="form-section">
		<label for="email">Email</label>
		<input type="email" id="email" placeholder="Email address" />
	</div>

	<input type="submit" value="Submit" />
</form>
