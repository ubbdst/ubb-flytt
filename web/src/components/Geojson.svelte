<script>
  import { onMount } from "svelte";
  import { mapbox } from "./mapbox.js";
  import bbox from '@turf/bbox';

  export let src;
  export let label = "";
  export let height = "300px";

  let container;
  let map;

  let ID = function() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (
      "map_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

  let id = ID();

  onMount(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";
    link.onload = () => {
      map = new mapbox.Map({
        container: id,
        style: "mapbox://styles/mapbox/streets-v9",
        center: [7.6, 60],
        zoom: 6,
        pitch: 40
      });

      let geojson = JSON.parse(src.data.code);

      map.on("load", function() {
        // var coordinates = geojson.geometry.coordinates;

        // Pass the first coordinates in the LineString to `lngLatBounds` &
        // wrap each coordinate pair in `extend` to include them in the bounds
        // result. A variation of this technique could be applied to zooming
        // to the bounds of multiple Points or Polygon geomteries - it just
        // requires wrapping all the coordinates with the extend method.
        /* var bounds = coordinates.reduce(function(bounds, coord) {
          return bounds.extend(coord);
        }, new mapbox.LngLatBounds(coordinates[0], coordinates[0])); */

        var bounds = bbox(geojson);

        map.fitBounds(bounds, {
          padding: 20
        });

        map.addSource("features", {
          type: "geojson",
          data: geojson
        });

        map.addControl(new mapbox.FullscreenControl());

        map.addLayer({
          id: "circle",
          type: "circle",
          source: "features",
          paint: {
            "circle-color": "#888",
            "circle-radius": 6
          },
          filter: ["==", "$type", "Point"]
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "features",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#888",
            "line-width": 8
          },
          filter: ["==", "$type", "LineString"]
        });

        map.addLayer({
          id: "multiPolygon",
          type: "fill",
          source: "features",
          paint: {
            "fill-color": "#888",
            'fill-opacity': 0.8
          },
          filter: ["==", "$type", "Polygon"]
        });

        map.loadImage("/240px-Camera_Flat_Icon_Vector.svg.png", function(
          error,
          image
        ) {
          if (error) throw error;
          map.addImage("camera", image);
          map.addLayer({
            id: "camera",
            type: "symbol",
            source: "features",
            layout: {
              "text-field": "Kamera",
              "icon-image": "camera",
              "icon-size": 0.2,
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 0.6],
              "text-anchor": "top"
            },
            filter: ["==", "type", "Point of camera"]
          });
        });

        map.loadImage("/Picture_icon-72a7cf.svg.png", function(error, image) {
          if (error) throw error;
          map.addImage("motif", image);
          map.addLayer({
            id: "motif",
            type: "symbol",
            source: "features",
            layout: {
              "text-field": "Motiv",
              "icon-image": "motif",
              "icon-size": 0.1,
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 0.6],
              "text-anchor": "top"
            },
            filter: ["==", "type", "Center of motif"]
          });
        });
      });
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });
</script>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<div {id} style="height: {height};" />

{#if src.label && src.label.nor}
  <h3 class="title has-text-centered">{src.label.nor}</h3>
{/if}
