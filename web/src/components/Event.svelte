<script>
  import ActivityStream from './ActivityStream'
  import Block from './Block'
  import Cards from './Cards'

  import client from '../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'

  import MainImage from './MainImage'
  import Map from './Map'

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

<nav class="breadcrumb is-centered is-small" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Hjem</a></li>
    <li><a href="/events">Hendelser</a></li>
    <li class="is-active"><a href="#" aria-current="page">{item.label.nor}</a></li>
  </ul>
</nav>

<main class="section">
  <div class="container">
    <h1 class="title is-size-1 has-text-centered">{item.label.nor}</h1>    

    {#if item.mainRepresentation || item.mainManifest}
    <MainImage 
      image={item.mainRepresentation}
      manifest={item.mainManifest ? item.mainManifest : ''}
      rights={item.rights}
      id={item.preferredIdentifier}
      alt={item.title}>
    </MainImage>
    {/if}

    {#if item.description}
      <div class="content is-medium has-text-centered">
        <Block content={item.description.nor}/>
      </div>
    {/if}

    {#if item.referencedBy && item.referencedBy.length != 0}
    <Cards cards={item.referencedBy} title="Relatert til"></Cards>
    {/if}
    
    {#if item.geoJSON}
    <div class="map">
      <Map src={item.geoJSON}></Map>
    </div>
    {/if}

   {#if item.activityStream}
    <ActivityStream stream={item.activityStream} title="Tidslinje"></ActivityStream>
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