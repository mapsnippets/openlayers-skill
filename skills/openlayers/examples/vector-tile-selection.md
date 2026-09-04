# Vector Tile Feature Selection & Highlighting 🎯

> **Documentation Link:** [Vector Tile Selection](https://openlayers.org/en/latest/examples/vector-tile-selection.html)  
> **Source Module:** `ol/layer/VectorTile.js`, `ol/source/VectorTile.js`, `ol/format/MVT.js`, `ol/style/Style.js`

This guide demonstrates how to inspect and dynamically highlight individual geometries within Mapbox Vector Tiles (MVT) using OpenLayers `VectorTileLayer` and feature ID tracking.

---

## 1. Problem & Use Case

Vector tiles group geometry data into pre-tiled binary Protocol Buffers (`.pbf`). Because features are clipped at tile boundaries, highlighting a selected polygon requires tracking feature IDs across tiles and applying a persistent selection style without re-fetching network tiles.

---

## 2. HTML Container & Selected Info Display

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OpenLayers Vector Tile Selection</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v10.10.0/ol.css" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="map"></div>
  <div id="status-card">Click a country or boundary to select</div>
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

#map {
  width: 100%;
  height: 100%;
}

#status-card {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-size: 13px;
  color: #1e293b;
  min-width: 220px;
}
```

---

## 4. Complete JavaScript Implementation

```javascript
import Map from "ol/Map.js";
import View from "ol/View.js";
import VectorTileLayer from "ol/layer/VectorTile.js";
import VectorTileSource from "ol/source/VectorTile.js";
import MVT from "ol/format/MVT.js";
import Style from "ol/style/Style.js";
import Fill from "ol/style/Fill.js";
import Stroke from "ol/style/Stroke.js";
import { fromLonLat } from "ol/proj.js";
import "ol/ol.css";

const MAPTILER_KEY = "YOUR_API_KEY";

// 1. Base style for unselected vector tile geometries
const defaultStyle = new Style({
  fill: new Fill({ color: "rgba(226, 232, 240, 0.6)" }),
  stroke: new Stroke({ color: "#94a3b8", width: 1 })
});

// 2. Highlight style for selected feature ID
const selectedStyle = new Style({
  fill: new Fill({ color: "rgba(0, 132, 255, 0.45)" }),
  stroke: new Stroke({ color: "#0084FF", width: 2.5 })
});

let selectionId = null;

// 3. Dynamic style function evaluating selection state
function tileStyleFunction(feature) {
  if (feature.getId() === selectionId) {
    return selectedStyle;
  }
  return defaultStyle;
}

// 4. Vector Tile Layer loading MapTiler Planet v4 MVT tiles
const vtLayer = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url: `https://api.maptiler.com/tiles/v4/{z}/{x}/{y}.pbf?key=${MAPTILER_KEY}`,
    maxZoom: 14
  }),
  style: tileStyleFunction
});

// 5. Initialize Map
const map = new Map({
  target: "map",
  layers: [vtLayer],
  view: new View({
    center: fromLonLat([14.4378, 50.0755]),
    zoom: 5
  })
});

// 6. Click handler to identify feature and trigger re-render
const statusCard = document.getElementById("status-card");

map.on("click", (evt) => {
  map.forEachFeatureAtPixel(evt.pixel, (feature) => {
    selectionId = feature.getId();
    const props = feature.getProperties();
    const name = props.name || props.name_en || props.class || "Feature ID: " + selectionId;

    statusCard.innerHTML = `
      <strong>Selected Feature:</strong><br />
      Name: ${name}<br />
      <small style="color: #64748b;">ID: ${selectionId || "N/A"}</small>
    `;
    return true; // Stop iteration at topmost feature
  });

  // Instruct the vector tile layer to re-evaluate styles without re-fetching network tiles
  vtLayer.changed();
});
```

---

## 5. Key Architecture & Implementation Details

| Concept | Explanation |
| :--- | :--- |
| **`ol/format/MVT`** | Decodes binary Protocol Buffer tiles into native OpenLayers feature geometries in the browser. |
| **`feature.getId()`** | Vector tile layers preserve unique integer/string feature identifiers across tiled geometries. |
| **`vtLayer.changed()`** | Dispatches a change event on the layer, causing OpenLayers to re-run the style function for all currently visible tiles on the screen. |
| **Performance** | Unlike GeoJSON layers, Vector Tile layers re-render instantly without creating new DOM nodes or duplicating coordinates. |
