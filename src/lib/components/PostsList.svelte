<script>
	export let posts = [];
</script>

<ul class="lg:px-32">
	{#each posts as post}
		<a href="/blog/{post.slug}" class="rounded-lg shadow-lg py-4">
			<article class="">
				<div>
					<img
						src={post.coverImage}
						alt=""
						class="w-full h-64 object-cover"
						width={post.coverWidth}
						height={post.coverHeight}
						style="ratio: {post.coverWidth} / {post.coverHeight}"
					/>
					<h2>
						{post.title}
					</h2>
				</div>
			</article>

			<p>{post.excerpt}</p>
		</a>
	{/each}
</ul>
