<template>
	<div class="welcome-container">
		welcome to vue map...
    	<v-map :zoom=10 :center="initialLocation">
			<v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
			<!-- <v-editable-polyline :latLngs="latlngs" :options="options">
			</v-editable-polyline> -->
		</v-map>
    </div>
</template>
<style >
@import 'https://unpkg.com/leaflet@1.2.0/dist/leaflet.css';
</style>
<script >
// import L from 'leaflet'
import * as Vue2Leaflet from 'vue2-leaflet'
import Vue2LeafletEditablePolyline from '../vue2editablepolyline/vue2editablepolyline.vue'
var L = require('leaflet');
export default {
  name: 'example',
  components: {
    'v-map': Vue2Leaflet.LMap,
    'v-tilelayer': Vue2Leaflet.LTileLayer,
    'v-polyline': Vue2Leaflet.LPolyline,
    'v-editable-polyline': Vue2LeafletEditablePolyline
  },
  data: function(){
    let x = -35.15;
    let y = -58.2;
    let latlngs = []
    for (let i = 0; i < 10; i++) {
      latlngs.push(L.latLng(x, y))
      x += rand();
      y += rand();
    }
    let options = {maxMarkers: 100};
    return {
      options,
      latlngs,
      initialLocation: L.latLng(x-0.3, y-0.3)
    }
  },
  mounted: function(){
    
  },
  methods: {

  }
}
</script>