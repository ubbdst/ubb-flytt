<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	.wrapper {
		position: relative;
		background-color: white;
		margin: 0;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<div class="wrapper">
	<slot></slot>
</div>