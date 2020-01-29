<script context="module">
  import client from "../../sanityClient";
  import imageUrlBuilder from "@sanity/image-url";
  import Cards from "../../components/Cards";

  export function preload({ params, query }) {
    return client
      .fetch(
        '*[_type == "move" && accessState == "open"]|order(preferredIdentifier desc){..., hasType[]->{ _id, label }}'
      )
      .then(items => {
        return { items };
      })
      .catch(err => this.error(500, err));
  }
</script>

<script>
  export let items;

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  // Get a pre-configured url-builder from your sanity client
  const builder = imageUrlBuilder(client);

  // Then we like to make a simple function like this that gives the
  // builder an image and returns the builder for you to specify additional
  // parameters:
  function urlFor(source) {
    return builder.image(source);
  }
</script>

<style>

</style>

<svelte:head>
  <title>Flytt</title>
</svelte:head>

<main class="section">
  <Cards cards={items} title="Flyttinger" />
</main>
