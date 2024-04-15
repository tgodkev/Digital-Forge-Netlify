<script>
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
<div>
	<div>this will be the cta section</div>
</div>
