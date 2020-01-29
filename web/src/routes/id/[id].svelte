<script context="module">
  import client from "../../sanityClient";
  import jsonata from "jsonata";

  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const { id } = params;
    const filter = '*[_id == $id && accessState == "open"][0]';
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
            mainManifest,
            mainRepresentation{
              ...,
              asset->
            },
            media,
            media[]{
              caption,
              credit,
              "url": asset->url
            },
            geoJSON,
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
          media,
          geoJSON
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
              mainRepresentation{
                ...,
                asset->
              }
        	  }
          }
        },
        ...,
        tookPlaceAt[]->,
        movedFrom->{
          _id,
          label,
          geoJSON
        },
        movedTo->{
          _id,
          label,
          geoJSON
        },
        carriedOutBy[]{
          _type == 'reference' => @->{
            'actor': {
              _id,
              label,
              mainRepresentation{
                ...,
                asset->
              }
            }
          },
          ...,
          actor->{
          	_id,
          	label,
          	mainRepresentation{
              ...,
              asset->
            }
        	}
        }
      },
      'referencedBy': *[references(^._id) && accessState == "open"]{ 
        _id,
        _type,
        preferredIdentifier,
        label, 
        hasType[]->{
          _id,
          label
        },
        mainRepresentation 
      },
      depicts[]->{
        _id,
        _type,
        hasType[]->{
          _id,
          label
        },
        preferredIdentifier,
        label, 
        mainRepresentation
      },
      moved[]->{
        _id,
        _type,
        hasType[]->{
          _id,
          label
        },
        preferredIdentifier,
        label,
        mainRepresentation
      },
      movedFrom->,
      movedTo->,
      transferredTitleOf[]->{
        _id,
        _type,
        hasType[]->{
          _id,
          label
        },
        preferredIdentifier,
        label,
        mainRepresentation
      },
      transferredTitleFrom[]->,
      transferredTitleTo[]->,
      carriedOutBy[]->{
        _id,
        _type,
        hasType[]->{
          _id,
          label
        },
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
      media->,
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
    }`;

    const query = filter + projection;
    let item = await client
      .fetch(query, { id })
      .catch(err => this.error(500, err));

    const expression = jsonata("**.geoJSON[]");
    let result = expression.evaluate(item);

    if (result) {
      item.geoJSON = {};
      item.geoJSON.all = result;
    }

    // console.log(JSON.stringify(item, null, 2));
    return {
      item: {
        ...item
      }
    };
  }
</script>

<script>
  import Map from "../../components/Map.svelte";
  import MadeObject from "../../components/MadeObject.svelte";
  import Actor from "../../components/Actor.svelte";
  import Group from "../../components/Group";
  import Report from "../../components/Report.svelte";
  import Move from "../../components/Move.svelte";
  import Event from "../../components/Event.svelte";
  import Acquisition from "../../components/Acquisition.svelte";
  import Exhibition from "../../components/Exhibition.svelte";
  import Type from "../../components/Type.svelte";
  import Place from "../../components/Place.svelte";
  import TimelineDocument from "../../components/TimelineDocument.svelte";
  import LinguisticObject from "../../components/LinguisticObject.svelte";

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
  <MadeObject {item} />
{/if}

{#if item._type == 'actor'}
  <Actor {item} />
{/if}

{#if item._type == 'group'}
  <Group {item} />
{/if}

{#if item._type == 'report'}
  <Report {item} />
{/if}

{#if item._type == 'linguisticObject'}
  <LinguisticObject {item} />
{/if}

{#if item._type == 'move'}
  <Move {item} />
{/if}

{#if item._type == 'event'}
  <Event {item} />
{/if}

{#if item._type == 'acquisition'}
  <Acquisition {item} />
{/if}

{#if item._type == 'exhibition'}
  <Exhibition {item} />
{/if}

{#if item._type == 'place'}
  <Place {item} />
{/if}

{#if item._type == 'timeline'}
  <TimelineDocument {item} />
{/if}

{#if ['typeClass', 'concept', 'role', 'actorType', 'activityType', 'eventType', 'acquisitionType'].indexOf(item._type) >= 0}
  <Type {item} />
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
