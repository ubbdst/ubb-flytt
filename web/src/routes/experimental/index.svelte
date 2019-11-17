<script context="module">
/* 	import client from '../../sanityClient'
  import imageUrlBuilder from '@sanity/image-url' */

/* 	export function preload({ params, query }) {
    return client.fetch('*[_type == "madeObject" && accessState == "open"]|order(preferredIdentifier desc)').then(items => {
			return { items };
		}).catch(err => this.error(500, err));
	} */
</script>

<style>

</style>

<svelte:head>
	<title>Eksperiment</title>
</svelte:head>

<main class="section">
	<h1 class="title has-text-centered">Eksperimentelle sider</h1>
  <ul>
    <li><a href="experimental/reports">Rapporter</a></li>
    <li><a href="experimental/move">Flytt av objekt</a></li>
  </ul>
</main>