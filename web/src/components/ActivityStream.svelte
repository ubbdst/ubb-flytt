<script>
  import Map from './Map'
  import { onMount, onDestroy } from 'svelte';
  import imageUrlBuilder from '@sanity/image-url'
  import client from '../sanityClient'

  export let stream

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
  .map {
    width: 100%;
    height: 300px;
    margin: 1em 0;
  }
</style>

<div class="box timeline">
  <h2 class="title has-text-centered">Tidslinje</h2>
  <ul>
    {#each stream as activity, i}
    <li>
      <div class="bullet pink"></div>

      <div class="desc">
        {#if activity.timespan}
        {#each activity.timespan as e, i}
        <div class="time">
          {#if e.date}{formatDate(e.date)}{/if}
          {#if e.beginOfTheBegin}{formatDate(e.beginOfTheBegin)}{/if}{#if e.beginOfTheBegin && e.endOfTheEnd}&nbsp;- {/if}{#if e.endOfTheEnd}{formatDate(e.endOfTheEnd)}{/if}
        </div>
        {/each}
        {/if}

        <h3>{activity.activityType ? activity.activityType : activity._type}</h3>
        {#if activity.carriedOutBy && activity.carriedOutBy.length > 0}
          <p>
          {#each activity.carriedOutBy as actor, i}
            <span style="display: block;"><a alt="{actor.actor.label}" href="id/{actor.actor._id}">{actor.actor.label}</a></span>
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
