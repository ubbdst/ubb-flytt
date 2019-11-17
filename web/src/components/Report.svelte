<script>
  import ActivityStream from './ActivityStream'
  import Cards from './Cards'

  import client from '../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'

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

  let overall = item.overallCondition + '%'
  let ink = item.inkCondition + '%'
  let binding = item.bindingCondition + '%'

  let total = (item.bindingCondition + item.inkCondition) / 2;
  let totalPercentage = total + '%'

</script>

<style>
  .skills {
    height: 5px;
    margin-bottom: 1em;
    border-radius: 2px;
  }

  .overall {width: var(--width); background-color: hsl(171, 100%, 41%)
;}
  .ink {width: var(--width); background-color: hsl(0, 0%, 21%)
;}
  .binding {width: var(--width); background-color: hsl(0, 0%, 48%)
;}
  .total {width: var(--width); background-color: hsl(348, 100%, 61%)
;}
</style>

<main class="section">
  <div class="container">
    <h1 class="title is-size-1 has-text-centered">{item.title}</h1>
    
    {#if item.concerned && item.concerned.length != 0}
    <Cards cards={item.concerned} title="Angår"></Cards>
    {/if}

    <div class="box">
      <h2 class="title has-text-centered">Tilstands-score</h2>
    {#if item.overallCondition}
      <h3 class="title is-size-4">Overordnet tilstand: <span class="is-pulled-right">{item.overallCondition} / 100</span></h3>
      <div style="--width: {overall}" class="skills overall"></div>
    {/if}
    {#if item.inkCondition}
      <h3 class="title is-size-4">Blekktilstand: <span class="is-pulled-right">{item.inkCondition} / 100</span></h3>
      <div style="--width: {ink}" class="skills ink"></div>
    {/if}
    {#if item.bindingCondition}
      <h3 class="title is-size-4">Innbindingstilstand: <span class="is-pulled-right">{item.bindingCondition} / 100</span></h3>
      <div style="--width: {binding}" class="skills binding"></div>
    {/if}
    {#if total}
      <h3 class="title is-size-4">Kalkulert gjennomsnitt (Overordnet tilstand ikke med): <span class="is-pulled-right">{total} / 100</span></h3>
      <div style="--width: {totalPercentage}" class="skills total"></div>
    {/if}
    </div>

    {#if item.description}
      <div class="content">
      {@html item.description}
      </div>
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
      <ActivityStream stream={item.activityStream}></ActivityStream>
    {/if}

    {#if item.documentationImage}
    <div class="box">
      <h2 class="title has-text-centered">Dokumentasjonsfoto</h2>
        {#each item.documentationImage as img, i}
        <img alt="{img.alt}" src={urlFor(img).width(650).url()} />
        {/each}
    </div>
    {/if}

  </div>
</main>