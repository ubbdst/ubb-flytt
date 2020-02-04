<script>
  import Map from "./Map";
  import Geojson from "./Geojson";
  import Cards from "./Cards";

  export let item;
</script>

<style>
  .map {
    height: 400px;
  }
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
      <a href="/periods">Perioder</a>
    </li>
    <li class="is-active">
      <a href="#" aria-current="page">{item.label.nor}</a>
    </li>
  </ul>
</nav>

<main class="section">
  <h1 class="title has-text-centered">{item.label.nor}</h1>
  {#if item.geoJSON}
    <div class="map">
      <Map src={item.geoJSON} />
    </div>
  {/if}

  {#if item.definingSTV}
    {#each item.definingSTV.hadPresence as presence}
    <div class="map">
      <Geojson src={presence} />
    </div>
    {/each}
  {/if}
  
  <Cards cards={item.referencedBy} title="Relatert til" />

  <pre>
    <code>{JSON.stringify(item, null, 2)}</code>
  </pre>

</main>
