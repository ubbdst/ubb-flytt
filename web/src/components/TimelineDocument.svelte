<script>
  import Timeline from './Timeline'
  
  export let item;

  console.log(JSON.stringify(item, undefined, 2));

</script>

<style>
</style>

<svelte:head>
  <title>{item.headline.nor}</title>
</svelte:head>

<nav class="breadcrumb is-centered is-small" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Hjem</a></li>
    <li><a href="/timelines">Tidslinjer</a></li>
    <li class="is-active"><a href="#" aria-current="page">{item.headline.nor}</a></li>
  </ul>
</nav>

<Timeline item={item} />
 