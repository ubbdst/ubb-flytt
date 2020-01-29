<script>
  import Block from "./Block";
  import ActivityStream from "./ActivityStream";
  import Cards from "./Cards";
  import MediaObjects from "./MediaObjects";
  import ConditionAssignment from "./ConditionAssignment";
  import Map from "./Map";
  import DocumentFooter from "./DocumentFooter";
  import MainImage from "./MainImage";

  import client from "../sanityClient";
  import imageUrlBuilder from "@sanity/image-url";

  export let item;

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

<svelte:head>
  <title>{item.label.nor}</title>
</svelte:head>

<nav class="breadcrumb is-centered is-small" aria-label="breadcrumbs">
  <ul>
    <li>
      <a href="/">Hjem</a>
    </li>
    <li>
      <a href="/articles">Artikler</a>
    </li>
    <li class="is-active">
      <a href="#" aria-current="page">{item.label.nor}</a>
    </li>
  </ul>
</nav>

<main class="section">
  <div class="text container">
    <h1 class="title is-size-1 has-text-centered">{item.label.nor}</h1>
    {#if item.body && item.body.nor}
      <Block content={item.body.nor} />
    {/if}

    {#if item.activityStream}
      <ActivityStream
        stream={item.activityStream}
        title="Tidslinje"
        showMap="false" />
    {/if}

    <DocumentFooter footerData={item} />
  </div>
</main>
