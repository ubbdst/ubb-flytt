<script context="module">
  import client from '../../sanityClient'
	export function preload({ params, query }) {
    return client.fetch('*[_type == "linguisticObject" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc)').then(posts => {
			return { posts };
		}).catch(err => this.error(500, err));
	}
</script>

<script>
  export let posts;

  function formatDate(date) {
    return new Date(date).toLocaleDateString()
  }
</script>

<style>

</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<main class="section">
	<section class="container">
		<h1 class="title has-text-centered">Artikler</h1>

		<ul>
			{#each posts as post}
				<!-- we're using the non-standard `rel=prefetch` attribute to
						tell Sapper to load the data for the page as soon as
						the user hovers over the link or taps it, instead of
						waiting for the 'click' event -->
				<li><a rel='prefetch' href='articles/{post.slug.current}'>{post.label.nor}</a> ({formatDate(post.publishedAt)})</li>
			{/each}
		</ul>
	</section>
</main>
