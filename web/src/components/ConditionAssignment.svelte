<script>
  import imageUrlBuilder from '@sanity/image-url'
  import client from '../sanityClient'
  const decamelize = require('decamelize'); 

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
  
  let total = item.reduce((acc, value, index, array) => {
    console.log(value)
    acc += value.condition;
    console.log(acc)
    if(index === array.length-1) { 
      console.log(acc/array.length)
      return acc/array.length;
    }else{ 
      console.log(acc)
      return acc;
    }
  }, 0)

  let totalPercentage = total + '%'
</script>

<style>
  .skills {
    height: 5px;
    margin-top: 3px;
    margin-bottom: 1em;
    border-radius: 2px;
  }

  .overallCondition {width: var(--width); background-color: hsl(171, 100%, 41%);}
  .inkCondition {width: var(--width); background-color: hsl(0, 0%, 21%);}
  .bindingCondition {width: var(--width); background-color: hsl(0, 0%, 48%);}
  .total {width: var(--width); background-color: hsl(348, 100%, 61%);}
</style>

<div class="box">
  <h2 class="title has-text-centered">Tilstands-score</h2>
  
  {#each item as c, i}
  <h3 class="title is-size-6 is-marginless">{decamelize(c.conditionType, ' ')}: <span class="is-pulled-right">{c.condition} / 100</span></h3>
  <div style="width: {c.condition}%" class="skills {c.conditionType}"></div>
  {/each}

  <hr>

  <h3 class="title is-size-6 is-marginless">Kalkulert gjennomsnitt: <span class="is-pulled-right">{total} / 100</span></h3>
  <div style="--width: {totalPercentage}" class="skills total"></div>
  <span>(Overordnet tilstand ikke med)</span>
</div>