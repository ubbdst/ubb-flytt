<script context="module">
  import client from '../../sanityClient'
  import blocksToHtml from '@sanity/block-content-to-html'
  import serializers from '../../components/serializers'

  export async function preload({ params }) {
		// the `slug` parameter is available because
    // this file is called [slug].html
    const { id } = params;
    const filter = '*[_id == $id][0]';
    const projection = `
      {
        ...,
        'referencedBy': *[references(^._id) && accessState == "open"]{ 
          _id, 
          label, 
          mainRepresentation 
        },
      }`;
    const query = filter + projection
    let data = await client.fetch(query, { id }).catch(err => this.error(500, err))
    console.log(data)
    return { 
      data: {
        ...data,
      }
    };
  };
</script>

<script>
  import Map from '../../components/Map';
  import Cards from '../../components/Cards';

	export let data;
</script>

<style>
  .map{
    height: 400px;
  }
</style>

<svelte:head>
  <title>{data.label}</title>
</svelte:head>

<nav class="breadcrumb is-centered is-small" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Hjem</a></li>
    <li><a href="/places">Steder</a></li>
    <li class="is-active"><a href="#" aria-current="page">{data.label}</a></li>
  </ul>
</nav>
 
<main class="section">
  <h1 class="title has-text-centered">{data.label}</h1>
  {#if data.geoJSON}
    <div class="map">
      <Map src={data}></Map>
    </div>
  {/if}
  <Cards cards={data.referencedBy} title="Relatert til"></Cards>
</main>