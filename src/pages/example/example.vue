<template>
<div>
	<div class="welcome-container" >
		welcome to vue leaflet map...
    	<v-map :zoom="zoom" :center="initialLocation" style="position:absolute;width: 700px; height: 500px;">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <v-editable-polyline ref="poly" :latLng="latlngs" :options="options">
        </v-editable-polyline>
      </v-map>
  </div>
  <br>
  <div style="position:absolute;margin-top:35%;">
    <button @click="getPoints">Get points</button>
  <textarea cols="100" rows="10" v-model="points"></textarea>
  </div>
</div>   
</template>
<style >
@import 'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css';
</style>
<script >
import L from 'leaflet'
import * as Vue2Leaflet from 'vue2-leaflet'
import Vue2LeafletEditablePolyline from '../vue2editablepolyline/vue2editablepolyline.vue'
export default {
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
      x += Math.random();
      y += Math.random();
    }
    let options = {maxMarkers: 100};
    return {
      options,
      latlngs,
      initialLocation: L.latLng(x-0.3, y-0.3),
      zoom: 10,
      points: ''
    }
  },
  mounted: function(){
  },
  methods: {
    getPoints: function () {
      var points = this.$refs.poly.mapObject.getPoints();
      console.log(points);
      for(var i = 0; i < points.length; i++) {
        var point = points[i];
        if(point.context) {
          // The original position of this point (new point may be added or 
          // removed before this one when editing):
          this.points += 'latLng=' + point.getLatLng() + 'originalPointNo=' + point.context.originalPointNo + 'originalPolylineNo=' + point.context.originalPolylineNo;
        }
      }
    }
  }
}
</script>