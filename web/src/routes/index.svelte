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
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	h2 {
		text-align: center;
	}

	img {
		margin: auto;
		display: block;
		width: 70%;
	}

	p {
		margin: 1em auto;
	}

	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sælen-samlingen</title>
</svelte:head>

<h1>{data.siteSettings[0].title}</h1>
<h2>{data.siteSettings[0].description}</h2>
<img src="https://cdn.sanity.io/images/e56ijdvg/production/07dfa9cdc998f60c49fba21624ac9cd5ab34b428-3264x2448.jpg?w=600">
<p></p>

<ul>
	{#each data.articles as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='articles/{post.slug.current}'>{post.title}</a> ({formatDate(post.publishedAt)})</li>
	{/each}
</ul>
