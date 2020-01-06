<script context="module">
  import client from '../../sanityClient'
  import jsonata from 'jsonata'

	export async function preload({ params }) {
		// the `slug` parameter is available because
    // this file is called [slug].html
    const { id } = params
    const filter = '*[_id == $id && accessState == "open"][0]'
    const projection = `{
      ...,
      mainRepresentation{
        ...,
        asset->
      },
      hasType[]->{
        _id,
        label
      },
      description{
        nor[]{
          _type == 'reference' => @->{
            _id,
            _type,
            preferredIdentifier,
            label,
            headline,
            text,
            mainRepresentation,
            media,
            media[]{
              caption,
              credit,
              "url": asset->url
            },
            events[] {
              _type == 'reference' => @->{
                ...,
                "media": media{
                  caption,
                  credit,
                  "url": coalesce(url, asset->url)
                }
              },
              _type == 'timelineSlide' => @{
                ...,
                "media": media[0]{
                  caption,
                  credit,
                  "url": coalesce(url, asset->url)
                }
              }
            }
        	},
          ...,
          "before": before[]{asset->{url}},
          "after": after[]{asset->{url}},
          children[]{
            ...
          }
        }
      },
      description[]{
        _type == 'reference' => @->{
          _id,
          _type,
          preferredIdentifier,
          label,
          mainRepresentation,
          media
        },
        ...,
        children[]{
          ...
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
      movedTo->,
      transferred_title_of[]->{
        _id,
        preferredIdentifier,
        label,
        mainRepresentation
      },
      transferred_title_from[]->,
      transferred_title_to[]->,
      carriedOutBy[]->{
        _id,
        label,
        mainRepresentation
      },
      wasMotivatedBy[]->{
        _id,
        label
      },
      conditionAssignment[]{
        ...,
        hasType->
      },
      media->
    }`

    const query = filter + projection
    let item = await client.fetch(query, { id }).catch(err => this.error(500, err))

    const expression = jsonata("**.geoJSON[]");
    let result = expression.evaluate(item);

    if(result) {
      item.geoJSON = {};
      item.geoJSON.all = result
    };
    
    // console.log(JSON.stringify(item, null, 2));
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
  import Event from '../../components/Event';
  import Acquisition from '../../components/Acquisition';
  import Exhibition from '../../components/Exhibition';
  import Type from '../../components/Type';

  export let item;
</script>

<style>

</style>

<svelte:head>
	{#if item.label && item.label.nor}
    <title>{item.label.nor}</title>
  {/if}
  {#if item.label && !item.label.nor}
    <title>{item.label}</title>
  {/if}
  {#if !item.label}
    <title>{item._id}</title>
  {/if}
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

{#if item._type == 'event'}
  <Event item={item}></Event>
{/if}

{#if item._type == 'acquisition'}
  <Acquisition item={item}></Acquisition>
{/if}

{#if item._type == 'exhibition'}
  <Exhibition item={item}></Exhibition>
{/if}

{#if (['typeClass', 'concept','role', 'actorType', 'activityType','eventType', 'acquisitionType'].indexOf(item._type) >= 0)}
    <Type item={item}></Type>
{/if}

<!-- <div class="container">
  <div class="box">
    <h1 class="title">Data</h1>
    <pre>
      <code>
      {JSON.stringify(item, null, 2)}
      </code>
    </pre>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div> -->
