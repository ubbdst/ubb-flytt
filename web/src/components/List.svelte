<script>
  import imageUrlBuilder from "@sanity/image-url";
  import client from "../sanityClient";

  export let objects;
  export let imageSize = "32x32";
  export let path = "id";

  // Get a pre-configured url-builder from your sanity client
  const builder = imageUrlBuilder(client);

  // Then we like to make a simple function like this that gives the
  // builder an image and returns the builder for you to specify additional
  // parameters:
  function urlFor(source) {
    return builder.image(source);
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }
</script>

<style>

</style>

<ul>
  {#each objects as o, i}
    <li class="media">
      {#if o.mainRepresentation}
        <a class="image is-{imageSize}" rel="prefetch" href="{path}/{o._id}">
          <img
            alt={o.label}
            src={urlFor(o.mainRepresentation)
              .width(250)
              .height(250)
              .url()} />
        </a>
      {/if}

      <div class="content">
        <p class="title is-size-5">
          <a rel="prefetch" href="{path}/{o._id}">
            {o.label && o.label.nor ? o.label.nor : o.label}
          </a>
        </p>
      </div>
    </li>
  {/each}
</ul>
