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
.cards{
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
	grid-template-rows: auto;
	grid-gap: 1em;
}
</style>


<svelte:head>
	<title>Aktører</title>
</svelte:head>

<main class="section">
	<div class="container">
		<h1 class="title has-text-centered">Aktører</h1>
		<div class="cards">
		{#each items as item}
			<!-- we're using the non-standard `rel=prefetch` attribute to
					tell Sapper to load the data for the page as soon as
					the user hovers over the link or taps it, instead of
					waiting for the 'click' event -->
			<article class="card">
				{#if item.mainRepresentation}
				<a class="card-image" rel='prefetch' href='id/{item._id}'>
					<figure class="image">
						<img alt="{item.label ? item.label : ''}" src={urlFor(item.mainRepresentation).width(300).height(300).url()} />
					</figure>
				</a>
				{/if}
				<div class="card-content">
					<div class="media">
						<div class="media-content">
							<p class="title"><a class="has-text-black" rel='prefetch' href='id/{item._id}'>{item.label}</a></p>
						</div>
					</div>
				</div>
			</article>
		{/each}
		</div>
	</div>
</main>
