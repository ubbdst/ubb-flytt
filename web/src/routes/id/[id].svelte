<script context="module">
  import client from '../../sanityClient'
  import blocksToHtml from '@sanity/block-content-to-html'
  import serializers from '../../components/serializers'
  import jsonata from 'jsonata'

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
      activityStream[]{
        ...,
        tookPlaceAt[]->,
        carriedOutBy[]{
          ...,
          actor->{
          	_id,
          	label,
          	mainRepresentation
        	}
        }
      },
      'referencedBy': *[references(^._id) && accessState == "open"]{ 
        _id, 
        label, 
        mainRepresentation 
      },
      depicts[]->{
        _id, 
        label, 
        mainRepresentation
      },
    }`

    const query = filter + projection
    let item = await client.fetch(query, { id }).catch(err => this.error(500, err))

    if (item.description && item.description.nor) { 
      item.description = blocksToHtml({blocks: item.description.nor, serializers, ...client.clientConfig 
      }
    )};

    if (item.bio) { 
      item.bio = blocksToHtml({blocks: item.bio, serializers, ...client.clientConfig 
      }
    )}

    const expression = jsonata("**.geoJSON[]");
    let result = expression.evaluate(item);

    if(result) {
      item.geoJSON = {};
      item.geoJSON.all = result
    };
    
    console.log(JSON.stringify(item, null, 2));
    return { 
      item: {
        ...item,
      }
    };
  }
</script>

<script>
  import Map from '../../components/Map.svelte';
  import MadeObject from '../../components/MadeObject.svelte';
  import Actor from '../../components/Actor.svelte';

  export let item;
</script>

<style>

</style>

<svelte:head>
	<title>{item.label}</title>
</svelte:head>

{#if item._type == 'madeObject'}
  <MadeObject item={item}></MadeObject>
{/if}

{#if item._type == 'actor'}
  <Actor item={item}></Actor>
{/if}
<!-- 
{#if item.geoJSON}
<div class="map">
  <Map src={item.geoJSON}></Map>
</div>
{/if} -->
