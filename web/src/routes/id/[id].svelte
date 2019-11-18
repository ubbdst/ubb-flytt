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
      description{
        nor[]{
          _type == 'reference' => @->{
            _id,
            preferredIdentifier,
            label,
            mainRepresentation
        	},
          ...,
          children[]{
            ...
          }
        }
      },
      concerned[]->{
        _id,
        preferredIdentifier,
        label,
        mainRepresentation
      },
      activityStream[]{
        _type == 'reference' => @->{
          ...,
          carriedOutBy[]{
            ...,
            actor->{
              _id,
              label,
              mainRepresentation
        	  }
          }
        },
        ...,
        tookPlaceAt[]->,
        carriedOutBy[]{
          _type == 'reference' => @->{
            'actor': {
              _id,
              label,
              mainRepresentation
            }
          },
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
        preferredIdentifier,
        label, 
        mainRepresentation 
      },
      depicts[]->{
        _id, 
        preferredIdentifier,
        label, 
        mainRepresentation
      },
      moved[]->{
        _id,
        preferredIdentifier,
        label,
        mainRepresentation
      },
      movedFrom->,
      movedTo->
    }`

    const query = filter + projection
    let item = await client.fetch(query, { id }).catch(err => this.error(500, err))

    if (item.description && item.description.nor) { 
      item.description = blocksToHtml({blocks: item.description.nor, serializers, ...client.clientConfig 
      }
    )};

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
  import Map from '../../components/Map';
  import MadeObject from '../../components/MadeObject';
  import Actor from '../../components/Actor';
  import Report from '../../components/Report';
  import Move from '../../components/Move';

  export let item;
</script>

<style>

</style>

<svelte:head>
	<title>{item.label ? item.label : item.title}</title>
</svelte:head>

{#if item._type == 'madeObject'}
  <MadeObject item={item}></MadeObject>
{/if}

{#if item._type == 'actor'}
  <Actor item={item}></Actor>
{/if}

{#if item._type == 'report'}
  <Report item={item}></Report>
{/if}

{#if item._type == 'move'}
  <Move item={item}></Move>
{/if}