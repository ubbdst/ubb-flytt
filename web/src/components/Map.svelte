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
        center: [7.6, 60],
        zoom: 3,
        pitch: 40
      });

      let geojson = {
            type: 'FeatureCollection',
            features: src };
      
      var bounds = new mapbox.LngLatBounds();



      map.on('load', function () {
        geojson.features.forEach(function(feature) {
          bounds.extend(feature.geometry.coordinates);
        });

        map.fitBounds(bounds, {
          padding: 50,
          maxZoom: 17
        });

        map.addSource('features', {
          type: 'geojson',
          data: geojson
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