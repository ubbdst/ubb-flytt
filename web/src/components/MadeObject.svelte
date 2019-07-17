<script>
  import client from '../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'

  import MainImage from './MainImage'

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
  
  .timeline ul {
    padding: 1em 0 0 2em;
    margin: 0;
    list-style: none;
    position: relative;
  }
  .timeline ul::before {
    content: ' ';
    height: 100%;
    width: 1px;
    background-color: lightgray;
    position: absolute;
    top: 0;
    left: 2.5em;
    /* z-index: -1; */
  }
  
  .timeline li div{
    display: inline-block;
    margin: 1em 0;
    vertical-align: top;
  }
  
  .timeline .bullet {
    width: 1em;
    height: 1em;
    box-sizing: border-box;
    border-radius: 50%;
    background: white;
    z-index: 1;
    margin-right: 1em;
  }
    
  .timeline .bullet.pink {
    border: 2px solid pink;
  }  
  
  .timeline .time {
    width: 20%;
    font-size: 0.75em;
    padding-top: 0.25em;
  }
  
  .timeline .desc {
    width: 50%;
  }
  
  .timeline h3 {
    font-size: 0.9em;
    font-weight: 400;
    margin: 0;
  }
  
  .timeline p {
    margin: 0;
    font-size: 0.7em;
    font-weight: 400;
    color: dark-grey;
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

<h1>{item.label}</h1>
{#if item.description}
  {@html item.description}
{/if}

<MainImage 
  image={item.mainRepresentation}
  manifest={item.mainManifest && item.mainManifest.url ? item.mainManifest.url : ''}
  rights={item.rights}
  id={item.preferredIdentifier}
  alt={item.title}>
</MainImage>



{#if item.depicts.length != 0}
  <header>
    <h2>Avbildet</h2>
  </header>
  <section>
    {#each item.depicts as depicted, i}
    <article class="depicted">
      {#if depicted.mainRepresentation}
        <a class="image" rel='prefetch' href='id/{depicted._id}'>
          <img alt='{depicted.label}' class='rounded' src={urlFor(depicted.mainRepresentation).width(150).height(150).url()} />
        </a>
      {/if}
      <div class="content">
        <h1><a rel=prefetch href='id/{depicted._id}'>{depicted.label}</a></h1>
      </div>
    </article>
    {/each}
  </section>
{/if}

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

{#if (item.activityStream && item.activityStream[0].timespan) || (item.activityStream && item.activityStream[0].carriedOutBy)}
<div class="timeline">
  <h2>Tidslinje</h2>
  <ul>
    {#each item.activityStream as activity, i}
    <li>
      <div class="bullet pink"></div>
      {#if activity.timespan}
      {#each activity.timespan as e, i}
        <div class="time">
          {#if e.date}{e.date}{/if}
          {#if e.beginOfTheBegin}{e.beginOfTheBegin}{/if}{#if e.beginOfTheBegin && e.endOfTheEnd} - {/if}{#if e.endOfTheEnd}{e.endOfTheEnd}{/if}
        </div>
      {/each}
      {/if}
      <div class="desc">
        <h3>{activity._type}</h3>
        {#if activity.carriedOutBy && activity.carriedOutBy.length > 0}
          <p>Skapt av: 
          {#each activity.carriedOutBy as actor, i}
            <span>{actor.actor.label}</span>
          {/each}
          </p>
        {/if}
      </div>
    </li>
    {/each}
  </ul>
</div>
{/if}
    