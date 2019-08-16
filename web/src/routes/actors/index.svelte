<script context="module">
	import client from '../../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'

	export function preload({ params, query }) {
    return client.fetch('*[_type == "actor" && accessState == "open"]|order(label asc)').then(items => {
			return { items };
		}).catch(err => this.error(500, err));
	}
</script>

<script>
  export let items;

  function formatDate(date) {
    return new Date(date).toLocaleDateString()
	}
	
	// Get a pre-configured url-builder from your sanity client
  const builder = imageUrlBuilder(client)

  // Then we like to make a simple function like this that gives the
  // builder an image and returns the builder for you to specify additional
  // parameters:
  function urlFor(source) {
    return builder.image(source)
  }
</script>

<style>
	main {
		position: relative;
		background-color: white;
		margin: 0 auto;
		box-sizing: border-box;	
	}

	main > h1 {
		padding: 1em;
		font-size: 1em;
		margin: 0;
		background-color: #222;
		color: white;
	}

	main > h1::before {
		content: "-> "
	}

	section {
		display: grid;
		grid-template-columns: repeat(4, 25%);
	}
	article {
		display: flex;
		flex-direction: column;
    box-sizing: border-box;
		color: white;
		background-color: #444;
		position: relative;
	}
	article:nth-child(2n) {
		background-color: #222;
	}
	article:nth-child(3n+1) {
		background-color: #333;
	}
	article > a {
		line-height: 0;
	}
	.content h1 {
		font-size: 1rem;
		font-weight: 500;
		margin: 0;
	}
	.content h1 a {
		text-decoration: none;
	}
	img {
		width: 100%;
	}
	.content {
		padding: 0.5rem;
		text-align: center;
	}
</style>

<svelte:head>
	<title>Aktører</title>
</svelte:head>

<main>
	<h1>Aktører</h1>

	<section>
	{#each items as item}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<article>
			{#if item.mainRepresentation}
			<a rel='prefetch' href='id/{item._id}'>
				<img alt="{item.label ? item.label : ''}" src={urlFor(item.mainRepresentation).width(300).height(300).url()} />
			</a>
			{/if}
			<div class="content">
				<h1><a rel='prefetch' href='id/{item._id}'>{item.label}</a></h1>
			</div>
		</article>
	{/each}
	</section>
</main>
