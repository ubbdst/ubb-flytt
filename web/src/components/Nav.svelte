<script>
	export let segment;
</script>

<style>
	nav {
		position: fixed;
		box-sizing: border-box;
		padding: 0 1em;
		width: 100%;
		min-height: 3.6em;
		z-index: 1;
		font-weight: 300;
		color: white;
		display: flex;
		align-items: center;
  	justify-content: space-between;
	}

	nav.opaque {
		background-color: black;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		margin-left: 0.5em;
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	nav h1 {
		text-align: center;
		width: 30%;
		margin-top: 0.3em;
		font-family: 'Vampiro One', sans-serif;
		color: white;
	}
	.nav-left, .nav-right {
		width: 35%;
	}
	.nav-right {
		text-align: right;
	}
	
	nav a, nav h1 a {
		text-decoration: none;
	}
</style>

<nav class='{segment === undefined ? "" : "opaque"}'>
	<div class="nav-left">
		<!-- <a class='{segment === "about" ? "selected" : ""}' href='about'>om</a> -->
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
					the blog data when we hover over the link or tap it on a touchscreen -->
		<a rel=prefetch class='{segment === "articles" ? "selected" : ""}' href='articles'>artikler</a>
		<a rel=prefetch class='{segment === "timelines" ? "selected" : ""}' href='timelines'>tidslinjer</a>
	</div>
	<h1 class><a href='.'>Sælen</a></h1>
	<div class="nav-right">
		<a rel=prefetch class='{segment === "actors" ? "selected" : ""}' href='actors'>aktører</a>
		<a rel=prefetch class='{segment === "items" ? "selected" : ""}' href='items'>objekt</a>
	</div>
</nav>
