<script>
  import Card from './Card.svelte'
  
  export let cards
  export let title
</script>

<style>
  .cards{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
    grid-template-rows: auto;
    grid-gap: 1em;
  }
</style>

<div class="box">
  <h2 class="title has-text-centered">{title}</h2>
  <section class="cards">  
    {#each cards as card, i}
    <Card item={card} />
    {/each}
  </section>
</div>
