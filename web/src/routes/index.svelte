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
	main {
		position: relative;
		background-color: white;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.hero {
		width: 100%;
		height: 70vh;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		margin-top: -4em;
		padding-bottom: 4em;
		background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0)), url('https://cdn.sanity.io/images/e56ijdvg/production/07dfa9cdc998f60c49fba21624ac9cd5ab34b428-3264x2448.jpg?w=1200')
	}

/* 	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	} */

	ul {
		margin: 0;
		padding: 0;
		line-height: 1.5;
		list-style: none;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	main ul {
		display: grid;
	  grid-template-columns: 50% 50%;
	}
	main ul li {
		padding: 1em;
	}
	main ul li:first-child {
		background-color: burlywood;
	}

	.posts {
	justify-content: flex-end;
	}
	.posts h1 {
		font-size: 2em;
	}

	.posts h2 {
		font-size: 1.5em;
	}
</style>

<svelte:head>
	<title>Sælen-samlingen</title>
</svelte:head>

<div class="hero"></div>

<main>
	<ul>
		<li>
			<h1>{data.siteSettings[0].title}</h1>
			<h2>{data.siteSettings[0].description}</h2>
		</li>
		{#each data.articles as post}
			<!-- we're using the non-standard `rel=prefetch` attribute to
					tell Sapper to load the data for the page as soon as
					the user hovers over the link or taps it, instead of
					waiting for the 'click' event -->
			<li class="posts">
				<h1><a rel='prefetch' href='articles/{post.slug.current}'>{post.title}</a></h1>
				<h2>({formatDate(post.publishedAt)})</h2>
			</li>
		{/each}
	</ul>
</main>
