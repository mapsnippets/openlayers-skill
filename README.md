# OpenLayers Agent Skill 🌐🗺️

The authoritative AI coding skill for building enterprise-grade, high-performance web maps with **OpenLayers** (v10+), native high-DPI raster basemaps, and rich GIS data layers.

Maintained by **[MapSnippets](https://mapsnippets.org/)** — Open-source geospatial snippets, guides, and agent tools.

---

## ⚡ Key Highlights
* **Native Raster Basemaps:** Uses pure OpenLayers `ol/layer/Tile` + `ol/source/XYZ` with MapTiler Planet v4 high-DPI 512px Retina (`@2x.png`) raster tiles.
* **Zero External Compiler Overhead:** Pure native OpenLayers with 0 external style compilers.
* **Rich Vector & GIS Features:** Client-side GeoJSON, KML, GPX, shape digitization (`Draw`, `Modify`, `Snap`), clustering, and heatmaps.
* **Enterprise OGC Services:** Full support for WMS, WMTS, WFS, and GetFeatureInfo.
* **Modern Earth Observation:** Direct Cloud-Optimized GeoTIFF (COG) and GeoZarr ingestion with WebGL shaders.
* **Geodetic Precision:** Multi-projection coordinate systems with Proj4js (Swiss LV95, British National Grid, WGS 84).

---

## 🚀 Quickstart

```javascript
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import { fromLonLat } from "ol/proj.js";
import "ol/ol.css";

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new XYZ({
        url: "https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}@2x.png?key=YOUR_API_KEY",
        tilePixelRatio: 2,
        tileSize: 512,
        maxZoom: 22,
        attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'
      })
    })
  ],
  view: new View({
    center: fromLonLat([14.4378, 50.0755]), // Prague
    zoom: 13
  })
});
```

---

## 📚 Documentation & Reference Structure

- `skills/openlayers/SKILL.md` — Core instructions, invariants, and fast search router.
- `skills/openlayers/references/` — 18 deep technical references covering Map & View, Layers & Sources, Projections, WebGL/COG, and OGC standards.
- `skills/openlayers/examples/` — 56 atomic runnable recipes with complete HTML, CSS, and modular ES imports.
