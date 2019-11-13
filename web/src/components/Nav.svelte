<script>
	export let segment;
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
				<a class="has-text-black" href=".">
					Sælen<span class="is-hidden-mobile">-samlingen</span>
				</a>
				<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
		</div>
			<!-- <a class='{segment === "about" ? "selected" : ""}' href='about'>om</a> -->
			<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
						the blog data when we hover over the link or tap it on a touchscreen -->
		<div class="navbar-menu">
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
