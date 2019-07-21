<script>
  import client from '../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'

  import MainImage from './MainImage'
  import Map from './Map'

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
  .main {
    padding: 1em;
    background-color: rgb(34, 30, 30);
    color: rgb(221, 217, 217)
  }

	section {
		border-top: 1px solid rgba(255,62,0,0.1);
    border-bottom: 1px solid rgba(255,62,0,0.1);
    padding-top: 1em;
		/* display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		width: 100%; */
  }

  section h2 {
    font-size: 1.2em;
    color: dimgrey;
    width: 100%;
    display: block;
  }

  .horizontal {
    display: flex;
    flex-direction: row;
    overflow: scroll;
    width: 100%;
  }
  
	article {
    display: flex;
    flex: 0 0 auto;
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
		font-size: 0.8rem;
  }
  
	article .image img {
		width: 100%;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
  }
  
	article .content {
		padding: 1rem;
	}
  
  .timeline {
    padding: 1em;
  }

  .timeline ul {
    padding: 0.5em 0 0 2em;
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
    z-index: 1;
  }
  
  .timeline li div{
    display: inline-block;
    margin: 0 0 1em 0;
    vertical-align: top;
  }
  
  .timeline .bullet {
    width: 1em;
    height: 1em;
    box-sizing: border-box;
    border-radius: 50%;
    background: white;
    z-index: 2;
    margin-right: 1em;
  }
    
  .timeline .bullet.pink {
    border: 2px solid pink;
  }  
  
  .timeline .desc {
    width: 75%;
  }

  .timeline .desc .time {
    font-size: 0.8em;
  }
  
  .timeline h3 {
    font-size: 0.9em;
    font-weight: 400;
    margin: 0;
    text-transform: capitalize;
  }
  
  .timeline p {
    margin: 0;
    font-size: 0.7em;
    font-weight: 400;
    color: dark-grey;
  }

  .map {
    width: 100%;
    height: 300px;
  }
  
	@media screen and (min-width: 40em) {
    article {
       max-width: calc(50% -  1em);
    }
	}
	
	@media screen and (min-width: 60em) {
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      /* grid-gap: 10px; */
      grid-auto-rows: minmax(100px, auto);
      grid-auto-flow: column;
      grid-auto-columns: minmax(260px, 1fr);
    }

		article {
				max-width: calc(25% - 1em);
    }
    
    aside {
      border-left: 1px solid #333;
      overflow-x: scroll
    }
  }

  main {
    grid-column: 1 / 3;
  }
  aside { 
    grid-column: 3;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    background-color: black;
    color: white;
  }
  .metadata {
    padding: 1em;
    border-bottom: 1px solid rgb(61, 28, 17);
  }
  .metadata img.cc-icon, img.rights-icon {
    height: 1.2em;
    padding-top: 0.2em;
    position: relative;
    top: 0.15em;
  }

  a.rights {
    text-decoration: none;
  }
</style>

<div class="grid">
  <main>
    <MainImage 
      image={item.mainRepresentation}
      manifest={item.mainManifest && item.mainManifest.url ? item.mainManifest.url : ''}
      rights={item.rights}
      id={item.preferredIdentifier}
      alt={item.title}>
    </MainImage>

    <div class="main">
      <h1>{item.label}</h1>
      {#if item.description}
        {@html item.description}
      {/if}

      {#if item.depicts && item.depicts.length != 0}
      <section class="box">
        <header>
          <h2>Avbildet</h2>
        </header>
        <div class="horizontal">
          {#each item.depicts as depicted, i}
          <article class="depicted">
            {#if depicted.mainRepresentation}
              <a class="image" rel='prefetch' href='id/{depicted._id}'>
                <img alt='{depicted.label}' class='rounded' src={urlFor(depicted.mainRepresentation).width(200).height(200).url()} />
              </a>
            {/if}
            <div class="content">
              <h1><a rel=prefetch href='id/{depicted._id}'>{depicted.label}</a></h1>
            </div>
          </article>
          {/each}
        </div>
      </section>
      {/if}

      {#if item.referencedBy && item.referencedBy.length != 0}
      <section class="box">
        <header>
          <h2>Referert til av</h2>
        </header>
        <div class='horizontal'>
        {#each item.referencedBy as reference, i}
          <article class="depicted">
            {#if reference.mainRepresentation}
            <a class="image" rel='prefetch' href='id/{reference._id}'>
              <img alt='{reference.label ? reference.label : ''}' src={urlFor(reference.mainRepresentation).width(200).height(200).url()}>
            </a>
            {/if}
            <div class="content">
              <h1><a rel='prefetch' href='id/{reference._id}'>{reference.label}</a></h1>
            </div>
          </article>
        {/each}
        </div>
      </section>
      {/if}
    </div>
  </main>

    
  <aside>
    {#if item.geoJSON}
    <div class="map">
      <Map src={item.geoJSON}></Map>
    </div>
    {/if}

    <div class="metadata">
      <strong>{item.preferredIdentifier}</strong>, 
      <a class="rights" href="{item.rights}">
        {#if item.rights == 'https://creativecommons.org/publicdomain/mark/1.0/'}
          <img class="cc-icon" alt="{item.rights}" src="/cc-icons/cc.svg">
          <img class="cc-icon" alt="{item.rights}" src="/cc-icons/pd.svg">
        {/if}
        {#if item.rights == 'https://creativecommons.org/licenses/by/4.0/'}
          <img class="cc-icon" alt="{item.rights}" src="/cc-icons/cc.svg">
          <img class="cc-icon" alt="{item.rights}" src="/cc-icons/by.svg">
        {/if}
        {#if item.rights == 'https://creativecommons.org/publicdomain/zero/1.0/'}
          <img class="cc-icon" alt="{item.rights}" src="/cc-icons/cc.svg">
          <img class="cc-icon" alt="{item.rights}" src="/cc-icons/zero.svg">
        {/if}
        {#if item.rights == 'https://rightsstatements.org/vocab/InC/1.0/'}
          <img class="rights-icon" alt="{item.rights}" src="/rights-statements/buttons/InC.dark-white-interior.svg">
        {/if}
        {#if item.rights == 'https://rightsstatements.org/vocab/InC-NC/1.0/'}
          <img class="rights-icon" alt="{item.rights}" src="/rights-statements/buttons/NoC-NONCOMMERCIAL.dark-white-interior.svg">
        {/if}
        {#if item.rights == 'https://rightsstatements.org/vocab/CNE/1.0/'}
          <img class="rights-icon" alt="{item.rights}" src="/rights-statements/buttons/Other-NOTEVALUATED.dark-white-interior.svg">
        {/if}
        {#if item.rights == 'https://rightsstatements.org/vocab/UND/1.0/'}
          <img class="rights-icon" alt="{item.rights}" src="/rights-statements/buttons/Other-UNDETERMINED.dark-white-interior.svg">
        {/if}
      </a>
    </div>

    {#if (item.activityStream && item.activityStream[0].timespan) || (item.activityStream && item.activityStream[0].carriedOutBy)}
    <div class="timeline">
      <h2>Tidslinje</h2>
      <ul>
        {#each item.activityStream as activity, i}
        <li>
          <div class="bullet pink"></div>

          <div class="desc">
            {#if activity.timespan}
            {#each activity.timespan as e, i}
            <div class="time">
              {#if e.date}{e.date}{/if}
              {#if e.beginOfTheBegin}{e.beginOfTheBegin}{/if}{#if e.beginOfTheBegin && e.endOfTheEnd}&nbsp;- {/if}{#if e.endOfTheEnd}{e.endOfTheEnd}{/if}
            </div>
            {/each}
            {:else}
            <div class="time">Ukjent dato</div>
            {/if}

            <h3>{activity._type}</h3>
            {#if activity.carriedOutBy && activity.carriedOutBy.length > 0}
              <p>
              {#each activity.carriedOutBy as actor, i}
                <span><a alt="{actor.actor.label}" href="id/{actor.actor._id}">{actor.actor.label}</a></span>
              {/each}
              </p>
            {/if}
            {#if activity.tookPlaceAt && activity.tookPlaceAt.length > 0}
              <p>
              {#each activity.tookPlaceAt as place, i}
                <span>{place.title}</span>
              {/each}
              </p>
            {/if}
          </div>
        </li>
        {/each}
      </ul>
    </div>
    {/if}
  </aside>
</div>