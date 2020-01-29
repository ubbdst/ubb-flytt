<script>
  import { onMount, onDestroy } from "svelte";

  export let manifest;

  let Mirador;

  onMount(async () => {
    const module = await import("mirador");
    Mirador = module.default;

    let config = {
      id: "mirador",
      manifests: {
        test: {
          provider: "Tarje Lavik"
        }
      },
      windows: [
        {
          loadedManifest: "id"
        }
      ]
    };
    config.windows[0].loadedManifest = manifest;

    var mirador = Mirador.viewer(config);

    /* return () => {
            config = null
            manifest = null
        }; */
  });
</script>

<div id="mirador" />
