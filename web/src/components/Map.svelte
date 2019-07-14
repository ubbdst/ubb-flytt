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
        zoom: 6,
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
          "id": "circle",
          "type": "circle",
          "source": "features",
          "paint": {
            "circle-color": "#888",
            "circle-radius": 6
          },
          "filter": ["==", "$type", "Point"],
        });

        map.loadImage('/240px-Camera_Flat_Icon_Vector.svg.png', function(error, image) {
          if (error) throw error;
          map.addImage('camera', image);
          map.addLayer({
            "id": "camera",
            "type": "symbol",
            "source": "features",
            "layout": {
              "text-field": "Kamera",
              "icon-image": "camera",
              "icon-size": 0.2,
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 0.6],
              "text-anchor": "top"
            },
            "filter": ["==", "type", "Point of camera"],
          });
        });

        map.loadImage('/Picture_icon-72a7cf.svg.png', function(error, image) {
          if (error) throw error;
          map.addImage('motif', image);
          map.addLayer({
            "id": "motif",
            "type": "symbol",
            "source": "features",
            "layout": {
              "text-field": "Motiv",
              "icon-image": "motif",
              "icon-size": 0.1,
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 0.6],
              "text-anchor": "top"
            },
            "filter": ["==", "type", "Center of motif"],
          });
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