import L from 'leaflet'
import * as Vue2Leaflet from 'vue2-leaflet'
import Vue2LeafletEditablePolyline from '../vue2-editable-polyline/vue2-editable-polyline.vue'

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