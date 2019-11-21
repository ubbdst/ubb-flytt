<script>
  import ActivityStream from './ActivityStream'
  import Cards from './Cards'
  import Rights from './Rights'
  import MainImage from './MainImage'
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
  .metadata {
    margin-bottom: 2em;
  }
</style>

<main class="section">
  <div class="container">
    <h1 class="title is-size-1 has-text-centered">{item.label}</h1>
    <p class="metadata has-text-centered">
      {#if item.hasType && item.hasType.length > 0}
      {#each item.hasType as t, i}
      <span class="tag">
        <a href="/id/{t._id}">{t.label.nor}</a>
      </span>
      {/each}
      <br>
      {/if}
      {item.preferredIdentifier}, 
      <Rights item={item.rights}></Rights>
    </p>

    <MainImage 
      image={item.mainRepresentation}
      manifest={item.mainManifest ? item.mainManifest : ''}
      rights={item.rights}
      id={item.preferredIdentifier}
      alt={item.title}>
    </MainImage>

    {#if item.description}
      <div class="content is-medium has-text-centered">
      {@html item.description}
      </div>
    {/if}

    {#if item.depicts && item.depicts.length != 0}
    <Cards cards={item.depicts} title="Avbildet"></Cards>
    {/if}

    {#if item.referencedBy && item.referencedBy.length != 0}
    <Cards cards={item.referencedBy} title="Relatert til"></Cards>
    {/if}
    
    <!-- {#if item.geoJSON}
    <div class="map">
      <Map src={item.geoJSON}></Map>
    </div>
    {/if} -->

    {#if item.activityStream}
    <ActivityStream stream={item.activityStream} title="Tidslinje"></ActivityStream>
    {/if}

  </div>
</main>