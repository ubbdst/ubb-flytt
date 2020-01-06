<script>
  import ReactComponent from 'svelte-react';
  import InstagramEmbed from 'react-instagram-embed';
  
  export let url
  
  let props = {}
  props.url = url
</script>

<style>

</style>

<p>
  {url}
</p>
 
<!-- <ReactComponent this={InstagramEmbed} {...props} /> -->