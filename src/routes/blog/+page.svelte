<script>
	import PostsList from '$lib/components/PostsList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { siteDescription } from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>Blog</title>
	<meta data-key="description" name="description" content={siteDescription} />
</svelte:head>

<h1>Blog</h1>

<div class="p-5 md:p-44">
	<PostsList posts={data.posts} />
</div>

<Pagination currentPage={1} totalPosts={data.total} />
