# OpenLayers Projections — Reference

Projections are OpenLayers' defining feature. Understanding them is essential.

> [OpenLayers Projection Docs](https://openlayers.org/en/latest/apidoc/module-ol_proj.html) · [EPSG.io](https://epsg.io/)

---

## The Two Projections You Always Need

| CRS | Name | Used By | Coordinate Order |
|-----|------|---------|-----------------|
| **EPSG:4326** | WGS 84 (Geographic) | GeoJSON, GPS, MapTiler APIs | `[lng, lat]` (degrees) |
| **EPSG:3857** | Web Mercator | OpenLayers map view, all web maps | `[x, y]` (meters) |

OpenLayers uses **EPSG:3857** internally. All coordinates passed to the map, features, overlays, and view must be in EPSG:3857.

---

## Core Transform Functions

### fromLonLat / toLonLat

```js
// Geographic [lng, lat] → Web Mercator [x, y]
const mercator = ol.proj.fromLonLat([14.4178, 50.1167]);
// Returns [1604878.35, 6464836.42]

// Web Mercator [x, y] → Geographic [lng, lat]
const lonlat = ol.proj.toLonLat([1604878.35, 6464836.42]);
// Returns [14.4178, 50.1167]
```

### transform

```js
// Between any two CRS
const coords = ol.proj.transform([14.4178, 50.1167], 'EPSG:4326', 'EPSG:3857');
const back = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326');
```

### transformExtent

```js
// Transform a bounding box [west, south, east, north]
const extent3857 = ol.proj.transformExtent(
  [12.0, 48.5, 18.9, 51.1],  // Czech Republic in EPSG:4326
  'EPSG:4326',
  'EPSG:3857'
);

// Use for view.fit()
map.getView().fit(extent3857, { padding: [50, 50, 50, 50] });
```

---

## Where to Use Which Projection

### Map View — EPSG:3857

```js
new ol.View({
  center: ol.proj.fromLonLat([14.4178, 50.1167]),  // MUST transform
  zoom: 12
})
```

### Feature Geometry — EPSG:3857

```js
new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([14.4178, 50.1167]))  // MUST transform
})
```

### Overlay Position — EPSG:3857

```js
overlay.setPosition(ol.proj.fromLonLat([14.4178, 50.1167]));  // MUST transform
```

### GeoJSON Loading — Auto-Transform

```js
// GeoJSON is always EPSG:4326. Use featureProjection to auto-transform:
const format = new ol.format.GeoJSON({
  featureProjection: 'EPSG:3857'  // auto-transforms from 4326 to 3857
});

const features = format.readFeatures(geojsonData);

// Or in ol.source.Vector:
new ol.source.Vector({
  url: 'data.geojson',
  format: new ol.format.GeoJSON({
    featureProjection: 'EPSG:3857'
  })
})
```

### GeoJSON Export — Transform Back

```js
const format = new ol.format.GeoJSON({
  featureProjection: 'EPSG:3857'  // converts back from 3857 to 4326
});
const geojson = format.writeFeatures(vectorSource.getFeatures());
// Output is standard GeoJSON in EPSG:4326
```

### MapTiler APIs — EPSG:4326

```js
// Geocoding: always [lng, lat] in EPSG:4326
const url = `https://api.maptiler.com/geocoding/${query}.json?key=YOUR_MAPTILER_KEY`;
// Response: data.features[0].geometry.coordinates = [lng, lat]
// Convert for OpenLayers: ol.proj.fromLonLat(coords)

// From map click to API:
map.on('click', (e) => {
  const [lng, lat] = ol.proj.toLonLat(e.coordinate);
  // Use [lng, lat] in API call
});
```

---

## Custom Projections with proj4

For CRS beyond EPSG:4326 and EPSG:3857, use proj4js:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.9.2/proj4.js"></script>
```

```js
// Register a custom projection (e.g., Czech S-JTSK / Krovak)
proj4.defs('EPSG:5514', '+proj=krovak +lat_0=49.5 +lon_0=24.8333333333 +alpha=30.2881397527 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=570.8,85.7,462.8,4.998,1.587,5.261,3.56 +units=m +no_defs');
ol.proj.proj4.register(proj4);

// Now you can use EPSG:5514
const coords = ol.proj.transform([14.4178, 50.1167], 'EPSG:4326', 'EPSG:5514');
```

### Using a Custom CRS for the Map View

```js
// Register projection first
proj4.defs('EPSG:32633', '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs');
ol.proj.proj4.register(proj4);

const projection = ol.proj.get('EPSG:32633');
projection.setExtent([166000, 5400000, 834000, 5800000]);

const map = new ol.Map({
  target: 'map',
  layers: [/* WMS or other layers that support this CRS */],
  view: new ol.View({
    projection: projection,
    center: [500000, 5600000],
    zoom: 8
  })
});
```

---

## Common Mistakes

### Mistake 1: Forgetting fromLonLat

```js
// WRONG — coordinates in wrong projection
new ol.View({ center: [14.4178, 50.1167], zoom: 12 })

// CORRECT
new ol.View({ center: ol.proj.fromLonLat([14.4178, 50.1167]), zoom: 12 })
```

### Mistake 2: GeoJSON Without featureProjection

```js
// WRONG — features appear at [0, 0] or nowhere
new ol.source.Vector({
  url: 'data.geojson',
  format: new ol.format.GeoJSON()
})

// CORRECT
new ol.source.Vector({
  url: 'data.geojson',
  format: new ol.format.GeoJSON({ featureProjection: 'EPSG:3857' })
})
```

### Mistake 3: Confusing [lat, lng] with [lng, lat]

```js
// WRONG — Leaflet order
ol.proj.fromLonLat([50.1167, 14.4178])  // Lat, Lng — puts you in Turkmenistan

// CORRECT — GeoJSON / OpenLayers order
ol.proj.fromLonLat([14.4178, 50.1167])  // Lng, Lat — Prague
```

### Mistake 4: Double-Transforming

```js
// WRONG — transform applied twice
const center = ol.proj.fromLonLat([14.4178, 50.1167]);
map.getView().setCenter(ol.proj.fromLonLat(center));  // Already transformed!

// CORRECT
const center = ol.proj.fromLonLat([14.4178, 50.1167]);
map.getView().setCenter(center);
```

---

## Useful Utilities

### Get Current Center in EPSG:4326

```js
const [lng, lat] = ol.proj.toLonLat(map.getView().getCenter());
```

### Get Current Extent in EPSG:4326

```js
const extent4326 = ol.proj.transformExtent(
  map.getView().calculateExtent(map.getSize()),
  'EPSG:3857',
  'EPSG:4326'
);
// [west, south, east, north]
```

### Distance Between Two Points (meters)

```js
const line = new ol.geom.LineString([
  ol.proj.fromLonLat([14.4178, 50.1167]),
  ol.proj.fromLonLat([16.6068, 49.1951])
]);
const distance = ol.sphere.getLength(line);
console.log(`Distance: ${(distance / 1000).toFixed(1)} km`);
```

### Area of a Polygon (sq meters)

```js
const area = ol.sphere.getArea(polygon);
console.log(`Area: ${(area / 1e6).toFixed(2)} km²`);
```
