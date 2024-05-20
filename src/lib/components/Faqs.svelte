<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
</script>

<Accordion.Root>
	<Accordion.Item class="px-5 border-2 border-black rounded-md shadow-xl" value="item-1">
		<Accordion.Trigger class="border-none">Is it accessible?</Accordion.Trigger>
		<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item class="px-5 my-2 border-2 border-black rounded-md shadow-xl" value="item-2">
		<Accordion.Trigger class="border-none">What is the cost of a custom website?</Accordion.Trigger>
		<Accordion.Content
			>The cost varies based on the complexity and features of the website. Contact us for a
			personalized quote.</Accordion.Content
		>
	</Accordion.Item>
	<Accordion.Item class="px-5 border-2 border-black rounded-md shadow-xl" value="item-3">
		<Accordion.Trigger class="border-none">Do you offer payment plans?</Accordion.Trigger>
		<Accordion.Content
			>Yes, we offer flexible payment plans. Only a percentage of the total cost is needed upfront,
			and the rest can be paid in installments.</Accordion.Content
		>
	</Accordion.Item>
	<Accordion.Item class="px-5 my-2 border-2 border-black rounded-md shadow-xl" value="item-4">
		<Accordion.Trigger class="border-none"
			>How long does it take to build a custom website?</Accordion.Trigger
		>
		<Accordion.Content
			>Timelines can vary depending on the project scope. Typically, a custom website can take
			anywhere from 4 to 12 weeks from start to finish.</Accordion.Content
		>
	</Accordion.Item>
	<Accordion.Item class="px-5 border-2 border-black rounded-md shadow-xl" value="item-5">
		<Accordion.Trigger class="border-none">Will my website be mobile-friendly?</Accordion.Trigger>
		<Accordion.Content
			>Yes, all our websites are designed to be fully responsive and mobile-friendly, ensuring a
			seamless experience across all devices.</Accordion.Content
		>
	</Accordion.Item>
	<Accordion.Item class="px-5 my-2 border-2 border-black rounded-md shadow-xl" value="item-6">
		<Accordion.Trigger class="border-none">Do you provide ongoing support?</Accordion.Trigger>
		<Accordion.Content
			>Yes, we offer ongoing support and maintenance packages to keep your website running smoothly
			and up to date.</Accordion.Content
		>
	</Accordion.Item>
	<Accordion.Item class="px-5 border-2 border-black rounded-md shadow-xl" value="item-7">
		<Accordion.Trigger class="border-none"
			>Can I update my website content myself?</Accordion.Trigger
		>
		<Accordion.Content>
			Absolutely! Our websites come with easy-to-use content management systems that allow you to
			update major content areas like blog posts and services. However, to ensure optimal SEO and
			design consistency, the main content of the pages will be managed by our team.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
