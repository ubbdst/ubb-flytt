<script context="module">
	import client from '../../sanityClient'
	import imageUrlBuilder from '@sanity/image-url'
	import blocksToHtml from '@sanity/block-content-to-html'
  import serializers from '../../components/serializers'

	export function preload({ params, query }) {
    return client.fetch('*[_type == "timeline"]|order(label asc)').then(items => {
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
	<title>Tidslinjer</title>
</svelte:head>

<main class="section">

	<section class="container">
	<h1 class="title">Tidslinjer</h1>
	{#each items as item}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<article class="card">
			{#if item.media}
			<a class="card-image" rel='prefetch' href='timelines/{item._id}'>
				<figure class="image">
					<img alt="{item.headline ? item.headline : ''}" src={urlFor(item.media[0]).width(1200).height(300).url()} />
				</figure>
			</a>
			{/if}
			<div class="card-content">
				<div class="media">
					<div class="media-content">
						<p class="title"><a rel='prefetch' href='timelines/{item._id}'>{item.headline}</a></p>
						{@html item.text.nor
									? blocksToHtml({
											blocks: item.text.nor.filter(({ _key = "" }) => _key)
										})
									: ""}
					</div>
				</div>
			</div>
		</article>
	{/each}
	</section>
</main>
