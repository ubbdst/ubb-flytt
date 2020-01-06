<script>
	import { onMount } from 'svelte';
	export let segment;

	onMount(() => {
		(function() {
			var burger = document.querySelector('.burger');
			var nav = document.querySelector('#'+burger.dataset.target);
		
			burger.addEventListener('click', function(){
				burger.classList.toggle('is-active');
				nav.classList.toggle('is-active');
			});

			nav.addEventListener('click', function(){
				burger.classList.remove('is-active');
				nav.classList.remove('is-active');
			});
		})();
	})
</script>

<style>
.navbar{
	z-index: 1200;
}
.navbar-brand{
	font-family: 'Big Shoulders Text', cursive;
	font-size: 1.4em;
}
.brand{
	font-family: 'Big Shoulders Text', cursive;
	font-size: 3em;
}
</style>

<div class="level is-marginless">
	<p class="level-item has-text-centered">
    <a href="/" class="link brand">S<span class="is-hidden-mobile">ælen</span></a>
  </p>
</div>

<nav class="navbar has-shadow is-white is-fixed-bottom">
	<div class="navbar-brand">
		<a class="navbar-item has-text-black" href=".">
			Sælen
		</a>
		<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
	</div>
		<!-- <a class='{segment === "about" ? "selected" : ""}' href='about'>om</a> -->
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
					the blog data when we hover over the link or tap it on a touchscreen -->
	<div id="navMenu" class="navbar-menu">
		<div class="navbar-start">
			<a rel=prefetch class='navbar-item has-text-black {segment === "items" ? "selected" : ""}' href='items'>Objekt</a>
			<a rel=prefetch class='navbar-item has-text-black {segment === "actors" ? "selected" : ""}' href='actors'>Aktører</a>
			<a rel=prefetch class='navbar-item has-text-black {segment === "events" ? "selected" : ""}' href='events'>Hendelser</a>
			<a rel=prefetch class='navbar-item has-text-black {segment === "places" ? "selected" : ""}' href='places'>Steder</a>
			<a rel=prefetch class='navbar-item has-text-black {segment === "articles" ? "selected" : ""}' href='articles'>Artikler</a>
			<a rel=prefetch class='navbar-item has-text-black {segment === "exhibitions" ? "selected" : ""}' href="/exhibitions">Utstillinger</a>
			<div class="navbar-item has-dropdown-up is-hoverable">
        <a class="navbar-link">
          Mer
        </a>

        <div class="navbar-dropdown">
					<a rel=prefetch class='navbar-item has-text-black {segment === "reports" ? "selected" : ""}' href="/reports">Rapporter</a>
					<a rel=prefetch class='navbar-item has-text-black {segment === "moves" ? "selected" : ""}' href="/moves">Flytt av objekt</a>
					<a rel=prefetch class='navbar-item has-text-black {segment === "acquisitions" ? "selected" : ""}' href="/acquisitions">Akkvisisjoner</a>
					<a rel=prefetch class='navbar-item has-text-black {segment === "types" ? "selected" : ""}' href="/types">Typer</a>
					<a rel=prefetch class='navbar-item has-text-black {segment === "timelines" ? "selected" : ""}' href='timelines'>Tidslinjer</a>
					<a rel=prefetch class='navbar-item has-text-black {segment === "map" ? "selected" : ""}' href='map'>Kart</a>
        </div>
      </div>
		</div>
	</div>
</nav>
