<script>
	export let segment;
</script>

<style>
.title {
	font-weight: lighter;
	margin-top: 0.5em;
}
.level{
	margin-bottom: 0.3em;
}
.level-item {
	font-weight: lighter;
	margin-top: 0;
}
nav.level{
	margin-bottom: 4em;
}
</style>

<div class="fluid-container">
<div class="level">
	<div class="level-item has-text-centered">
		<h1 class="title">
			<a class="has-text-black" href=".">
				Sælen-samlingen
			</a>
		</h1>

		<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
	</div>
</div>
<nav class="container level">
		<!-- <a class='{segment === "about" ? "selected" : ""}' href='about'>om</a> -->
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
					the blog data when we hover over the link or tap it on a touchscreen -->
	<a rel=prefetch class='level-item has-text-black {segment === "articles" ? "selected" : ""}' href='articles'>Artikler</a>
	<a rel=prefetch class='level-item has-text-black {segment === "timelines" ? "selected" : ""}' href='timelines'>Tidslinjer</a>
	<a rel=prefetch class='level-item has-text-black {segment === "map" ? "selected" : ""}' href='map'>Kart</a>
	<a rel=prefetch class='level-item has-text-black {segment === "actors" ? "selected" : ""}' href='actors'>Aktører</a>
	<a rel=prefetch class='level-item has-text-black {segment === "items" ? "selected" : ""}' href='items'>Objekt</a>
</nav>
</div>