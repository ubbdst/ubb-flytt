<script>
  export let item;
</script>

<style>
  img.cc-icon {
    height: 1em;
    top: 0.1em;
    position: relative;
  }

  img.rights-icon {
    height: 1em;
    padding-top: 0.1em;
    position: relative;
  }

  a.rights {
    display: inline-flex;
    padding-right: 0.75em;
  }
</style>

<a class="rights" href={item}>
  {#if item == 'https://creativecommons.org/publicdomain/mark/1.0/'}
    <img class="image is-16x16 cc-icon" alt={item} src="/cc-icons/cc.svg" />
    <img class="image is-16x16 cc-icon" alt={item} src="/cc-icons/pd.svg" />
  {/if}
  {#if item == 'https://creativecommons.org/licenses/by/4.0/'}
    <img class="image is-16x16 cc-icon" alt={item} src="/cc-icons/cc.svg" />
    <img class="image is-16x16 cc-icon" alt={item} src="/cc-icons/by.svg" />
  {/if}
  {#if item == 'https://creativecommons.org/publicdomain/zero/1.0/'}
    <img class="image is-16x16 cc-icon" alt={item} src="/cc-icons/cc.svg" />
    <img class="image is-16x16 cc-icon" alt={item} src="/cc-icons/zero.svg" />
  {/if}
  {#if item == 'https://rightsstatements.org/vocab/InC/1.0/'}
    <img
      class="image rights-icon"
      alt={item}
      src="/rights-statements/buttons/InC.dark-white-interior.svg" />
  {/if}
  {#if item == 'https://rightsstatements.org/vocab/InC-NC/1.0/'}
    <img
      class="image rights-icon"
      alt={item}
      src="/rights-statements/buttons/NoC-NONCOMMERCIAL.dark-white-interior.svg" />
  {/if}
  {#if item == 'https://rightsstatements.org/vocab/CNE/1.0/'}
    <img
      class="image rights-icon"
      alt={item}
      src="/rights-statements/buttons/Other-NOTEVALUATED.dark-white-interior.svg" />
  {/if}
  {#if item == 'https://rightsstatements.org/vocab/UND/1.0/'}
    <img
      class="image rights-icon"
      alt={item}
      src="/rights-statements/buttons/Other-UNDETERMINED.dark-white-interior.svg" />
  {/if}
</a>
