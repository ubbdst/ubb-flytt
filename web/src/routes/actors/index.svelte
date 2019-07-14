<script context="module">
	import client from '../../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'

	export function preload({ params, query }) {
    return client.fetch('*[_type == "actor"]|order(label desc)').then(items => {
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
	section {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		width: 100%;
	}
	article {
		display: flex;
		flex-direction: column;
		flex: 1 0 500px;
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

	@media screen and (min-width: 40em) {
    article {
       max-width: calc(50% -  1em);
    }
	}
	
	@media screen and (min-width: 60em) {
		article {
				max-width: calc(25% - 1em);
		}
	}
</style>

<svelte:head>
	<title>Aktører</title>
</svelte:head>

<h1>Aktører</h1>

	<section>
	{#each items as item}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<article>
			<a rel='prefetch' href='id/{item._id}'>
				<img src={urlFor(item.mainRepresentation).width(300).url()} />
			</a>
			<div class="content">
				<h1><a rel='prefetch' href='id/{item._id}'>{item.label}</a></h1>
			</div>
		</article>
	{/each}
	</section>
