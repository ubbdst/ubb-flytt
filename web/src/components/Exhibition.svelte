<script>
  import ActivityStream from './ActivityStream'
  import Cards from './Cards'
  import MediaObjects from './MediaObjects'
  import ConditionAssignment from './ConditionAssignment'
  import Map from './Map'

  import client from '../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'
  
  export let item

  // Get a pre-configured url-builder from your sanity client
  const builder = imageUrlBuilder(client)

  // Then we like to make a simple function like this that gives the
  // builder an image and returns the builder for you to specify additional
  // parameters:
  function urlFor(source) {
    return builder.image(source)
  }
  
  function formatDate(date) {
    return new Date(date).toLocaleDateString()
  }

</script>

<style>

</style>

<svelte:head>
	<title>{item.label.nor}</title>
</svelte:head>

<nav class="breadcrumb is-centered is-small" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Hjem</a></li>
    <li><a href="/exhibitions">Utstillinger</a></li>
    <li class="is-active"><a href="#" aria-current="page">{item.label.nor}</a></li>
  </ul>
</nav>

<main class="section">
  <div class="text container">
    <h1 class="title is-size-1 has-text-centered">{item.label.nor}</h1>

    {#if item.description}
    <div class="content">
      {@html item.description}
    </div>
    {/if}

    {#if item.activityStream}
    <ActivityStream stream={item.activityStream} title="Tidslinje" showMap="false"></ActivityStream>
    {/if}

    {#if item.referencedBy && item.referencedBy.length != 0}
    <Cards cards={item.referencedBy} title="Relatert til"></Cards>
    {/if}
    
    <!-- {#if item.geoJSON}
    <div class="map">
      <Map src={item.geoJSON}></Map>
    </div>
    {/if} -->
  </div>
</main>
