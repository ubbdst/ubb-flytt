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
      description[]{
        nor[]{
          ...,
          children[]{
            ...
          }
        }
      },
      'depictions': *[references(^._id)]{ 
        _id, 
        label, 
        mainRepresentation 
      },
      depicts[]->{_id, label}
    }`

    const query = filter + projection
    const item = await client.fetch(query, { id }).catch(err => this.error(500, err))
    if (item.description && item.description.nor) { item.description = blocksToHtml({blocks: item.description.nor, serializers, ...client.clientConfig })}
    if (item.bio) { item.bio = blocksToHtml({blocks: item.bio, serializers, ...client.clientConfig })}
    return { item: {
      ...item,
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
	// import Map from '../../components/Map.svelte';
  // import MapMarker from '../../components/MapMarker.svelte';

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
      <img alt='{item.title ? item.title : ''}' src={urlFor(item.mainRepresentation).width(600).url()} />
    {/if}
  </div>
  <div class='column'>
    <h1>{item.label ? item.label : item.displayName}</h1>
    {#if item.description}
      {@html item.description}
    {/if}
    {#if item.bio}
      {@html item.bio}
    {/if}

    {#if item.depicts}
      <h3>Avbildet</h3>
      {#each item.depicts as depicted, i}
      <div>
        <p><a href="id/{depicted._id}">{depicted.label}</a></p>
      </div>
      {/each}
    {/if}
  </div>
</div>
<div class='content'>
  {#if item.depictions}
    {#each item.depictions as depiction, i}
      <a rel='prefetch' href='id/{depiction._id}'>
        <img alt='{depiction.label ? depiction.label : ''}' src={urlFor(depiction.mainRepresentation).width(100).height(100).url()}>
      </a>
      <h3><a rel='prefetch' href='id/{depiction._id}'>{depiction.label}</a></h3>
    {/each}
  {/if}
</div>
<div>
  <pre>
    <code>{JSON.stringify(item, null, 2)}</code>
  </pre>
</div>
<!-- <Map lat={35} lon={-84} zoom={3.5}>
	<MapMarker lat={37.8225} lon={-122.0024} label="Svelte Body Shaping"/>
	<MapMarker lat={33.8981} lon={-118.4169} label="Svelte Barbershop & Essentials"/>
	<MapMarker lat={29.7230} lon={-95.4189} label="Svelte Waxing Studio"/>
	<MapMarker lat={28.3378} lon={-81.3966} label="Svelte 30 Nutritional Consultants"/>
	<MapMarker lat={40.6483} lon={-74.0237} label="Svelte Brands LLC"/>
	<MapMarker lat={40.6986} lon={-74.4100} label="Svelte Medical Systems"/>
</Map> -->

