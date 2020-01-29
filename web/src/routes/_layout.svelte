<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";

  export let segment;
</script>

<style>

</style>

<Nav {segment} />

<div class="wrapper">
  <slot />
</div>

<Footer />
