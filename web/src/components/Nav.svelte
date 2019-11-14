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
	})();
		})
</script>

<style>
.navbar-brand{
	font-weight: bolder;
}
</style>

<nav class="navbar has-shadow">
	<div class="container">
		<div class="navbar-brand">
			<div class="navbar-item">
				<a role="button" class="navbar-burger burger right" aria-label="menu" aria-expanded="false" data-target="navMenu">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
				<a class="has-text-black" href=".">
					Sælen<span class="is-hidden-mobile">-samlingen</span>
				</a>
				
			</div>
		</div>
			<!-- <a class='{segment === "about" ? "selected" : ""}' href='about'>om</a> -->
			<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
						the blog data when we hover over the link or tap it on a touchscreen -->
		<div id="navMenu" class="navbar-menu">
			<div class="navbar-start">
				<a rel=prefetch class='navbar-item has-text-black {segment === "articles" ? "selected" : ""}' href='articles'>Artikler</a>
				<a rel=prefetch class='navbar-item has-text-black {segment === "timelines" ? "selected" : ""}' href='timelines'>Tidslinjer</a>
				<a rel=prefetch class='navbar-item has-text-black {segment === "map" ? "selected" : ""}' href='map'>Kart</a>
				<a rel=prefetch class='navbar-item has-text-black {segment === "actors" ? "selected" : ""}' href='actors'>Aktører</a>
				<a rel=prefetch class='navbar-item has-text-black {segment === "items" ? "selected" : ""}' href='items'>Objekt</a>
			</div>
		</div>
	</div>
</nav>
