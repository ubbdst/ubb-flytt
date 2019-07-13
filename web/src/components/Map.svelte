<script>
	import { onMount } from 'svelte';
	import { mapbox } from './mapbox.js';

	export let src;

	let container;
	let map;

	onMount(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css';
		link.onload = () => {
			map = new mapbox.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v9',
      });

      map.on('load', function () {
        map.addSource('features', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: src
            }
        })

        map.addLayer({
          "id": "points",
          "type": "circle",
          "source": "features",
          "paint": {
            "circle-radius": 6,
            "circle-color": "#B42222"
          },
          "filter": ["==", "$type", "Point"],
        });
      })
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

<div id="map"></div>