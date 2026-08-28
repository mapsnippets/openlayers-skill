# OpenLayers API Reference — Layers & Sources

Source: https://openlayers.org/en/latest/apidoc/module-ol_layer_Base-BaseLayer.html

---

## 1. Layer Classes (`ol/layer/*`)

| Layer Class | Import Path | Best For |
| :--- | :--- | :--- |
| `TileLayer` | `ol/layer/Tile.js` | Standard raster tile pyramids (XYZ, OSM, WMS tiles). |
| `VectorLayer` | `ol/layer/Vector.js` | Client-side vector geometries (GeoJSON, KML, GPX). |
| `VectorTileLayer` | `ol/layer/VectorTile.js` | Vector tiles (MVT / Mapbox vector tiles). |
| `VectorImageLayer`| `ol/layer/VectorImage.js`| Vector data pre-rendered to canvas images for high performance during pan/zoom. |
| `WebGLPointsLayer`| `ol/layer/WebGLPoints.js`| Hardware-accelerated WebGL rendering for 100,000+ points. |
| `Heatmap` | `ol/layer/Heatmap.js` | Density heatmaps with `radius`, `blur`, and `weight`. |
| `LayerGroup` | `ol/layer/Group.js` | Hierarchical layer grouping and visibility toggling. |

### Common Layer Properties:
* `opacity` (`number` = `1.0`)
* `visible` (`boolean` = `true`)
* `zIndex` (`number` = `0`)
* `minZoom` / `maxZoom` (`number`)
* `minResolution` / `maxResolution` (`number`)

---

## 2. Source Classes (`ol/source/*`)

### `ol/source/XYZ` (Raster Tiles)
```javascript
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";

const rasterLayer = new TileLayer({
  source: new XYZ({
    url: "https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY",
    tileSize: 512,
    maxZoom: 22,
    crossOrigin: "anonymous",
    attributions: '<a href="https://www.maptiler.com/copyright/">&copy; MapTiler</a>'
  })
});
```

### `ol/source/Vector` (GeoJSON / In-Memory Features)
```javascript
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import GeoJSON from "ol/format/GeoJSON.js";

const vectorLayer = new VectorLayer({
  source: new VectorSource({
    url: "https://example.com/regions.geojson",
    format: new GeoJSON({
      dataProjection: "EPSG:4326",      // Source data format
      featureProjection: "EPSG:3857"    // Target map view projection
    })
  })
});
```

### `ol/source/Cluster` (Marker Clustering)
```javascript
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import Cluster from "ol/source/Cluster.js";
import { Style, Circle as CircleStyle, Fill, Stroke, Text } from "ol/style.js";

const clusterSource = new Cluster({
  distance: 40,      // Cluster distance in pixels
  minDistance: 20,   // Min distance between clusters
  source: new VectorSource({ features: pointFeatures })
});

const clusterLayer = new VectorLayer({
  source: clusterSource,
  style: (feature) => {
    const size = feature.get("features").length;
    return new Style({
      image: new CircleStyle({
        radius: Math.min(15 + size, 30),
        fill: new Fill({ color: size > 10 ? "#e74c3c" : "#0084ff" }),
        stroke: new Stroke({ color: "#ffffff", width: 2 })
      }),
      text: new Text({
        text: size.toString(),
        fill: new Fill({ color: "#ffffff" }),
        font: "bold 12px sans-serif"
      })
    });
  }
});
```

### `ol/layer/Heatmap`
```javascript
import Heatmap from "ol/layer/Heatmap.js";
import VectorSource from "ol/source/Vector.js";

const heatmapLayer = new Heatmap({
  source: new VectorSource({ features: pointFeatures }),
  blur: 15,
  radius: 20,
  weight: (feature) => feature.get("magnitude") || 0.5,
  gradient: ["#00f", "#0ff", "#0f0", "#ff0", "#f00"]
});
```
