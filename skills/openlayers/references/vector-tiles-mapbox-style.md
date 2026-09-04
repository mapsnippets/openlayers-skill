# Vector Tiles in OpenLayers with `ol-mapbox-style`

Source: https://github.com/openlayers/ol-mapbox-style

`ol-mapbox-style` applies full Mapbox/MapLibre Style JSON documents to OpenLayers maps, providing crisp, high-performance vector rendering.

---

## 1. Installation

```bash
npm install ol ol-mapbox-style
```

---

## 2. Basic Implementation (`apply`)

```javascript
import Map from "ol/Map.js";
import View from "ol/View.js";
import { fromLonLat } from "ol/proj.js";
import { apply } from "ol-mapbox-style";
import "ol/ol.css";

const map = new Map({
  target: "map",
  view: new View({
    center: fromLonLat([14.4378, 50.0755]), // [lng, lat]
    zoom: 13
  })
});

// Apply vector style JSON
apply(map, "https://api.maptiler.com/maps/streets-v4/style.json?key=YOUR_API_KEY")
  .then(() => {
    console.log("Vector tile style successfully applied!");
  });
```

---

## 3. Switching Styles Dynamically

```javascript
function switchVectorStyle(styleId, apiKey) {
  const styleUrl = `https://api.maptiler.com/maps/${styleId}/style.json?key=${apiKey}`;
  apply(map, styleUrl);
}

// Example switch to outdoor or dark
switchVectorStyle("outdoor-v4", "YOUR_API_KEY");
```

---

## 4. Querying & Manipulating Vector Layers

`ol-mapbox-style` creates `VectorTileLayer` instances mapped to the style sources:

```javascript
import { getLayer } from "ol-mapbox-style";

apply(map, styleUrl).then(() => {
  // Access underlying OpenLayers VectorTileLayer
  const buildingsLayer = getLayer(map, "building");
  if (buildingsLayer) {
    buildingsLayer.setOpacity(0.8);
  }
});
```
