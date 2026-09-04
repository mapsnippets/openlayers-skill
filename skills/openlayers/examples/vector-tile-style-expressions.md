# Flat Style Expressions for Vector Tiles

> **Documentation Reference:** [Flat Style Expressions for Vector Tiles](https://openlayers.org/en/latest/examples/vector-tile-info.html)
> Category: **Vector Formats & MVT**

## Overview
Utilizes modern OpenLayers Flat Style expressions (`interpolate`, `case`, `match`) for high-speed client styling on MVT layers.

## Complete Standalone Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OpenLayers - Flat Style Expressions on MVT</title>
  <script src="https://cdn.jsdelivr.net/npm/ol@v10.10.0/dist/ol.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v10.10.0/ol.css">
  <style>
    body { margin: 0; padding: 0; }
    #map { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const MAPTILER_KEY = 'YOUR_MAPTILER_API_KEY';

    const vtLayer = new ol.layer.VectorTile({
      source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        url: `https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=${MAPTILER_KEY}`
      }),
      style: {
        'stroke-color': [
          'match',
          ['get', 'class'],
          'motorway', '#ff5722',
          'primary', '#ff9800',
          '#64748b'
        ],
        'stroke-width': [
          'interpolate',
          ['linear'],
          ['zoom'],
          8, 1,
          16, 4
        ]
      }
    });

    const map = new ol.Map({
      target: 'map',
      layers: [vtLayer],
      view: new ol.View({
        center: ol.proj.fromLonLat([2.3522, 48.8566]),
        zoom: 12
      })
    });
  </script>
</body>
</html>
```

## Key API Features
- Native OpenLayers API implementation.
- Uses MapTiler modern basemap endpoints.
- Fully self-contained HTML/CSS/JS ready for deployment.
