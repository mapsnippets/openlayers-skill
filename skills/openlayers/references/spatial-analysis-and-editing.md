# Spatial Analysis, Snapping & Topology Editing in OpenLayers

OpenLayers provides advanced vector drawing, magnetic vertex snapping, live polygon tracing, and integration with Turf.js / JSTS for spatial analysis.

---

## 1. Advanced Topology Tracing & Magnetic Snapping

Trace new polygons perfectly along the boundaries of existing polygons without overlapping or leaving gaps:

```javascript
import Draw from "ol/interaction/Draw.js";
import Snap from "ol/interaction/Snap.js";
import Modify from "ol/interaction/Modify.js";

const vectorSource = new VectorSource({ features: existingParcels });

// 1. Draw with trace capability
const draw = new Draw({
  source: vectorSource,
  type: "Polygon",
  trace: true, // Enables tracing along existing boundaries
  traceSource: vectorSource
});
map.addInteraction(draw);

// 2. Modify existing vertices
const modify = new Modify({ source: vectorSource });
map.addInteraction(modify);

// 3. Magnetic Snap (always added after Draw/Modify)
const snap = new Snap({ source: vectorSource, pixelTolerance: 12 });
map.addInteraction(snap);
```

---

## 2. Geodesic Measurement (`ol/sphere`)

Calculate exact geodesic lengths (taking Earth's ellipsoid into account):

```javascript
import { getLength, getArea } from "ol/sphere.js";

// Measure LineString
function formatLength(lineGeometry) {
  const length = getLength(lineGeometry, { projection: "EPSG:3857" });
  if (length > 1000) {
    return (Math.round((length / 1000) * 100) / 100) + " km";
  }
  return (Math.round(length * 100) / 100) + " m";
}

// Measure Polygon Area
function formatArea(polygonGeometry) {
  const area = getArea(polygonGeometry, { projection: "EPSG:3857" });
  if (area > 1000000) {
    return (Math.round((area / 1000000) * 100) / 100) + " km²";
  }
  return (Math.round(area * 100) / 100) + " m²";
}
```

---

## 3. Turf.js Geospatial Analysis Integration

```bash
npm install @turf/turf
```
```javascript
import * as turf from "@turf/turf";
import GeoJSON from "ol/format/GeoJSON.js";

const format = new GeoJSON();

// Buffer a feature by 500 meters
function bufferFeature(olFeature, distanceInMeters) {
  const turfFeature = format.writeFeatureObject(olFeature, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857"
  });

  const buffered = turf.buffer(turfFeature, distanceInMeters / 1000, { units: "kilometers" });

  const bufferedOlFeature = format.readFeature(buffered, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857"
  });

  vectorSource.addFeature(bufferedOlFeature);
}
```
