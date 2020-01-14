<script>
  import imageUrlBuilder from '@sanity/image-url'
  import client from '../sanityClient'

  export let item
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

</style>

<article class="card">
  {#if item.mainRepresentation}
  <a class="card-image" rel='prefetch' target="_self" href='{path}/{item._id}'>
    <figure class="image">
      <img class='rounded' alt="{item.label}" src={urlFor(item.mainRepresentation).width(250).height(250).url()} />
    </figure>
  </a>
  {/if}
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title">
        {#if item.label && item.label.nor}
          <a rel=prefetch target="_self" href='{path}/{item._id}'>{item.label.nor}</a>
        {/if}
        {#if item.label && !item.label.nor}
          <a rel=prefetch target="_self" href='{path}/{item._id}'>{item.label}</a>
        {/if}
        {#if !item.label}
          <a rel=prefetch target="_self" href='{path}/{item._id}'>{item._id}</a>
        {/if}
        </p>
      </div>
    </div>
  </div>
  <footer class="card-footer">
    <p class="card-footer-item">
      {#if item.hasType && item.hasType.length > 0}
      <div class="control">
        <div class="tags">
          {#each item.hasType as t, i}
          <span class="tag is-primary">
            <a href="/id/{t._id}">{t.label && t.label.nor || 'Mangler type'}</a>
          </span>
          {/each}
        </div>
      </div>
      {:else}
      <span class="tag is-primary">{item._type}</span>
      {/if}
    </p>
  </footer>
</article>
