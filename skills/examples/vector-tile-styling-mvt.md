# Client-Side Flat Style Expressions on MVT Vector Tiles 🎨

> **Official OpenLayers Example:** [Vector Tile Info & Expressions](https://openlayers.org/en/latest/examples/vector-tile-info.html)  
> **Target Category:** Production Task Implementation

Styling raw Mapbox Vector Tiles (.pbf) on the client using OpenLayers modern Flat Style declarative expression syntax without third-party style packages.

---

## 1. HTML Container

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Client-Side Flat Style Expressions on MVT Vector Tiles 🎨</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v10.10.0/ol.css" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="map"></div>
  <script type="module" src="main.js"></script>
</body>
</html>
```

---

## 2. CSS Styling

```css
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

#map {
  width: 100%;
  height: 100%;
}

#map { width: 100%; height: 100%; }
```

---

## 3. Complete JavaScript Implementation

```javascript
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import MVT from 'ol/format/MVT.js';
import { fromLonLat } from 'ol/proj.js';
import 'ol/ol.css';

const MAPTILER_KEY = 'YOUR_API_KEY';

// Flat style declarative rules applied directly to vector tile layer
const flatStyle = [
  {
    filter: ['==', ['get', 'layer'], 'water'],
    style: {
      'fill-color': '#0084FF'
    }
  },
  {
    filter: ['==', ['get', 'layer'], 'transportation'],
    style: {
      'stroke-color': '#ffffff',
      'stroke-width': 2
    }
  },
  {
    filter: ['==', ['get', 'layer'], 'building'],
    style: {
      'fill-color': 'rgba(200, 210, 225, 0.6)',
      'stroke-color': '#cbd5e1',
      'stroke-width': 1
    }
  }
];

const vtLayer = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url: `https://api.maptiler.com/tiles/v4/{z}/{x}/{y}.pbf?key=${MAPTILER_KEY}`,
    maxZoom: 14
  }),
  style: flatStyle
});

const map = new Map({
  target: 'map',
  layers: [vtLayer],
  view: new View({ center: fromLonLat([14.4378, 50.0755]), zoom: 14 })
});
```

---

## 4. Key Architecture & Options

| Parameter / Feature | Purpose |
| :--- | :--- |
| **Official Standard** | Conforms to `https://openlayers.org/en/latest/examples/vector-tile-info.html` with native `ol/*` modular ES imports. |
| **Basemap Service** | Powered by modern MapTiler Planet v4 high-DPI raster XYZ or vector tile styles. |
| **Lifecycle Clean** | Safe for single-page applications (React, Vue, Svelte) via standard `map.setTarget(null)`. |
