<script>
  import client from '../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'
  import Mirador from './Mirador3'

  export let image
  export let manifest
  export let alt
  export let id
  export let rights

  // Get a pre-configured url-builder from your sanity client
  const builder = imageUrlBuilder(client)

  // Then we like to make a simple function like this that gives the
  // builder an image and returns the builder for you to specify additional
  // parameters:
  function urlFor(source) {
    return builder.image(source)
  }

  let ccIcon
  let rightsIcon

  switch (rights) {
    case 'https://creativecommons.org/publicdomain/mark/1.0/':
      ccIcon = '/cc-icons/cc.svg';
      rightsIcon = '/cc-icons/pd.svg';
      break;
    case 'https://creativecommons.org/licenses/by/4.0/':
      ccIcon = '/cc-icons/cc.svg';
      rightsIcon = '/cc-icons/by.svg';
      break;
    case 'https://creativecommons.org/publicdomain/zero/1.0/':
      ccIcon = '/cc-icons/cc.svg';
      rightsIcon = '/cc-icons/zero.svg';
      break;
    case 'https://rightsstatements.org/vocab/InC/1.0/':
      rightsIcon = '/rights-statements/buttons/InC.dark-white-interior.svg';
      break;
    case 'https://rightsstatements.org/vocab/InC-NC/1.0/':
      rightsIcon = '/rights-statements/buttons/NoC-NONCOMMERCIAL.dark-white-interior.svg';
      break;
    case 'https://rightsstatements.org/vocab/CNE/1.0/':
      rightsIcon = '/rights-statements/buttons/Other-NOTEVALUATED.dark-white-interior.svg';
      break;
    case 'https://rightsstatements.org/vocab/UND/1.0/':
      rightsIcon = '/rights-statements/buttons/Other-UNDETERMINED.dark-white-interior.svg';
      break;
  }
</script>

<style>
  figure {
    margin: 0;
    color: dimgrey;
    width: 100%;
    background-color: black;
    padding-bottom: 1em;
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  figure img {
    max-height: 60vh;
    max-width: 100%;
    margin: 0 auto;
  }

  figcaption {
    text-align: center;
  }

  img.cc-icon {
    height: 1.2em;
    padding-top: 0.2em;
    position: relative;
    top: 0.15em;
  }
</style>

{#if manifest}
  <div class='mirador'>
    <Mirador manifest='{manifest}'/>
  </div>
{:else}
  <figure>
    <img alt="{alt ? alt : ''}" src={urlFor(image).width(600).url()} />
    <figcaption><strong>{id}</strong>, <a href="{rights}">{#if ccIcon}<img class="cc-icon" alt="{rights}" src="{ccIcon}">{/if}<img class="cc-icon" alt="{rights}" src="{rightsIcon}"></a></figcaption>
  </figure>
{/if}

