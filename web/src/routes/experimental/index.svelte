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
    <li><a href="/reports">Rapporter</a></li>
    <li><a href="/moves">Flytt av objekt</a></li>
    <li><a href="/acquisitions">Akkvisisjoner</a></li>
    <li><a href="/types">Typer</a></li>
    <li><a href="/exhibitions">Utstillinger</a></li>
  </ul>
</main>