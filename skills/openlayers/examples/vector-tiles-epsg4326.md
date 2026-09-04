# Vector Tiles in Plate Carrée (EPSG:4326)

> Official Reference: [Vector Tiles in Plate Carrée (EPSG:4326)](https://openlayers.org/en/latest/examples/vector-tiles-4326.html)
> Category: **Projections & Coordinate Systems**

## Overview
Displays vector tiles reprojected or tiled in global WGS 84 geographic coordinates (`EPSG:4326`) using `ol-mapbox-style`.

## Complete Standalone Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OpenLayers - Vector Tiles in EPSG:4326</title>
  <script src="https://cdn.jsdelivr.net/npm/ol@v10.10.0/dist/ol.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v10.10.0/ol.css">
  <script src="https://cdn.jsdelivr.net/npm/ol-mapbox-style@12.3.4/dist/olms.js"></script>
  <style>
    body { margin: 0; padding: 0; }
    #map { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const MAPTILER_KEY = 'YOUR_MAPTILER_API_KEY';

    const map = new ol.Map({
      target: 'map',
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [0, 20],
        zoom: 2
      })
    });

    olms.apply(map, `https://api.maptiler.com/maps/dataviz-v4-dark/style.json?key=${MAPTILER_KEY}`);
  </script>
</body>
</html>
```

## Key API Features
- Native OpenLayers API implementation.
- Uses MapTiler modern basemap endpoints.
- Fully self-contained HTML/CSS/JS ready for deployment.
