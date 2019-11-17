<script context="module">
  import client from '../../sanityClient'

	export async function preload({ params }) {
		// the `slug` parameter is available because
    // this file is called [slug].html
    const filter = `*[_type == 'madeObject' && defined(activityStream)]`
    const projection = `{
      _id,
      label,
      'production': activityStream[_type match 'Production']{
        geoJSON[0]{
          properties,
          geometry{
            'type': _type,
              ...
            },
            'type': _type
          }
        },
      'tookPlaceAt':
        activityStream[_type match 'Production']{
          tookPlaceAt[]->{
            geoJSON
          }
      }
    }` 

    const query = filter + projection
    let markers = await client.fetch(query).catch(err => this.error(500, err))
    let src;
    if(markers) {
      src = markers.map(marker => {
        /* let prod = marker.production[0].geoJSON.geometry;
        let took = marker.tookPlaceAt[0].tookPlaceAt[0].geoJSON; */
        let container = {};
        container = marker; 
        /* container.type = marker.production[0].type ? marker.production[0].type : marker.tookPlaceAt[0].tookPlaceAt[0].type;
        container.properties = {};
        container.properties = marker.properties;
        container.properties.label = '';
        container.properties.label = marker.label ? marker.label : 'Ingen tittel';
        container.properties.id = marker._id;
        container.geometry = {};
        container.geometry = took ? took : place;
        container.geometry.coordinates = [item.geometry.lng, item.geometry.lat]; */
        return { container }
      })
    };
    
/*     console.log(JSON.stringify(src, null, 2));
 */    return { src };
  }
</script>

<script>
  import Map from '../../components/Map.svelte';
  
  export let src;
</script>

<style>
  .map {
    height: 80vh;
    margin-top: 2em;
  }
</style>

<svelte:head>
	<title>Kart</title>
</svelte:head>

{#if src}
<main class="section map">
  <Map src={src}></Map>
</main>
{/if}
