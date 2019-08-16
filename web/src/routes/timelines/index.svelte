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
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	section {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		width: 100%;
	}
	article {
		display: flex;
		flex-direction: column;
    box-sizing: border-box;
		background-color: rgb(65, 63, 63);
		color: white;
    margin: 1rem .25em;
		box-shadow: 0px 5px 10px rgba(0,0,0,0.15);
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
	}
	.content h1 {
		font-size: 1.4rem;
	}
	img {
		width: 100%;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
	}
	.content {
		padding: 1rem;
	}

	/* @media screen and (min-width: 40em) {
    article {
       max-width: calc(50% -  1em);
    }
	}
	
	@media screen and (min-width: 60em) {
		article {
				max-width: calc(25% - 1em);
		}
	} */
</style>

<svelte:head>
	<title>Tidslinjer</title>
</svelte:head>

<main>
	<h1>Tidslinjer</h1>

	<section>
	{#each items as item}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<article>
			{#if item.title.media}
			<a rel='prefetch' href='timelines/{item._id}'>
				<img alt="{item.title.text.headline ? item.title.text.headline : ''}" src={urlFor(item.title.media).width(1200).height(300).url()} />
			</a>
			{/if}
			<div class="content">
				<h1><a rel='prefetch' href='timelines/{item._id}'>{item.title.text.headline}</a></h1>
				{@html item.title.text.text.nor
              ? blocksToHtml({
                  blocks: item.title.text.text.nor.filter(({ _key = "" }) => _key)
                })
              : ""}
			</div>
		</article>
	{/each}
	</section>
</main>
