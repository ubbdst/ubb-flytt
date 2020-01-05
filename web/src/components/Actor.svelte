<script>
  import ActivityStream from './ActivityStream'
  import Block from './Block'
  import Cards from './Cards'
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

  function formatDate(date) {
    return new Date(date).toLocaleDateString()
	}
</script>

<style>
  main.section .container figure{
    display: flex;
    justify-content: center;
    align-content: center;
  }

  main.section .container > figure img{
    width: 15em;
    height: 15em;
    margin-bottom: 2em;
  }
</style>

<nav class="breadcrumb is-centered is-small" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Hjem</a></li>
    <li><a href="/actors">Aktører</a></li>
    <li class="is-active"><a href="#" aria-current="page">{item.label}</a></li>
  </ul>
</nav>

<main class="section">
  <div class="container">
    {#if item.mainManifest}
    <div class='mirador'>
      <Mirador manifest='{item.mainManifest.url}'/>
    </div>
    {:else if item.mainRepresentation}
    <figure class="image">
      <img class="is-rounded" alt='{item.title ? item.title : ''}' src={urlFor(item.mainRepresentation).width(300).height(300).url()} />
    </figure>
    {/if}

    <h1 class="title has-text-centered">{item.label}</h1>
    
    {#if item.description}
    <p class="content is-medium">
        <Block content={item.description.nor}/>
    </p>
    {/if}

    {#if item.activityStream}
    <ActivityStream stream={item.activityStream} title="Tidslinje"></ActivityStream>
    {/if}

    {#if item.referencedBy}
    <Cards cards={item.referencedBy} title="Relatert til"></Cards>
    {/if}
  </div>
</main>