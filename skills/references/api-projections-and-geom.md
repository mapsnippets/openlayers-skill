# OpenLayers API Reference — Projections & Geometries

Source: https://openlayers.org/en/latest/apidoc/module-ol_proj.html

---

## 1. Projections (`ol/proj`)

OpenLayers natively supports `EPSG:3857` (Spherical Mercator) and `EPSG:4326` (WGS84 GPS). For national grid coordinate systems (e.g. Swiss LV95, British National Grid, Lambert), integrate `proj4`.

### Core Transformation Functions:
* `fromLonLat([lng, lat], opt_projection)` — Converts WGS84 coordinates to target projection (defaults to `EPSG:3857`).
* `toLonLat([x, y], opt_projection)` — Converts projected coordinates back to WGS84 `[lng, lat]`.
* `transform(coordinate, sourceProj, destProj)` — Transforms any coordinate between two projections.
* `transformExtent(extent, sourceProj, destProj)` — Transforms a bounding box.

### Custom CRS Integration with `proj4`:
```bash
npm install proj4
```
```javascript
import proj4 from "proj4";
import { register } from "ol/proj/proj4.js";
import { get as getProjection } from "ol/proj.js";

// Example: Swiss LV95 (EPSG:2056)
proj4.defs(
  "EPSG:2056",
  "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
);
register(proj4);

const swissProjection = getProjection("EPSG:2056");
```

---

## 2. Geometries & Formats

### Geometry Classes (`ol/geom/*`):
* `Point`: `new Point(fromLonLat([lng, lat]))`
* `LineString`: `new LineString([coord1, coord2, ...])`
* `Polygon`: `new Polygon([[ringCoord1, ringCoord2, ringCoord3, ringCoord1]])`
* `MultiPolygon`: `new MultiPolygon([poly1, poly2])`
* `Circle`: `new Circle(centerCoord, radiusInMeters)`

### `ol/format/GeoJSON` Ingestion & Export:
```javascript
import GeoJSON from "ol/format/GeoJSON.js";

const format = new GeoJSON();

// Read GeoJSON into OpenLayers features with automatic reprojection
const features = format.readFeatures(geoJsonObject, {
  dataProjection: "EPSG:4326",    // Input format (standard GPS)
  featureProjection: "EPSG:3857"  // View format (Map projection)
});

// Write OpenLayers features back to standard GeoJSON
const exportedGeoJSON = format.writeFeaturesObject(vectorSource.getFeatures(), {
  dataProjection: "EPSG:4326",
  featureProjection: "EPSG:3857"
});
```
