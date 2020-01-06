<script context="module">
	import client from '../sanityClient'
	
	export function preload({ params, query }) {
		query = `{
			"articles": 
				*[_type == "linguisticObject" && accessState == "open" && defined(slug.current) && publishedAt < now()] | order(publishedAt desc) [0..9], 
			"siteSettings": 
				*[_type == "siteSettings"],
			"latest": 
				*[_type == "madeObject" && accessState == "open"] | order(_createdAt desc) [0..9]
				{
					...,
					mainRepresentation{
						...,
						asset->
					}
				}
		}`

    return client.fetch(query).then(data => {
			return { data };
		}).catch(err => this.error(500, err));
	}
</script>

<script>
	import ItemList from '../components/ItemList'

  import imageUrlBuilder from '@sanity/image-url'
  
  // Get a pre-configured url-builder from your sanity client
  const builder = imageUrlBuilder(client)

  // Then we like to make a simple function like this that gives the
  // builder an image and returns the builder for you to specify additional
  // parameters:
  function urlFor(source) {
    return builder.image(source)
  }

  export let data;

  function formatDate(date) {
    return new Date(date).toLocaleDateString()
  }
</script>

<style>
	.hero {
		width: 100%;
		height: 60vh;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0)), url('https://cdn.sanity.io/images/e56ijdvg/production/07dfa9cdc998f60c49fba21624ac9cd5ab34b428-3264x2448.jpg?w=1200')
	}
</style>

<svelte:head>
	<title>{data.siteSettings[0].title}</title>
</svelte:head>

<section class="hero is-primary">
	<div class="hero-body">
    <div class="container">
      <h1 class="title">{data.siteSettings[0].title}</h1>
      <h2 class="subtitle">{data.siteSettings[0].description}</h2>
    </div>
  </div>
</section>

<section class="section">
	<h1 class="title">Artikler</h1>
	<div class="container">
		<ul>
		{#each data.articles as post}
			<!-- we're using the non-standard `rel=prefetch` attribute to
					tell Sapper to load the data for the page as soon as
					the user hovers over the link or taps it, instead of
					waiting for the 'click' event -->
			<!-- <ItemList id={`articles/${post.slug.current}`} label={post.label.nor} image={post.mainImage} /> -->
			<li class="post">
				<h3 class="title"><a rel='prefetch' href='articles/{post.slug.current}'>{post.label.nor}</a></h3>
				<p>({formatDate(post.publishedAt)})</p>
			</li>
		{/each}
		</ul>
	</div>
</section>

<section class="section">
	<h1 class="title">Sist registrerte</h1>
	<div class="container">
		{#each data.latest as post}
			<!-- we're using the non-standard `rel=prefetch` attribute to
					tell Sapper to load the data for the page as soon as
					the user hovers over the link or taps it, instead of
					waiting for the 'click' event -->
			<!-- <ItemList id={`articles/${post.slug.current}`} label={post.label.nor} image={post.mainImage} /> -->
			<ItemList id={post._id} label={post.label} image={post.mainRepresentation} />
		{/each}
	</div>
</section>

<!-- 
<div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary">
          <p class="title">Vertical...</p>
          <p class="subtitle">Top tile</p>
        </article>
        <article class="tile is-child notification is-warning">
          <p class="title">...tiles</p>
          <p class="subtitle">Bottom tile</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <p class="title">Middle tile</p>
          <p class="subtitle">With an image</p>
          <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/640x480.png">
          </figure>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-danger">
        <p class="title">Wide tile</p>
        <p class="subtitle">Aligned with the right tile</p>
        <div class="content">
        </div>
      </article>
    </div>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child notification is-success">
      <div class="content">
        <p class="title">Tall tile</p>
        <p class="subtitle">With even more content</p>
        <div class="content">
        </div>
      </div>
    </article>
  </div>
</div> -->