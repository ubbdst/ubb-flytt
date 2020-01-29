<script>
  export let item;

  let total = item.reduce((acc, value, index, array) => {
    acc += value.condition;

    if (index === array.length - 1) {
      return acc / array.length;
    } else {
      return acc;
    }
  }, 0);

  let totalPercentage = total + "%";

  let sliderColor = "";
</script>

<style>
  .skills {
    height: 5px;
    margin-top: 3px;
    margin-bottom: 1em;
    border-radius: 2px;
  }
  .default {
    width: var(--width);
    background-color: hsl(171, 100%, 41%);
  }
  /*   .overall {width: var(--width); background-color: hsl(171, 100%, 41%);}
  .ink {width: var(--width); background-color: hsl(0, 0%, 21%);}
  .binding {width: var(--width); background-color: hsl(0, 0%, 48%);} */
  .total {
    width: var(--width);
    background-color: hsl(348, 100%, 61%);
  }
</style>

<div class="box">
  <h2 class="title has-text-centered">Tilstands-score</h2>

  {#each item as c, i}
    <h3 class="title is-size-6 is-marginless">
      {c.hasType.label.nor}:
      <span class="is-pulled-right">{c.condition} / 100</span>
    </h3>
    <div style="width: {c.condition}%" class="skills default" />
  {/each}

  <hr />

  <h3 class="title is-size-6 is-marginless">
    Kalkulert gjennomsnitt:
    <span class="is-pulled-right">{total} / 100</span>
  </h3>
  <div style="--width: {totalPercentage}" class="skills total" />
</div>
