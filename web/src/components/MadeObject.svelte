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
    margin: .25em;
    max-width: calc(15% -  1em);
	}

  article.depicted .image img {
    border-radius: 50%;
  }
	
  article .content {
		padding: 0.5rem;
	}

	article .content h1 {
		font-size: 1rem;
    font-weight: bolder;
    text-align: center;
  }
  
	article .image img {
		width: 100%;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
  }
  
  .timeline {
    padding: 1em;
  }

  .timeline ul {
    padding: 0.5em 0 0 2em;
    margin: 0;
    list-style: none;
    position: relative;
    z-index: 2;
  }
  .timeline ul::before {
    content: ' ';
    height: 100%;
    width: 1px;
    background-color: lightgray;
    position: absolute;
    top: 0;
    left: 2.5em;
    z-index: -1; 
  }
  
  .timeline li div{
    display: inline-block;
    /* margin: 0 0 1em 0; */
    vertical-align: top;
  }
  
  .timeline .bullet {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: border-box;
    border-radius: 50%;
    background: white;
    margin-right: 1em;
  }
    
  .timeline .bullet.pink {
    border: 2px solid pink;
  }  
  
  .timeline .desc {
    width: 90%;
  }

  .timeline .desc .time {
    font-size: 0.8em;
  }
  
  .timeline h3 {
    font-size: 1em;
    font-weight: bolder;
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
    margin: 1em 0;
  }
  
	@media screen and (min-width: 40em) {
    article {
       max-width: calc(15% -  1em);
    }
	}
	
	@media screen and (min-width: 60em) {
    .grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      /* grid-gap: 10px; */
      grid-auto-rows: minmax(100px, auto);
      grid-auto-flow: column;
      grid-auto-columns: minmax(260px, 1fr);
    }

		article {
				max-width: calc(15% - 1em);
    }
  }

  main {
    grid-column: 1 / 3;
  }

  .metadata {
    padding: 0.25em 1em;
    border-bottom: 1px solid rgb(61, 28, 17);
  }
  .metadata img.cc-icon, img.rights-icon {
    height: 1em;
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

    <div class="metadata">
      {item.preferredIdentifier}, 
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

    <!-- {#if item.geoJSON}
    <div class="map">
      <Map src={item.geoJSON}></Map>
    </div>
    {/if} -->

    {#if item.activityStream}
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
            {#if activity.geoJSON || activity.tookPlaceAt }
              <div class="map">
                <Map src={activity}></Map>
              </div>
              {/if}
          </div>
        </li>
        {/each}
      </ul>
    </div>
    {/if}
  </main>
</div>