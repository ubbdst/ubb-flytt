let mapbox = {}

if (process.browser) {
  mapbox = require('mapbox-gl');
 }
// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = 'pk.eyJ1IjoidGFyamVsYXZpayIsImEiOiJjanh2eGkxdXAwOXRlM2hvOHFwOWQ4Y3V4In0.BE92pIYXT8ngDbprrzN6Kg';

export { mapbox };