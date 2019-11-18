<script>
  import ActivityStream from './ActivityStream'
  import Cards from './Cards'
  import MediaObjects from './MediaObjects'
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

  let titleForMove = 'Flytt fra ' + item.movedFrom.title + ' til ' + item.movedTo.title

</script>

<style>
</style>

<svelte:head>
	<title>{titleForMove}</title>
</svelte:head>

<main class="section">
  <div class="container">
    <h1 class="title is-hidden has-text-centered">{titleForMove}</h1>

    <div class="box">
      <div class="columns">
        <div class="column has-text-centered">
          {#if item.movedFrom}
          <h3 class="title is-size-5">Flyttet fra</h3>
          <ul>
            <li><a href="/places/{item.movedFrom._id}">{item.movedFrom.title}</a></li>
          </ul>
          {/if}
        </div>

        <div class="column is-half">
          {#if item.timespan}
          <p><Timespan items={item.timespan}></Timespan></p>
          {/if}

          {#if item.carriedOutBy && item.carriedOutBy.length > 0}
          <p>Ansvarlig(e):</p>
          <div class="columns">
            {#each item.carriedOutBy as a, i}
            <div class="column is-1">
              <figure class="image is-32x32">
                <a href="/id/{a._id}">
                  <img class="is-rounded" src="{urlFor(a.mainRepresentation).width(128).height(128).url()}" alt="Actor icon" />
                </a>
              </figure>
            </div>
            <div class="column has-text-left">
              <div class="content">
                <p><a href="/id/{a._id}">{a.label}</a></p>
              </div>
            </div>
            {/each}
          </div>
          {/if}

          {#if item.wasMotivatedBy && item.wasMotivatedBy.length > 0}
          <p>Motivasjon:</p>
          <div class="columns">
            {#each item.wasMotivatedBy as a, i}
            <div class="column has-text-left">
              <div class="content">
                <p><a href="/id/{a._id}">{a.label}</a></p>
              </div>
            </div>
            {/each}
          </div>
          {/if}

          {#if item.moved && item.moved.length > 0}
          <p class="has-text-centered"><i class="fas fa-truck-moving fa-3x has-text-info"></i></p>
          <MediaObjects objects={item.moved}></MediaObjects>
          {/if}
        </div>

        <div class="column has-text-centered">
          {#if item.movedTo}
          <h3 class="title is-size-5">Flyttet til</h3>
          <ul>
            <li><a href="/places/{item.movedTo._id}">{item.movedTo.title}</a></li>
          </ul>
          {/if}
        </div>
      </div>
    </div>

    {#if item.description}
    <div class="box">
      <div class="content">
        <h2 class="title has-text-centered">Rapport</h2>
        {@html item.description}
      </div>
    </div>
    {/if}

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

    <!-- <div class="box">
      <pre>
        <code>
        {JSON.stringify(item, null, 2)}
        </code>
      </pre>
    </div> -->

  </div>
</main>