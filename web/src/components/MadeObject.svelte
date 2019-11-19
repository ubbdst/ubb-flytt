<script>
  import ActivityStream from './ActivityStream'
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
  .metadata {
    margin-bottom: 2em;
  }

  .metadata img.cc-icon {
    height: 1em;
    top: 0.1em;
    position: relative;
  }

  .metadata img.rights-icon {
    height: 1em;
    padding-top: 0.1em;
    position: relative;
  }

  a.rights {
    display: inline-flex;
  }
 
</style>

<main class="section">
  <div class="container">
    <h1 class="title is-size-1 has-text-centered">{item.label}</h1>
    <p class="metadata has-text-centered">
      {item.preferredIdentifier}, 
      <a class="rights" href="{item.rights}">
        {#if item.rights == 'https://creativecommons.org/publicdomain/mark/1.0/'}
          <img class="image is-16x16 cc-icon" alt="{item.rights}" src="/cc-icons/cc.svg">
          <img class="image is-16x16 cc-icon" alt="{item.rights}" src="/cc-icons/pd.svg">
        {/if}
        {#if item.rights == 'https://creativecommons.org/licenses/by/4.0/'}
          <img class="image is-16x16 cc-icon" alt="{item.rights}" src="/cc-icons/cc.svg">
          <img class="image is-16x16 cc-icon" alt="{item.rights}" src="/cc-icons/by.svg">
        {/if}
        {#if item.rights == 'https://creativecommons.org/publicdomain/zero/1.0/'}
          <img class="image is-16x16 cc-icon" alt="{item.rights}" src="/cc-icons/cc.svg">
          <img class="image is-16x16 cc-icon" alt="{item.rights}" src="/cc-icons/zero.svg">
        {/if}
        {#if item.rights == 'https://rightsstatements.org/vocab/InC/1.0/'}
          <img class="image rights-icon" alt="{item.rights}" src="/rights-statements/buttons/InC.dark-white-interior.svg">
        {/if}
        {#if item.rights == 'https://rightsstatements.org/vocab/InC-NC/1.0/'}
          <img class="image rights-icon" alt="{item.rights}" src="/rights-statements/buttons/NoC-NONCOMMERCIAL.dark-white-interior.svg">
        {/if}
        {#if item.rights == 'https://rightsstatements.org/vocab/CNE/1.0/'}
          <img class="image rights-icon" alt="{item.rights}" src="/rights-statements/buttons/Other-NOTEVALUATED.dark-white-interior.svg">
        {/if}
        {#if item.rights == 'https://rightsstatements.org/vocab/UND/1.0/'}
          <img class="image rights-icon" alt="{item.rights}" src="/rights-statements/buttons/Other-UNDETERMINED.dark-white-interior.svg">
        {/if}
      </a>
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

   { #if item.activityStream}
    <ActivityStream stream={item.activityStream} title="Tidslinje"></ActivityStream>
    {/if}

  </div>
</main>