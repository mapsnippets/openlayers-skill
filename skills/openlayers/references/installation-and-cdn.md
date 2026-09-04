# OpenLayers Installation & CDN Reference

Source: https://openlayers.org/download/

This guide details all methods for loading OpenLayers: NPM package managers, modern bundlers (Vite, Webpack, Next.js), hosted CDNs, and offline packages.

---

## 1. Modern Package Managers (NPM / Yarn / PNPM / Bun) — Recommended

OpenLayers is distributed as ES modules in the `ol` package.

### Installation:
```bash
# npm
npm install ol ol-mapbox-style

# yarn
yarn add ol ol-mapbox-style

# pnpm
pnpm add ol ol-mapbox-style

# bun
bun add ol ol-mapbox-style
```

### Ingestion in JavaScript / TypeScript:
```javascript
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import { fromLonLat } from "ol/proj.js";
import "ol/ol.css"; // CRITICAL: Always import CSS in root JS/TS file!
```

---

## 2. Hosted CDN (Vanilla HTML / No Build Step)

For rapid prototypes or standalone HTML files without a build step:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>OpenLayers Map</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- OpenLayers CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v10.10.0/ol.css">
  
  <!-- OpenLayers JS -->
  <script src="https://cdn.jsdelivr.net/npm/ol@v10.10.0/dist/ol.js"></script>

  <!-- ol-mapbox-style (for Vector Tiles) -->
  <script src="https://cdn.jsdelivr.net/npm/ol-mapbox-style@12.3.4/dist/olms.js"></script>

  <style>
    #map { height: 100vh; width: 100%; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <div id="map"></div>

  <script>
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: 'https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY',
            tileSize: 512,
            maxZoom: 22,
            attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'
          })
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([14.4378, 50.0755]),
        zoom: 13
      })
    });
  </script>
</body>
</html>
```

---

## 3. Offline / Self-Hosted Distribution

For offline environments or enterprise intranets:
* Download release package: `https://github.com/openlayers/openlayers/releases/download/v10.10.0/v10.10.0-package.zip`
* Include `ol.js` and `ol.css` in your static public directory.
