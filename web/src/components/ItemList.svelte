<script>
  import { onMount, onDestroy } from 'svelte';
  import client from '../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'
  import Mirador from './Mirador3'

  export let image
  export let label
  export let alt
  export let id

  // Get a pre-configured url-builder from your sanity client
  const builder = imageUrlBuilder(client)

  // Then we like to make a simple function like this that gives the
  // builder an image and returns the builder for you to specify additional
  // parameters:
  function urlFor(source) {
    return builder.image(source)
  }
</script>

<style>

</style>

<div class="media">
  {#if image}
  <figure class="media-left">
    <img class="image is-64x64" alt="{alt ? alt : ''}" src={urlFor(image).width(250).url()} />
  </figure>
  {/if}
  <div class="media-content">
    <div class="content">
      <h1>
        <a href="id/{id}">{label}</a>
      </h1>
    </div>
  </div>
</div>