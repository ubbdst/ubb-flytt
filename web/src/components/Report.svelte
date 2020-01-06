<script>
  import Block from './Block'
  import ActivityStream from './ActivityStream'
  import Cards from './Cards'
  import MediaObjects from './MediaObjects'
  import ConditionAssignment from './ConditionAssignment'
  import Map from './Map'
  import MadeObjectFooter from './MadeObjectFooter'

  import client from '../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'
  
  export let item

  import MainImage from './MainImage'

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

<svelte:head>
	<title>{item.label.nor}</title>
</svelte:head>

<nav class="breadcrumb is-centered is-small" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Hjem</a></li>
    <li><a href="/reports">Rapporter</a></li>
    <li class="is-active"><a href="#" aria-current="page">{item.label.nor}</a></li>
  </ul>
</nav>

<main class="section">
  <div class="text container">
    <h1 class="title is-size-1 has-text-centered">{item.label.nor}</h1>
    
    {#if item.concerned && item.concerned.length > 0}
    <MediaObjects objects={item.concerned} title="Angår" imageSize="64x64"></MediaObjects>
    {/if}

    {#if item.conditionAssignment && item.conditionAssignment.length > 0}
    <ConditionAssignment item={item.conditionAssignment}></ConditionAssignment>
    {/if}

    {#if item.activityStream}
    <ActivityStream stream={item.activityStream} title="Vurdering(er)" showMap="false"></ActivityStream>
    {/if}

    <div class="content">
      <Block content={item.description.nor}/>
    </div>

    {#if item.referencedBy && item.referencedBy.length != 0}
    <Cards cards={item.referencedBy} title="Relatert til"></Cards>
    {/if}
    
    <!-- {#if item.geoJSON}
    <div class="map">
      <Map src={item.geoJSON}></Map>
    </div>
    {/if} -->

    {#if item.documentationImage}
    <div class="box">
      <h2 class="title has-text-centered">Dokumentasjonsfoto</h2>
        {#each item.documentationImage as img, i}
        <a href="{urlFor(img).maxWidth(1600).maxHeight(1600).url()}"><img alt="{img.alt}" src={urlFor(img).width(250).height(250).url()} /></a>
        {/each}
    </div>
    {/if}

    <MadeObjectFooter footerData={item} />

  </div>
</main>