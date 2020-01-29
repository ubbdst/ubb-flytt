<script>
  import { getContext } from "svelte";
  import { mapbox, key } from "./mapbox.js";

  const { getMap } = getContext(key);
  const map = getMap();

  export let src;

  map.on("load", function() {
    map.addSource("features", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: src
      }
    });

    map.addLayer({
      id: "points",
      type: "circle",
      source: "features",
      paint: {
        "circle-radius": 6,
        "circle-color": "#B42222"
      },
      filter: ["==", "$type", "Point"]
    });
  });
</script>
