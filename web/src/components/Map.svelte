<script>
  import { onMount } from 'svelte';
  import jsonata from 'jsonata'

  import { mapbox } from './mapbox.js';
  
  export let src;
  export let label = '';
  export let height = '300px';

	let container;
	let map;

  let ID = function() {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return 'map_' + Math.random().toString(36).substr(2, 9);
    };

  let id = ID();

	onMount(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css';
		link.onload = () => {
			map = new mapbox.Map({
				container: id,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [7.6, 60],
        zoom: 6,
        pitch: 40
      });

// console.log('1:' + JSON.stringify(src));

      const expression = jsonata("**.geoJSON[]");
// console.log('2:' + JSON.stringify(src))
      if (src.all) {
        src = src.all;
      }
      else {
        src = expression.evaluate(src);
      };
// console.log('3:' + JSON.stringify(src))
      if(src) {
        src = src.map(item => {
          let container = {}
          container.type = 'Feature';
          container.properties = {};
          container.properties.type = item.type;
          container.geometry = {};
          container.geometry.type = 'Point';
          container.geometry.coordinates = [item.geometry.lng, item.geometry.lat];

          return container
        })
      };
// console.log('4: ' + JSON.stringify(src))
      if (!Array.isArray(src)) {
        src = [src]
      }

      let geojson = {
        type: 'FeatureCollection',
        features: src 
      };
// console.log('5:' + JSON.stringify(geojson))
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

        map.addControl(new mapbox.FullscreenControl());

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

<div id="{id}" style="height: {height};"></div>
{#if label}
<p>{label}</p>
{/if}
