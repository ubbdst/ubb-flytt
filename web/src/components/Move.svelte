<script>
  import ActivityStream from './ActivityStream'
  import Cards from './Cards'
  import ConditionAssignment from './ConditionAssignment'
  import Map from './Map'
  import Timespan from './Timespan'

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
  .map{
    height: 300px;
  }
</style>

<svelte:head>
	<title>Flytt uten tittel</title>
</svelte:head>

<main class="section">
  <div class="container">
    <h1 class="title is-size-1 has-text-centered">{item.title ? item.title : 'Flytt uten tittel'}</h1>
    
    {#if item.timespan}
    <p class="has-text-centered"><Timespan items={item.timespan}></Timespan></p>
    {/if}

    {#if item.moved && item.moved.length > 0}
    <Cards cards={item.moved} title="Flyttet"></Cards>
    {/if}

    {#if item.description}
    <div class="box">
      <div class="content">
        <h2 class="title has-text-centered">Rapport</h2>
        {@html item.description}
      </div>
    </div>
    {/if}

    <div class="box">
      <div class="columns">
        <div class="column">
          {#if item.movedFrom}
          <h2 class="title has-text-centered">Flyttet fra</h2>
          {/if}
          {#if item.movedFrom && item.movedFrom.geoJSON}
          <div class="map">
            <Map src={item.movedFrom}></Map>
          </div>
          {/if}
        </div>

        <div class="column">
          {#if item.movedTo}
          <h2 class="title has-text-centered">Flyttet til</h2>
          {/if}
          {#if item.movedTo && item.movedTo.geoJSON}
          <div class="map">
            <Map src={item.movedTo}></Map>
          </div>
          {/if}
        </div>
      </div>
    </div>

    {#if item.referencedBy && item.referencedBy.length != 0}
    <Cards cards={item.referencedBy} title="Relatert til"></Cards>
    {/if}

    {#if item.activityStream}
    <ActivityStream stream={item.activityStream}></ActivityStream>
    {/if}

    {#if item.documentationImage}
    <div class="box">
      <h2 class="title has-text-centered">Dokumentasjonsfoto</h2>
        {#each item.documentationImage as img, i}
        <a href="{urlFor(img).maxWidth(1600).maxHeight(1600).url()}"><img alt="{img.alt}" src={urlFor(img).width(250).height(250).url()} /></a>
        {/each}
    </div>
    {/if}

    <div class="box">
      <pre>
        <code>
        {JSON.stringify(item, null, 2)}
        </code>
      </pre>
    </div>

  </div>
</main>