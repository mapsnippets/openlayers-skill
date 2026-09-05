---
name: openlayers
description: >-
  Expert coding skill for building enterprise-grade, high-performance web maps with
  OpenLayers. USE WHEN the user wants to create a map, render raster tile layers
  (MapTiler Streets, Satellite, Outdoor, Topo, Dataviz), display GeoJSON, KML, or GPX data,
  build GIS and spatial analysis tools, add geometry drawing or editing tools
  (ol/interaction/Draw, Modify, Snap), create point clustering or heatmaps, handle
  reprojection and custom CRS (EPSG:4326, EPSG:3857, Swiss LV95, British National Grid via proj4),
  integrate Cloud-Optimized GeoTIFFs (COG), enterprise OGC services (WMS, WMTS, WFS),
  integrate maps in React, Next.js, Vue, or Svelte, or build an interactive web GIS app.
  Also USE WHEN the user mentions OpenLayers, ol/Map, ol/View, ol/layer, ol/source, or ol/interaction.
license: MIT
metadata:
  author: mapsnippets
  homepage: https://mapsnippets.org/
---

# OpenLayers — Agent Skill 🌐🗺️

> The authoritative AI coding standard for building modular, high-performance web mapping applications with **OpenLayers** and modern raster tile services.

Maintained by **[MapSnippets](https://mapsnippets.org/)** — Open-source geospatial snippets, guides, and agent tools.

---

## ⚡ Architectural Scope & Data Reference Invariants

* **Native Library Focus:** This skill focuses strictly on pure, native **OpenLayers** (`ol/Map`, `ol/View`, `ol/layer/Tile`, `ol/source/XYZ`, `ol/layer/Vector`, `ol/source/Vector`, `ol/proj`, `ol/interaction/*`). All generated code must use modular ES imports from the `ol` package.
* **MapTiler as Data Source:** MapTiler Cloud provides high-DPI raster XYZ tiles (512px @2x), geocoding, elevation, and static maps.
* **Strictly Raster Basemaps:** OpenLayers maps in this skill use **native high-DPI raster basemaps (`ol/layer/Tile` + `ol/source/XYZ`)** paired with rich client-side vector data layers (`ol/layer/Vector` + `ol/source/Vector` for GeoJSON, KML, GPX, digitization, clustering, and spatial analysis). For client-side vector tiles with MapLibre style JSON, use MapLibre GL JS instead.

---

## ⚡ Critical Invariants & Rules

Follow these rules on every OpenLayers code generation to prevent bugs:

### 1. 📦 Strict Modular ES Imports (No Global `ol.*`)
* **Never use legacy `new ol.Map(...)` global objects.**
* **Always use modular ES imports**:
  ```javascript
  import Map from "ol/Map.js";
  import View from "ol/View.js";
  import TileLayer from "ol/layer/Tile.js";
  import XYZ from "ol/source/XYZ.js";
  import { fromLonLat, toLonLat } from "ol/proj.js";
  import "ol/ol.css"; // Mandatory CSS import
  ```

### 2. 🌍 Projection Conversion Rule (`fromLonLat`)
* OpenLayers views use **`EPSG:3857` (Spherical Mercator in meters)** by default.
* GPS and GeoJSON coordinates use **`EPSG:4326` `[longitude, latitude]`**.
* **Rule:** Always wrap coordinates in `fromLonLat([lng, lat])` when setting map center, adding markers, or panning:
  ```javascript
  const prague = fromLonLat([14.4378, 50.0755]); // [lng, lat] -> [x, y] in meters
  view.setCenter(prague);
  ```

### 3. 🖼️ Crisp High-DPI 512px Raster Basemaps (`ol/source/XYZ`) & Tile URL Rules
* **512px is the Default on MapTiler Cloud:**
  * **512px Standard:** `https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY`
  * **512px Retina (@2x):** `https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}@2x.png?key=YOUR_API_KEY`
  * ⚠️ **CRITICAL GOTCHA: NEVER use `/512/` in the URL path** — `.../maps/streets-v4/512/...` is **INVALID** and returns HTTP errors. 512px tiles have no size prefix in their path.
  * **256px Legacy Tiles:** Only 256px tiles require an explicit size path: `.../maps/streets-v4/256/{z}/{x}/{y}.png` (or `@2x.png`).
* When using raster tile layers with 512px tiles in OpenLayers, configure `tileSize: 512` and `maxZoom: 22`:
  ```javascript
  // 512px Retina Basemap (@2x - Recommended for crisp displays)
  const basemap = new TileLayer({
    source: new XYZ({
      url: "https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}@2x.png?key=YOUR_API_KEY",
      tilePixelRatio: 2,
      tileSize: 512,
      maxZoom: 22,
      attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OSM</a>'
    })
  });
  ```

### 4. 🧹 Component Lifecycle & Memory Teardown
* Always call `map.setTarget(null)` when unmounting components in single-page apps (React, Vue, Svelte) to prevent memory leaks and detached WebGL/canvas contexts:
  ```javascript
  // React cleanup
  useEffect(() => {
    const map = new Map({ target: mapRef.current, ... });
    return () => map.setTarget(null);
  }, []);
  ```

### 5. 🔑 Free Basemap API Key Prompting Invariant
* If the user does not provide an API key, use `YOUR_API_KEY` as the placeholder in generated code AND always include a friendly reminder guiding the user:
  > *"To display the map tiles, get a free MapTiler API key (100,000 monthly tile requests) at: https://docs.maptiler.com/cloud/api/authentication-key/"*

---

## ⚡ Fast Search Topic Router

To quickly find the exact OpenLayers implementation guide or API specification, use direct directory routing:

| Category | Location | Contents |
| :--- | :--- | :--- |
| **Task Examples** | **[examples/INDEX.md](examples/INDEX.md)** | **56 atomic runnable recipes** with full HTML, CSS, and modular ES imports across Raster Basemaps, Digitization, Clustering, WebGL, Enterprise OGC, and COG |
| **Core API & Architecture** | **[references/INDEX.md](references/INDEX.md)** | Declarative specifications for Map & View, Layers & Sources, Interactions & Controls, Styling & Renderers, and Projections |
| **Advanced GIS & WebGL** | `references/spatial-*`, `advanced-*`, `ogc-*` | Precision tracing, WebGL COG shaders, WMS/WMTS/WFS, raster reprojection, and canvas animations |
| **Ecosystem & Services** | `references/plugins-catalog.md`, `references/frameworks.md`, `patterns-*`, `basemaps-*` | Extension catalog (`ol-ext`, `proj4`, `ol-mapbox-style`), React/Vue/Svelte, Planet v4 raster basemaps |

---

## 🧪 Runnable Task Examples (`examples/`)

All task examples are self-contained with complete HTML, CSS, and modular ES imports (`import Map from "ol/Map.js"`) using MapTiler Planet v4 raster basemaps. Browse **[examples/INDEX.md](examples/INDEX.md)** for the complete categorized catalog:

- [examples/basic-raster-map.md](examples/basic-raster-map.md) — Crisp 512px Retina raster basemap with `TileLayer`, `XYZ`, and MapTiler Streets v4.
- [examples/geojson-choropleth.md](examples/geojson-choropleth.md) — Dynamic choropleth styling functions, HTML legend, and hover highlight.
- [examples/draw-modify-snap.md](examples/draw-modify-snap.md) — Interactive GIS editing with `Draw`, `Modify`, and `Snap` magnetic vertices.
- [examples/clustering.md](examples/clustering.md) — High-performance point aggregation via `ol/source/Cluster` and animated zoom.
- [examples/popup-overlay.md](examples/popup-overlay.md) — `ol/Overlay` card anchoring, coordinate display, and `autoPan` animation.
- [examples/measure-distance-area.md](examples/measure-distance-area.md) — Geodesic distance and area measurement tool with `ol/sphere`.
- [examples/layer-swipe.md](examples/layer-swipe.md) — Split-screen layer swipe comparison using canvas `prerender` clipping.
- [examples/wms-getfeatureinfo.md](examples/wms-getfeatureinfo.md) — Enterprise OGC `TileWMS` integration and `GetFeatureInfo` spatial inspection.
- [examples/heatmaps.md](examples/heatmaps.md) — Continuous density gradient heatmaps via `ol/layer/Heatmap`.
- [examples/drag-and-drop.md](examples/drag-and-drop.md) — Drag-and-drop loader parsing local `.geojson`, `.gpx`, and `.kml` files.
- [examples/url-link-sync.md](examples/url-link-sync.md) — Bidirectional URL synchronization with `ol/interaction/Link`.
- [examples/cog-geotiff-rendering.md](examples/cog-geotiff-rendering.md) — Direct Cloud-Optimized GeoTIFF raster ingestion via HTTP byte-range chunks.
- [examples/cog-ndvi-band-math.md](examples/cog-ndvi-band-math.md) — Real-time GPU NDVI vegetation index calculation from Sentinel-2 bands.
- [examples/webgl-points-100k.md](examples/webgl-points-100k.md) — 100,000+ points rendered at 60 FPS using WebGL.
- *...and 42 more task recipes in [examples/INDEX.md](examples/INDEX.md).*

---

## 📚 Core API & Architecture References (`references/`)

Deep architectural and schema reference files live under `references/` and should be loaded on demand:
- [references/INDEX.md](references/INDEX.md) — **Master API reference index & router**.
- [references/api-catalog.md](references/api-catalog.md) — **Official OpenLayers API Directory** (293 classes & modules mapped to `openlayers.org/en/latest/apidoc/`).
- [references/api-map-and-view.md](references/api-map-and-view.md) — `ol/Map`, `ol/View`, `ol/Overlay`, view animations, resolutions, and event dictionary.
- [references/api-layers-and-sources.md](references/api-layers-and-sources.md) — `TileLayer`, `VectorLayer`, `WebGLTile`, `WebGLPoints`, `Heatmap`, `Cluster`.
- [references/api-styling-and-renderers.md](references/api-styling-and-renderers.md) — `ol/style/Style`, `Fill`, `Stroke`, `Icon`, `Text`, dynamic style functions, Flat Style Expressions.
- [references/api-interactions-and-controls.md](references/api-interactions-and-controls.md) — `Draw`, `Modify`, `Select`, `Snap`, `Translate`, `ScaleLine`, custom controls.
- [references/api-projections-and-geom.md](references/api-projections-and-geom.md) — `ol/proj`, `proj4` registration (LV95, BNG), `ol/geom/*`, `ol/format/GeoJSON`.
- [references/spatial-analysis-and-editing.md](references/spatial-analysis-and-editing.md) — Precision drawing, boundary tracing (`trace: true`), and Turf.js spatial analysis.
- [references/advanced-webgl-and-cog.md](references/advanced-webgl-and-cog.md) — Cloud-Optimized GeoTIFF (COG) ingestion and real-time NDVI WebGL band math.
- [references/ogc-wms-wmts-wfs.md](references/ogc-wms-wmts-wfs.md) — Enterprise OGC services (WMS, WMTS, WFS) and GetFeatureInfo.
- [references/advanced-reprojection-and-grids.md](references/advanced-reprojection-and-grids.md) — On-the-fly raster reprojection, Proj4js, and custom CRS grids.
- [references/canvas-effects-and-animations.md](references/canvas-effects-and-animations.md) — Spyglass lens, flight pulse rings, and high-res PDF/PNG exports.
- [references/raster-basemaps-xyz.md](references/raster-basemaps-xyz.md) — Native raster XYZ basemaps, Retina `@2x`, layer switching, and performance tuning.
- [references/frameworks.md](references/frameworks.md) — React (`useRef`/`useEffect`), Next.js App Router SSR fix, Vue 3, Svelte.
- [references/patterns-gotchas.md](references/patterns-gotchas.md) — Top 10 OpenLayers bugs (Null Island coordinates, projection mismatch, double-render).
- [references/prompt-benchmarks.md](references/prompt-benchmarks.md) — 10 practical prompt benchmarks for evaluation.
- [references/basemaps-and-terrain.md](references/basemaps-and-terrain.md) — Production endpoints for `streets-v4`, `outdoor-v4`, `satellite-v4`, `dataviz-v4-dark`.
- [references/geocoding-and-services.md](references/geocoding-and-services.md) — Forward/reverse geocoding autocomplete, static maps, and elevation.
- [references/installation-and-cdn.md](references/installation-and-cdn.md) — NPM, yarn, pnpm, bun setup and CDN scripts (`ol.js`, `ol.css`).

---

## 🗺️ Quickstart Pattern: High-DPI 512px Raster Basemap (`ol/source/XYZ`)

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
        attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      })
    })
  ],
  view: new View({
    center: fromLonLat([14.4378, 50.0755]), // [lng, lat] Prague
    zoom: 13
  })
});
```
