<script context="module">
	import client from '../../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'

	export function preload({ params, query }) {
    return client.fetch('*[_type == "move" && accessState == "open"]|order(preferredIdentifier desc)').then(items => {
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

</style>

<svelte:head>
	<title>Flytt</title>
</svelte:head>

<main class="section">
  <h1 class="title has-text-centered">Flytt av objekt</h1>
  {#each items as item, i}
  <li><a href="id/{item._id}">{item._id}</a></li>
  {/each}
</main>
