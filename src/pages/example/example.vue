<template>
<div>
	<div class="welcome-container" >
		welcome to vue leaflet map...
    <l-map ref="map" :padding="[200, 200]" :zoom="zoom" :center="initialLocation" style="position:absolute;width: 700px; height: 500px;">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-layer-group >
        <v-editable-polyline ref="poly" :latLng="latlngs" :options="options" >
          <l-popup >
            <strong>Location Name: </strong>{{latlngs}}
            <br><strong>Date: </strong>
            <br><button class="btn btn-warning btn-sm" style="color: white;margin:5% 0% 0% 35%;" >Add</button>
          </l-popup>
        </v-editable-polyline>
      </l-layer-group>
    </l-map>
    	<!-- <v-map :zoom="zoom" :center="initialLocation" style="position:absolute;width: 700px; height: 500px;">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <v-editable-polyline ref="poly" :latLng="latlngs" :options="options" >
          <v-popup >
            
          </v-popup>
        </v-editable-polyline>
      </v-map> -->
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
import { LMap, LTileLayer, LMarker, LPolyline, LLayerGroup, LTooltip, LPopup, LControlZoom, LControlAttribution, LControlScale, LControlLayers } from 'vue2-leaflet'
import Vue2LeafletEditablePolyline from '../vue2editablepolyline/vue2editablepolyline.vue'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LLayerGroup,
    LTooltip,
    LPopup,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers,
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
    let options = {
      maxMarkers: 100,
      customPointListeners: {
        'click': function (e) {
          // me.addMarker()
          console.log(e.target.getPopup());
        }
      }};
    return {
      options,
      latlngs,
      initialLocation: L.latLng(x-0.3, y-0.3),
      zoom: 10,
      points: '',
      content: 'hi'
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