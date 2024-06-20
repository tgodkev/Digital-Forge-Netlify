<script>
	import GuyOne from '$lib/components/GuyOne.svelte';
	import GirlOne from '$lib/components/GirlOne.svelte';
	import GuyTwo from '$lib/components/GuyTwo.svelte';
	import PricingCard from '$lib/components/PricingCard.svelte';
	import Faqs from '$lib/components/Faqs.svelte';
	import { Button } from '$lib/components/ui/button';
	import { siteTitle, siteDescription } from '$lib/config';
</script>

<svelte:head>
	<title>{siteTitle}</title>
	<meta data-key="description" name="description" content={siteDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={siteTitle} />
	<meta name="twitter:title" content={siteTitle} />
	<meta property="og:description" content={siteDescription} />
	<meta name="twitter:description" content={siteDescription} />
	<!-- <meta property="og:image" content="https://yourdomain.com/image_path" /> -->
	<!-- <meta property="og:image:width" content={coverWidth} />
	<meta property="og:image:height" content={coverHeight} /> -->
	<!-- <meta name="twitter:image" content="https://yourdomain.com/image_path" /> -->
</svelte:head>

<section class="relative">
	<div class="bg-primary lg:p-10 lg:grid lg:grid-cols-2">
		<div class="p-5 bg-white rounded-lg place-self-center w-fit">
			<h1 class="text-2xl lg:text-5xl">{siteTitle}</h1>
			<p class="py-4 text-lg max-w-prose">
				Welcome to Digital Forge, where we craft custom websites that drive success. Whether you
				need a site to showcase your portfolio, promote your business, or reach your target audience
				with precision, we've got you covered. Our tailored web solutions are designed to meet your
				unique needs, ensuring top performance, fast load times, and excellent SEO. Let's build
				something great together.
			</p>
			<Button variant="default" size="lg" href="/contact">Get Started</Button>
		</div>
		<div class="place-self-center">[Video will go here]</div>
	</div>

	<img src="/images/tri1.svg" alt="" class="relative -top-[1px]" />
</section>
<section class="lg:grid lg:grid-cols-3 lg:py-10">
	<div class="place-self-center lg:p-5">
		<h2 class="text-center lg:text-4xl">Transform Your Online Presence</h2>
		<p class="py-4 text-lg max-w-prose">
			Ready to elevate your brand and reach new heights? At Digital Forge, we specialize in creating
			custom websites that not only look stunning but also perform exceptionally. Our expert team
			will work with you to design a site that reflects your vision, engages your audience, and
			drives results. Let's transform your online presence today.
		</p>
	</div>
	<div class="flex justify-center w-full h-full rounded-md lg:col-span-2 bg-primary">
		<GuyOne />
	</div>
</section>

<section class="lg:grid lg:grid-cols-2 bg-primary lg:p-5">
	<div class="flex justify-center">
		<GirlOne />
	</div>
	<div class="flex flex-col items-center w-full bg-white rounded-md place-self-center lg:p-10">
		<h2>Benefits of a Custom Website</h2>
		<ul class="gap-5 lg:grid lg:grid-cols-2">
			<li>Effortlessly Publish Your Own Content</li>
			<li>Low Monthly Fees</li>
			<li>High Google Lighthouse Scores for Increased Conversions</li>
			<li>Excellent SEO to Reach Your Target Audience</li>
			<li>Fully Customized Solutions - No Prebuilt WordPress Templates!</li>
			<li>Analytics On The Stuff you Need</li>
		</ul>
	</div>
</section>

<section class="grid gap-5 p-5 lg:p-10 lg:grid-cols-3 lg:gap-10">
	<PricingCard>
		<h2 slot="title">Standard Site</h2>
		<ul slot="content">
			<li>Starting at $1500</li>
			<li>4-page website</li>
			<li>Built-in SEO</li>
			<li>Mobile-friendly design</li>
			<li>Custom design tailored to your needs</li>
			<li>CMS included for easy updates</li>
			<li>$20 per month maintenance, includes 1 hour of updates each month</li>
		</ul>
	</PricingCard>
	<PricingCard>
		<h2 slot="title">Advanced Sites</h2>
		<ul slot="content">
			<li>Starting at $30000</li>
			<li>5+ pages</li>
			<li>Built-in SEO</li>
			<li>Mobile-friendly design</li>
			<li>Custom design tailored to your needs</li>
			<li>CMS included for easy updates</li>
			<li>$25 per month maintenance, includes 1 hour of updates each month</li>
		</ul>
	</PricingCard>
	<PricingCard>
		<h2 slot="title">Ecommerce</h2>
		<ul slot="content">
			<li>Pricing Starting At 3000</li>
			<li>Contact for a free quote!</li>
			<li>Built-in SEO</li>
			<li>Mobile-friendly design</li>
			<li>Custom design tailored to your needs</li>
			<li>CMS included for easy updates</li>
			<li>$50 per month maintenance, includes 1 hour of updates each month</li>
		</ul>
	</PricingCard>
</section>

<section>
	<div>
		<h2 class="text-2xl text-center uppercase">Faq's</h2>
	</div>
	<div class="w-1/2 pb-5 mx-auto">
		<Faqs />
	</div>
</section>

<section class="relative lg:grid lg:grid-cols-3 lg:py-10">
	<div class="flex justify-center w-full h-full rounded-md lg:col-span-2 bg-primary">
		<GuyTwo />
	</div>
	<div class="place-self-center">
		<h2 class="lg:text-2xl">Learn About Our Flexible Installment Plans</h2>
		<p class="max-w-prose">
			Don't let upfront costs hold you back. At Digital Forge, we offer flexible installment plans
			that allow you to get started with just a percentage down. Spread the cost over time and get
			your custom website up and running without the financial stress. <a href="#"
				>Learn more about our payment options</a
			>.
		</p>
	</div>
</section>
<img src="/images/tri1.svg" alt="" class="relative rotate-180" />
