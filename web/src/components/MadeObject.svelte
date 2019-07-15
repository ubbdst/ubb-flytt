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
  img {
    width: 100%;
  }
	section {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		width: 100%;
	}
	article {
		display: flex;
		flex-direction: column;
    box-sizing: border-box;
		background-color: rgb(65, 63, 63);
		color: white;
    margin: 1rem .25em;
		box-shadow: 0px 5px 10px rgba(0,0,0,0.15);
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
	}
	.content h1 {
		font-size: 1.4rem;
	}
	article .image img {
		width: 100%;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
	}
	article .content {
		padding: 1rem;
	}

	@media screen and (min-width: 40em) {
    article {
       max-width: calc(50% -  1em);
    }
	}
	
	@media screen and (min-width: 60em) {
		article {
				max-width: calc(25% - 1em);
		}
	}
</style>

<div class='content'>
  <div class='column'>
    {#if item.mainManifest}
      <div class='mirador'>
        <Mirador manifest='{item.mainManifest.url}'/>
      </div>
    {:else}
      <img alt='{item.title ? item.title : ''}' src={urlFor(item.mainRepresentation).width(600).url()} />
    {/if}
  </div>
  <div class='column text'>
    <h1>{item.label}</h1>
    {#if item.description}
      {@html item.description}
    {/if}

    {#if item.depicts}
      <header>
        <h2>Avbildet</h2>
      </header>
      <section>
        {#each item.depicts as depicted, i}
        <article class="depicted">
            <a class="image" rel='prefetch' href='id/{depicted._id}'>
              <img class='rounded' src={urlFor(depicted.mainRepresentation).width(150).height(150).url()} />
            </a>
            <div class="content">
              <h3><a rel=prefetch href='id/{depicted._id}'>{depicted.label}</a></h3>
            </div>
        </article>
        {/each}
      </section>
    {/if}
  </div>
</div>

<div>
  <div class='content'>
  {#each item.depictions as depiction, i}
    <div class="depicted">
      <a rel='prefetch' href='id/{depiction._id}'>
        <img alt='{depiction.label ? depiction.label : ''}' src={urlFor(depiction.mainRepresentation).width(250).height(250).url()}>
      </a>
      <h3><a rel='prefetch' href='id/{depiction._id}'>{depiction.label}</a></h3>
    </div>
  {/each}
  </div>
</div>