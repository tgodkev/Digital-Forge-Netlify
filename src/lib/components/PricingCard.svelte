<script lang="ts">
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="shadow-accent hover:shadow-primary shadow-xl">
	<Card.Header>
		<Card.Title><slot name="title">Missing Title</slot></Card.Title>
	</Card.Header>
	<Card.Content>
		<slot name="content">Missing Content</slot>
	</Card.Content>
</Card.Root>
