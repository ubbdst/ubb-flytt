<script>
  import imageUrlBuilder from '@sanity/image-url'
  import client from '../sanityClient'

  export let cards
  export let title
  export let path = 'id'

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
  .cards{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
    grid-template-rows: auto;
    grid-gap: 1em;
  }
</style>

<div class="box">
  <h2 class="title has-text-centered">{title}</h2>
  <section class="cards">  
    {#each cards as card, i}
    <article class="card">
      {#if card.mainRepresentation}
      <a class="card-image" rel='prefetch' href='{path}/{card._id}'>
        <figure class="image">
          <img class='rounded' alt="{card.label}" src={urlFor(card.mainRepresentation).width(250).height(250).url()} />
        </figure>
      </a>
      {/if}
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title">
              <a rel=prefetch href='{path}/{card._id}'>{card.label ? card.label : card._id}</a>
            </p>
          </div>
        </div>
      </div>
    </article>
    {/each}
  </section>
</div>