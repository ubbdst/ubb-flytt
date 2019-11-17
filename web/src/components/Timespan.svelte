<script>
  export let items

  function formatDate(date) {
    return new Date(date).toLocaleDateString()
	}
</script>

<style>

</style>

{#each items as e, i}
<div class="time">
  {#if e.date}{formatDate(e.date)}{/if}
  {#if e.beginOfTheBegin}{formatDate(e.beginOfTheBegin)}{/if}{#if e.beginOfTheBegin && e.endOfTheEnd}&nbsp;- {/if}{#if e.endOfTheEnd}{formatDate(e.endOfTheEnd)}{/if}
</div>
{/each}