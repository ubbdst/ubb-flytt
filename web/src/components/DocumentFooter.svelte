<script>
  import Highlight from 'svelte-highlight';
  import { json } from 'svelte-highlight/languages';
  import { atomOneDark } from 'svelte-highlight/styles';
  import Modal from './Modal.svelte';

  export let footerData
  
  let showData = false;
</script>

<style>
footer{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

<svelte:head>
  {@html atomOneDark}
</svelte:head>

<footer>
  <hr>
    <p class="has-text-centered">
      <button class="button is-white is-small" on:click="{() => showData = true}">
        <i class="fas fa-code"></i>
      </button>
    </p>

    {#if showData}
      <Modal on:close="{() => showData = false}">
        <span slot="header">
          Data
        </span>

        <Highlight language={json}>
        {JSON.stringify(footerData, null, 2)}
        </Highlight>
      </Modal>
    {/if}
</footer>
