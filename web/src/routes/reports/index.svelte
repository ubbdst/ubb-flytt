<script context="module">
  import Cards from "../../components/Cards";

  import client from "../../sanityClient";

  export function preload() {
    return client
      .fetch(
        '*[_type == "report" && accessState == "open"]|order(preferredIdentifier desc){..., hasType[]->{ _id, label }}'
      )
      .then(items => {
        return { items };
      })
      .catch(err => this.error(500, err));
  }
</script>

<script>
  export let items;
</script>

<style>

</style>

<svelte:head>
  <title>Objekt</title>
</svelte:head>

<main class="section">
  <Cards cards={items} title="Rapporter" />
</main>
