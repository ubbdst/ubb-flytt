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
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	section {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	}

	article {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
    box-sizing: border-box;
		background-color: rgb(65, 63, 63);
		color: white;
    margin: 0 1em 2em 1em;
		padding: 1em;
		box-shadow: 0px 5px 10px rgba(0,0,0,0.15);
	}
	.content h1 {
		font-size: 1.4rem;
	}
	img {
		width: 100%;
		box-shadow: 0px 5px 10px rgba(0,0,0,0.75);
	}

	.image {
		width: 50%;
	}

	.content {
		padding-left: 1rem;
		width: 50%;
	}

	/* @media screen and (min-width: 40em) {
    article {
       max-width: 100%;
    }
	}
	
	@media screen and (min-width: 60em) {
		article {
			max-width: calc(50% - 2em);
		}
	} */
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
				<img src={urlFor(item.mainRepresentation).height(200).url()} />
			</a>
			<div class="content">
				<h1><a rel='prefetch' href='id/{item._id}'>{item.label}</a></h1>
			</div>
		</article>
	{/each}
	</section>
</main>