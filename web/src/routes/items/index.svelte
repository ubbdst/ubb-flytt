<script context="module">
	import client from '../../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'

	export function preload({ params, query }) {
    return client.fetch('*[_type == "madeObject"]|order(preferredIdentifier desc)').then(items => {
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
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
	img {
		float: left;
		margin: 0 1rem 1rem 0;
	}
	div {
		display: flex;
		width: 100%;
	}
</style>

<svelte:head>
	<title>Objekt</title>
</svelte:head>

<h1>Objekt</h1>

	{#each items as item}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<div>
			<img src={urlFor(item.mainRepresentation).width(100).height(100).url()} />
			<h2><a rel='prefetch' href='id/{item._id}'>{item.label}</a></h2>
		</div>

	{/each}
