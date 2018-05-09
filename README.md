
# "Vue2-leaflet-editablepolyline"
This is a [leaflet-editablepolyline plugin](https://github.com/tkrajina/leaflet-editable-polyline) extension for [vue2-leaflet package](https://github.com/KoRiGaN/Vue2Leaflet)

### Documentation

## Why another editable polyline plugin?

Most editable polylines have performance problems on bigger polylines because of too many markers shown on the map.

## Features

 * Show editable markers only for a selected part of the map and only if no more than specified number of points are shown.
 * Add points between two points, before the first point or after the last
 * Split polylines
 * Keep context data with every point (even if new points are added before this one or the current polyline is splitted from the original one).

BTW, Leaflet.Editable.Polyline is still a work in progress and some APIs may change.

**TODO:**

 * Join polylines

## Examples

 * [Simple example](http://tkrajina.github.io/leaflet-editable-polyline/example1.html)
 * [Example with 20,000 points](http://tkrajina.github.io/leaflet-editable-polyline/example2.html) (you need to zoom close enough to be able to edit it).


## How to install
``` bash
$ npm install vue2-leaflet-editablepolyline --save
```
In the script tag include 
``` bash
import L from 'leaflet'
import * as Vue2Leaflet from 'vue2-leaflet'
import Vue2LeafletEditablePolyline from 'vue2editablepolyline'

and define in components as
components : {
'v-map': Vue2Leaflet.LMap,
    'v-tilelayer': Vue2Leaflet.LTileLayer,
    'v-polyline': Vue2Leaflet.LPolyline,
    'v-editable-polyline': Vue2LeafletEditablePolyline
  }
```

In html/template,
``` bash
<v-map :zoom="zoom" :center="initialLocation" style="position:absolute;width: 700px; height: 500px;">
  <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
  <v-editable-polyline ref="poly" :latLng="latlngs" :options="options">
  </v-editable-polyline>
</v-map>
```

Options is a normal Leaflet polyline options object with some additions:

 * **maxMarkers** is a max number of editable markers to be shown. That means that if the current map bounds are such that more than maxMarkers points of the polyline are in map bounds -- the polyline **will not be editable**. This can be used for very large polylines where too many editable markers would make editing too CPU-intennsive.
 * **pointIcon** icon to be shown for point markers.
 * **newPointIcon** icon to be shown for middle point markers (markers used when creating new points).
 * **newPolylines** if true then double-click on map will create a new polyline (with only one point).

The editing can be done with:

 * **drag the point marker** to move it around
 * **right-click on point marker** to __remove__ the point
 * **drag the middle point marker** to create new points between two existing
 * **right-click on middle point marker** to __split__ the point
 * **click on the first or last point** to add a new first/last point

When the editing is done, you can retrieve all points with:
``` bash
var points = this.$refs.poly.mapObject.getPoints();
      for(var i = 0; i < points.length; i++) {
        var point = points[i];
        if(point.context) {
          // The original position of this point (new point may be added or 
          // removed before this one when editing):
          this.points += 'latLng=' + point.getLatLng() + 'originalPointNo=' + point.context.originalPointNo + 'originalPolylineNo=' + point.context.originalPolylineNo;
        }
      }
```

The **contexts** can be *null* or an array of objects.
Values from the contexts will be stored with every point and can be retrieved later with point.context.

## License

Leaflet.Editable.Polyline is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
