import L from 'leaflet'
import 'leaflet-editable-polyline'
import { findRealParent, propsBinder } from 'vue2-leaflet'

const props = {
  latLng: {
    type: [Object, Array]
  },
  options: {
    type: Object,
    default() { return {}; },
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};

export default {
  name: 'editablepolyline',
  props,
  data () {
    return {
      ready: false
    };
  },
  mounted: function () {
    this.parentContainer = findRealParent(this.$parent);
    this.mapObject = {pepe:1};
    this.childrenLayers = [];
    this.ready = true;
  },
  beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    addLayer(layer, alreadyAdded) {
      if (!alreadyAdded) {
        this.parentContainer.addLayer(layer);
        this.childrenLayers.push(layer.mapObject);
        if (this.$children.length == this.childrenLayers.length) {
          this.mapObject = L.Polyline.PolylineEditor(this.childrenLayers, this.options);
          L.DomEvent.on(this.mapObject, this.$listeners);
          propsBinder(this, this.mapObject, props);
          this.parentContainer.addLayer(this);
          this.childrenLayers = [];
        }
      }
    },
    removeLayer(layer, alreadyRemoved) {
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }
    }
  }
}
