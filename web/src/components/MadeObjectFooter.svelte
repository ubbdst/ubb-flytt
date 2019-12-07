<script>
  import Modal from './Modal.svelte';

  export let footerData
  
  let showData = false;
</script>

<style>

</style>

<footer>
  <hr>
    <p class="has-text-centered">
      <button class="button is-white is-small" on:click="{() => showData = true}">
        <i class="fas fa-code"></i>
      </button>
    </p>

    {#if showData}
      <Modal on:close="{() => showData = false}">
        <h2 slot="header">
          Data
        </h2>

        <pre>
          <code>
          {JSON.stringify(footerData, null, 2)}
          </code>
        </pre>
      </Modal>
    {/if}
</footer>