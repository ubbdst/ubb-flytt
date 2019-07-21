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
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
  }
  

	section {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		width: 100%;
	}
	article {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
    box-sizing: border-box;
		background-color: rgb(65, 63, 63);
		color: white;
    margin: 0 1em 2em 0;
		padding: 1em;
		box-shadow: 0px 5px 10px rgba(0,0,0,0.15);
	}
	.content h1 {
		font-size: 1.4rem;
	}
	article .image img {
		width: 100%;
		box-shadow: 0px 5px 10px rgba(0,0,0,0.75);
	}

	article .image {
		width: 50%;
	}

	.content {
		padding-left: 1rem;
		width: 50%;
	}

	@media screen and (min-width: 40em) {
    article {
       max-width: 100%;
    }
	}
	
	@media screen and (min-width: 60em) {
		article {
			max-width: calc(50% - 2em);
		}
	}

  .left {
    float: left;
    margin: 0 2em 2em 0;
  }
  header {
    display: block;
    width: 100%;
  }
</style>

<main>
  {#if item.mainManifest}
    <div class='mirador'>
      <Mirador manifest='{item.mainManifest.url}'/>
    </div>
  {:else if item.mainRepresentation}
    <img class="left" alt='{item.title ? item.title : ''}' src={urlFor(item.mainRepresentation).width(300).url()} />
  {/if}

  <h1>{item.label}</h1>
  {#if item.bio}
    {@html item.bio}
  {/if}

  {#if item.depictions}
    <section>
    <header>
      <h2>Relatert til</h2>
    </header>
    {#each item.depictions as depiction, i}
    <article class="depicted">
        <a class="image" rel='prefetch' href='id/{depiction._id}'>
          <img class='rounded' alt="{depiction.label}" src={urlFor(depiction.mainRepresentation).width(150).height(150).url()} />
        </a>
        <div class="content">
          <h1><a rel=prefetch href='id/{depiction._id}'>{depiction.label}</a></h1>
        </div>
    </article>
    {/each}
    </section>
  {/if}
</main>