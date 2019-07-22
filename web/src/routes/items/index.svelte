<script context="module">
	import client from '../../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'

	export function preload({ params, query }) {
    return client.fetch('*[_type == "madeObject" && accessState == "open"]|order(preferredIdentifier desc)').then(items => {
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
		background-color: #222;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	main > h1 {
		color: white;
	}

	section {
		display: grid;
		grid-template-columns: repeat(1, minmax(250px, 1fr));
		gap: 1em;
	}

	article {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
    box-sizing: border-box;
		background-color: #333;
		color: #ccc;
		box-shadow: 0px 5px 10px rgba(0,0,0,0.95);
	}
	.content h1 {
		font-size: 1rem;
	}
	img {
		width: 100%;
	}

	.image {
		width: 100%;
	}

	.content {
		padding-left: 1rem;
		width: 50%;
	}

	@media screen and (min-width: 40em) {
		section {
			display: grid;
			grid-template-columns: repeat(2, minmax(250px, 1fr));
			gap: 1em;
		}
	}
	
	@media screen and (min-width: 60em) {
		section {
			display: grid;
			grid-template-columns: repeat(3, minmax(250px, 1fr));
			gap: 1em;
		}
	}
</style>

<svelte:head>
	<title>Objekt</title>
</svelte:head>

<main>
	<h1>Objekt</h1>
	<section>
	{#each items as item}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<article>
			<a class="image" rel='prefetch' href='id/{item._id}'>
				<img src={urlFor(item.mainRepresentation).height(350).url()} />
			</a>
			<div class="content">
				<h1><a rel='prefetch' href='id/{item._id}'>{item.label}</a></h1>
			</div>
		</article>
	{/each}
	</section>
</main>