<script context="module">
  import client from "../sanityClient";

  export function preload({ params, query }) {
    query = `{
			"articles": 
				*[_type == "linguisticObject" && accessState == "open" && defined(slug.current) && publishedAt < now()] | order(publishedAt desc) [0..8], 
			"siteSettings": 
				*[_type == "siteSettings"],
			"latest": 
				*[_type == "madeObject" && accessState == "open"] | order(_createdAt desc) [0..11]
				{
					...,
					hasType[]->,
					mainRepresentation{
						...,
						asset->
					}
				}
		}`;

    return client
      .fetch(query)
      .then(data => {
        return { data };
      })
      .catch(err => this.error(500, err));
  }
</script>

<script>
  import ItemList from "../components/ItemList";
  import Cards from "../components/Cards";

  import imageUrlBuilder from "@sanity/image-url";

  // Get a pre-configured url-builder from your sanity client
  const builder = imageUrlBuilder(client);

  // Then we like to make a simple function like this that gives the
  // builder an image and returns the builder for you to specify additional
  // parameters:
  function urlFor(source) {
    return builder.image(source);
  }

  export let data;

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }
</script>

<style>
  /* .hero {
    width: 100%;
    height: 60vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(20, 15, 15, 0)),
      url("https://live.staticflickr.com/3398/3666376184_7edbe5b84b_k_d.jpg");
  } */
</style>

<svelte:head>
  <title>{data.siteSettings[0].title}</title>
</svelte:head>

<!-- <section class="hero is-primary" /> -->

<section class="section">
  <div class="text container">
    <h1 class="title">{data.siteSettings[0].title}</h1>
    <h2 class="subtitle">{data.siteSettings[0].description}</h2>
  </div>
</section>

{#if data.articles.length != 0}
<div class="container">
  <Cards cards={data.articles} title="Artikler" />
</div>
{/if}

{#if data.latest.length != 0}
<div class="container">
  <Cards cards={data.latest} title="Sist registrerte" />
</div>
{/if}
