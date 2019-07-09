<script context="module">
  import blocksToHtml from '@sanity/block-content-to-html'
  import imageUrlBuilder from '@sanity/image-url'
  import client from '../../sanityClient'
  import serializers from '../../components/serializers'
  import Mirador from '../../components/Mirador3'

	export async function preload({ params }) {
		// the `slug` parameter is available because
    // this file is called [slug].html
    const { id } = params
    const filter = '*[_id == $id][0]'
    const projection = `{
      ...,
      depicts[]->{_id, displayName},
      description[]{
        nor[]{
          ...,
          children[]{
            ...
          }
        }
      }
    }`

    const query = filter + projection
    const item = await client.fetch(query, { id }).catch(err => this.error(500, err))
    return { item: {
      ...item,
      description: blocksToHtml({blocks: item.description.nor, serializers, ...client.clientConfig })
    } };
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

<script>
	export let item;
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/

	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
    position: relative;
	}

	.content :global(pre) :global(code) {

		background-color: transparent;
		padding: 0;
	}

  .content :global(pre::after) {
    content: attr(data-language);
    top: 0;
    position: absolute;
    right: 0;
    background: #ff3e00;
    color: #fff;
    padding: 2px;
    border-radius: 2px;
  }

  .content :global(img) {
    display: block;
    max-width:100%;
  }

  .content :global(figure) {
    margin: 0;
  }

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}

  .content {
    display: flex;
  }
  .column {
    width: 50%;
    padding: 1rem;
  }
  .mirador {
    position: relative;
    width: 100%;
    height: 600px;
  }
</style>

<svelte:head>
	<title>{item.label}</title>
</svelte:head>


<div class='content'>
  <div class='column'>
    {#if item.mainManifest}
      <div class='mirador'>
        <Mirador manifest='{item.mainManifest.url}'/>
      </div>
    {:else}
      <img src={urlFor(item.mainRepresentation).width(600).url()} />
    {/if}
  </div>
  <div class='column'>
    <h1>{item.label}</h1>
    {@html item.description}

    {#if item.depicts}
      <h3>Avbildet</h3>
      {#each item.depicts as depicted, i}
      <div>
        <p><a href="actor/{depicted._id}">{depicted.displayName}</a></p>
      </div>
      {/each}
    {/if}
  </div>
</div>

