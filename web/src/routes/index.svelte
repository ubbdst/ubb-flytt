<script context="module">
  import client from '../sanityClient'
	export function preload({ params, query }) {
    return client.fetch('{"articles": *[_type == "post" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc), "siteSettings": *[_type == "siteSettings"]}').then(data => {
			return { data };
		}).catch(err => this.error(500, err));
	}
</script>

<script>
  export let data;

  function formatDate(date) {
    return new Date(date).toLocaleDateString()
  }
</script>

<style>
	.hero {
		width: 100%;
		height: 70vh;
		margin-top: -2em;
		margin-bottom: 2em;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0)), url('https://cdn.sanity.io/images/e56ijdvg/production/07dfa9cdc998f60c49fba21624ac9cd5ab34b428-3264x2448.jpg?w=1200')
	}
</style>

<svelte:head>
	<title>Sælen-samlingen</title>
</svelte:head>

<section class="hero is-primary"></section>

<main class="container">
	<h1 class="title">{data.siteSettings[0].title}</h1>
	<h2 class="subtitle">{data.siteSettings[0].description}</h2>

	<ul>
	{#each data.articles as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li class="post">
			<h1><a rel='prefetch' href='articles/{post.slug.current}'>{post.title}</a></h1>
			<h2>({formatDate(post.publishedAt)})</h2>
		</li>
	{/each}
	</ul>
</main>
