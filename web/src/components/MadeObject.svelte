<script>
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
  main.container {
    margin-top: 2em;
  }
  .metadata {
    margin-bottom: 2em;
  }

  .metadata img.cc-icon, img.rights-icon {
    height: 1em;
    padding-top: 0.2em;
    position: relative;
    top: 0.15em;
  }

  .cards{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
    grid-template-rows: auto;
    grid-gap: 1em;
  }

  .map {
    width: 100%;
    height: 300px;
    margin: 1em 0;
  }

  a.rights {
    display: inline-flex;
  }
 
</style>

<main class="container">
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
    manifest={item.mainManifest && item.mainManifest.url ? item.mainManifest.url : ''}
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
  <section class="box">
    <h2 class="title has-text-centered">Avbildet</h2>
    <div class="cards">
      {#each item.depicts as depicted, i}
      <article class="card">
        {#if depicted.mainRepresentation}
          <a class="card-image" rel='prefetch' href='id/{depicted._id}'>
            <figure class="image">
              <img alt='{depicted.label}' src={urlFor(depicted.mainRepresentation).width(250).height(250).url()} />
            </figure>
          </a>
        {/if}
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title"><a rel=prefetch href='id/{depicted._id}'>{depicted.label}</a></p>
            </div>
          </div>
        </div>
      </article>
      {/each}
    </div>
  </section>
  {/if}

  {#if item.referencedBy && item.referencedBy.length != 0}
  <section class="box">
    <h2 class="title has-text-centered">Referert til av</h2>
    <div class='cards'>
    {#each item.referencedBy as reference, i}
      <article class="card">
        {#if reference.mainRepresentation}
        <a class="card-image" rel='prefetch' href='id/{reference._id}'>
          <figure class="image">
            <img alt='{reference.label ? reference.label : ''}' src={urlFor(reference.mainRepresentation).width(350).height(350).url()}>
          </figure>
        </a>
        {/if}
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title"><a rel='prefetch' href='id/{reference._id}'>{reference.label}</a></p>
            </div>
          </div>
        </div>
      </article>
    {/each}
    </div>
  </section>
  {/if}

  <!-- {#if item.geoJSON}
  <div class="map">
    <Map src={item.geoJSON}></Map>
  </div>
  {/if} -->

  {#if item.activityStream}
  <div class="box timeline">
    <h2 class="title has-text-centered">Tidslinje</h2>
    <ul>
      {#each item.activityStream as activity, i}
      <li>
        <div class="bullet pink"></div>

        <div class="desc">
          {#if activity.timespan}
          {#each activity.timespan as e, i}
          <div class="time">
            {#if e.date}{formatDate(e.date)}{/if}
            {#if e.beginOfTheBegin}{formatDate(e.beginOfTheBegin)}{/if}{#if e.beginOfTheBegin && e.endOfTheEnd}&nbsp;- {/if}{#if e.endOfTheEnd}{formatDate(e.endOfTheEnd)}{/if}
          </div>
          {/each}
          
          {/if}

          <h3>{activity._type}</h3>
          {#if activity.carriedOutBy && activity.carriedOutBy.length > 0}
            <p>
            {#each activity.carriedOutBy as actor, i}
              <span><a alt="{actor.actor.label}" href="id/{actor.actor._id}">{actor.actor.label}</a></span>
            {/each}
            </p>
          {/if}
          {#if activity.tookPlaceAt && activity.tookPlaceAt.length > 0}
            <p>
            {#each activity.tookPlaceAt as place, i}
              <span>{place.title}</span>
            {/each}
            </p>
          {/if}
          {#if activity.geoJSON || activity.tookPlaceAt }
            <div class="map">
              <Map src={activity}></Map>
            </div>
            {/if}
        </div>
      </li>
      {/each}
    </ul>
  </div>
  {/if}
</main>