<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
</script>

<Accordion.Root>
	<Accordion.Item class="border-2 border-black " value="item-1">
		<Accordion.Trigger class="border-none bg-primary text-white text-center"
			>Is it accessible?</Accordion.Trigger
		>
		<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item class="border-2 border-black " value="item-2">
		<Accordion.Trigger class="border-none">Is it accessible?</Accordion.Trigger>
		<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item class="border-2 border-black " value="item-3">
		<Accordion.Trigger class="border-none">Is it accessible?</Accordion.Trigger>
		<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
