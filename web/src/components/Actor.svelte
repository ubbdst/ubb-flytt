<script>
  import client from '../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'
  import Mirador from './Mirador3'

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
  main.section .container figure{
    display: flex;
    justify-content: center;
    align-content: center;
  }

  main.section .container > figure img{
    width: 15em;
    height: 15em;
    margin-bottom: 2em;
  }

  .cards{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
    grid-template-rows: auto;
    grid-gap: 1em;
  }
</style>

<main class="section">
  <div class="container">
    {#if item.mainManifest}
    <div class='mirador'>
      <Mirador manifest='{item.mainManifest.url}'/>
    </div>
    {:else if item.mainRepresentation}
    <figure class="image">
      <img class="is-rounded" alt='{item.title ? item.title : ''}' src={urlFor(item.mainRepresentation).width(300).height(300).url()} />
    </figure>
    {/if}

    <h1 class="title has-text-centered">{item.label}</h1>
    
    {#if item.description}
    <p class="content is-medium">
      {@html item.description}
    </p>
    {/if}

    {#if item.activityStream}
    <div class="timeline">
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
                <span style="display: block;"><a alt="{actor.actor.label}" href="id/{actor.actor._id}">{actor.actor.label}</a></span>
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
          </div>
        </li>
        {/each}
      </ul>
    </div>
    {/if}

    {#if item.referencedBy}
    <div class="box">
      <h2 class="title has-text-centered">Relatert til</h2>
      <section class="cards">  
        {#each item.referencedBy as reference, i}
        <article class="card">
            <a class="card-image" rel='prefetch' href='id/{reference._id}'>
              <figure class="image">
                <img class='rounded' alt="{reference.label}" src={urlFor(reference.mainRepresentation).width(250).height(250).url()} />
              </figure>
            </a>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title"><a rel=prefetch href='id/{reference._id}'>{reference.label}</a></p>
                </div>
              </div>
            </div>
        </article>
        {/each}
      </section>
    </div>
    {/if}
  </div>
</main>