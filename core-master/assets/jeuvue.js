Vue.component('map-component', {
  template: '<div id="map"></div>',     //le div où la carte est contenue

  mounted() {
    this.initMap();
  },

  methods: {
    initMap() {
      const map = L.map('map', {
          center: [48.85, 2.35],
          zoom: 13,
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      var popup = L.popup();

      function onMapClick(e) {
          popup
          .setLatLng(e.latlng)
          .setContent("Tu as cliqué aux coordonnées " + e.latlng.toString().replace('LatLng', '(Lat,Long) = '))
          .openOn(map);
      }

map.on('click', onMapClick);
    }
  }
});

new Vue({
  el: '#appmap',
});