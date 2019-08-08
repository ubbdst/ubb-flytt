<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		color: white;
		background-color: black;
		border-bottom: 1px solid #333;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a class='{segment === undefined ? "selected" : ""}' href='.'>hjem</a></li>
<!-- 		<li><a class='{segment === "about" ? "selected" : ""}' href='about'>om</a></li>
 -->
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a rel=prefetch class='{segment === "articles" ? "selected" : ""}' href='articles'>artikler</a></li>
		<li><a rel=prefetch class='{segment === "actors" ? "selected" : ""}' href='actors'>aktører</a></li>
		<li><a rel=prefetch class='{segment === "items" ? "selected" : ""}' href='items'>objekt</a></li>
		<li><a rel=prefetch class='{segment === "timelines" ? "selected" : ""}' href='timelines'>tidslinjer</a></li>
	</ul>
</nav>