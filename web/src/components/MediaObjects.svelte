<script>
  import imageUrlBuilder from '@sanity/image-url'
  import client from '../sanityClient'

  export let objects
  export let title
  export let imageSize = '32x32'
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

<div class="box">
  {#if title}
  <h2 class="title has-text-centered">{title}</h2>
  {/if}
  <section>  
    {#each objects as o, i}
    <article class="media">
      {#if o.mainRepresentation}    
      <figure class="media-left">
        <a class="image is-{imageSize}" rel='prefetch' href='{path}/{o._id}'>
          <img alt="{o.label}" src={urlFor(o.mainRepresentation).width(250).height(250).url()} />
        </a>
      </figure>
      {/if}
      <div class="media-content">
        <div class="content">
          {#if o.label}
          <p class="title is-size-5"><a rel=prefetch href='{path}/{o._id}'>{o.label}</a></p>
          {/if}
          {#if o.title}
          <p class="title is-size-5"><a rel=prefetch href='{path}/{o._id}'>{o.title}</a></p>
          {/if}
          {#if o.moved && o.moved.lenght > 0}
          {#each o.moved as item, i}
            <p class="title is-size-5"><a rel=prefetch href='{path}/{item._id}'>{item.label ? item.label : 'Ingen tittel'}</a></p>
          {/each}
          {/if}
        </div>
      </div>
    </article>
    {/each}
  </section>
</div>
