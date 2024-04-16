<script>
	import GuyOne from '$lib/components/GuyOne.svelte';
	import GirlOne from '$lib/components/GirlOne.svelte';
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
	<div class="bg-primary lg:p-10 md:grid md:grid-cols-2">
		<div class="bg-white place-self-center rounded-lg p-5 w-fit">
			<h1 class=" text-2xl md:text-5xl">{siteTitle}</h1>
			<p class="max-w-prose">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur exercitationem sint quia
				incidunt nulla recusandae? Blanditiis nam omnis, hic accusantium voluptas in non eos odit
				tempore odio autem ex expedita.
			</p>
		</div>
		<div class="place-self-center">[Video will go here]</div>
	</div>

	<img src="/images/tri1.svg" alt="" class="relative -top-[1px]" />
</section>
<section class="lg:grid lg:grid-cols-3 lg:p-10">
	<div class="place-self-center">
		<h2 class="lg:text-2xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h2>
		<p class="max-w-prose">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ipsa ratione, illo, quod quia
			dolorem, sapiente blanditiis cum accusamus soluta illum libero ad temporibus alias explicabo
			veritatis repellat deleniti voluptatibus.
		</p>
	</div>
	<div class="h-full w-full lg:col-span-2 rounded-md flex justify-center bg-primary">
		<GuyOne />
	</div>
</section>

<section class="lg:grid lg:grid-cols-2 bg-primary lg:p-5">
	<div class=" flex justify-center">
		<GirlOne />
	</div>
	<div class="place-self-center flex flex-col items-center bg-white rounded-md w-full lg:p-10">
		<h2>Lorem Ipsum</h2>
		<ul class="flex gap-5">
			<li>test</li>
			<li>test</li>
			<li>test</li>
			<li>test</li>
			<li>test</li>
		</ul>
	</div>
</section>
