# Basic Vector Map with ol-mapbox-style 🗺️

> **Official OpenLayers Example:** [Mapbox Vector Tiles](https://openlayers.org/en/latest/examples/mapbox-vector-tiles.html)  
> **Source Module:** `ol-mapbox-style`, `ol/Map.js`, `ol/View.js`, `ol/proj.js`

This guide demonstrates how to render a crisp, client-side vector tile basemap in OpenLayers using the official `ol-mapbox-style` package and the modern MapTiler Planet v4 vector tile schema.

---

## 1. Problem & Use Case

Raster tiles can appear blurry on high-DPI displays and cannot be dynamically re-styled or queried on the client. By pairing OpenLayers with `ol-mapbox-style`, developers can render vector tiles directly from Mapbox/MapLibre Style JSON specifications with sharp typography, smooth zooming, and minimal network bandwidth.

---

## 2. HTML Container

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OpenLayers Basic Vector Map</title>
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

## 3. CSS Styling

```css
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

#map {
  width: 100%;
  height: 100%;
}

/* Ensure OpenLayers attribution looks clean and readable */
.ol-attribution {
  font-size: 11px;
  background: rgba(255, 255, 255, 0.85) !important;
  border-radius: 4px;
  padding: 2px 6px;
}
```

---

## 4. Complete JavaScript Implementation

```javascript
import Map from "ol/Map.js";
import View from "ol/View.js";
import { fromLonLat } from "ol/proj.js";
import { apply } from "ol-mapbox-style";
import "ol/ol.css";

// Replace with your MapTiler API Key (https://cloud.maptiler.com/account/keys/)
const MAPTILER_KEY = "YOUR_API_KEY";

// 1. Initialize empty OpenLayers map with target container and initial view
const map = new Map({
  target: "map",
  view: new View({
    // OpenLayers coordinates must be transformed from EPSG:4326 [lng, lat] to EPSG:3857
    center: fromLonLat([14.4378, 50.0755]), // Prague, Czech Republic
    zoom: 13,
    minZoom: 0,
    maxZoom: 22
  })
});

// 2. Fetch and apply MapTiler Planet v4 vector style via ol-mapbox-style
const styleUrl = `https://api.maptiler.com/maps/streets-v4/style.json?key=${MAPTILER_KEY}`;

apply(map, styleUrl)
  .then(() => {
    console.log("Vector tile style successfully applied to OpenLayers map.");
  })
  .catch((err) => {
    console.error("Failed to load vector style:", err);
  });

// 3. Optional lifecycle cleanup for single-page applications (React, Vue, Svelte)
window.addEventListener("beforeunload", () => {
  map.setTarget(null);
});
```

---

## 5. Key Architecture & Implementation Details

| Concept | Explanation |
| :--- | :--- |
| **`apply(map, url)`** | Configures vector tile sources, fonts, sprites, and renders layers according to the Mapbox Style Specification. |
| **`fromLonLat([lng, lat])`** | OpenLayers default view projection is `EPSG:3857` (Spherical Mercator in meters). GPS coordinates `[lng, lat]` must be projected before being passed to `center`. |
| **Planet v4 Basemap** | `https://api.maptiler.com/maps/streets-v4/style.json` provides global vector tiles, hillshading, 3D contours, and localized POI labels. |
| **Lifecycle Cleanup** | Always invoke `map.setTarget(null)` when unmounting in single-page apps to avoid detached WebGL/Canvas context memory leaks. |
