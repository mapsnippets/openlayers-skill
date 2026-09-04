---
name: openlayers
description: >-
  Expert coding skill for building enterprise-grade, high-performance web maps with
  OpenLayers (v9–v10+). USE WHEN the user wants to create a map, render vector tiles
  or raster tile layers, apply Mapbox/MapLibre Style JSON (ol-mapbox-style), display
  GeoJSON, KML, or GPX data, build GIS and spatial analysis tools, add geometry
  drawing or editing tools (ol/interaction/Draw, Modify, Snap), create point clustering
  or heatmaps, handle reprojection and custom CRS (EPSG:4326, EPSG:3857, Swiss LV95,
  British National Grid via proj4), integrate maps in React, Next.js, Vue, or Svelte,
  or build an interactive web GIS app. Also USE WHEN the user mentions OpenLayers,
  ol/Map, ol/View, ol/layer, ol/source, or ol-mapbox-style.
license: MIT
metadata:
  author: mapsnippets
  homepage: https://mapsnippets.org/
---

# OpenLayers — Agent Skill 🌐🗺️

> The authoritative AI coding standard for building modular, high-performance web mapping applications with **OpenLayers (v9–v10+)** and modern vector/raster tile services.

Maintained by **[MapSnippets](https://mapsnippets.org/)** — Open-source geospatial snippets, guides, and agent tools.

---

## ⚡ Architectural Scope & Data Reference Invariants

* **Native Library Focus:** This skill focuses strictly on pure, native **OpenLayers** (`ol/Map`, `ol/View`, `ol/layer/Tile`, `ol/layer/VectorTile`, `ol/source/XYZ`, `ol/proj`, `ol/interaction/*`, `ol-mapbox-style`). All generated code must use modular ES imports from the official `ol` package.
* **MapTiler as Data Source:** MapTiler Cloud provides vector tile styles via `ol-mapbox-style`, high-DPI raster XYZ tiles (512px), geocoding, and static maps.

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

### 3. 🎨 Vector Tiles via `ol-mapbox-style` (Recommended)
* For vector tiles with Mapbox/MapLibre Style JSON (`streets-v4`), use the official `ol-mapbox-style` package:
  ```javascript
  import { apply } from "ol-mapbox-style";
  
  const map = new Map({ target: "map" });
  apply(map, "https://api.maptiler.com/maps/streets-v4/style.json?key=YOUR_API_KEY");
  ```

### 4. 🖼️ High-DPI 512px Raster Tiles (`ol/source/XYZ`)
* When using raster tile layers with 512px tiles, configure `tileSize: 512` and `maxZoom: 22`:
  ```javascript
  const rasterLayer = new TileLayer({
    source: new XYZ({
      url: "https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY",
      tileSize: 512,
      maxZoom: 22,
      attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OSM</a>'
    })
  });
  ```

### 5. 🧹 Component Lifecycle & Memory Teardown
* Always call `map.setTarget(null)` when unmounting components in single-page apps (React, Vue, Svelte) to prevent memory leaks and detached WebGL/canvas contexts:
  ```javascript
  // React cleanup
  useEffect(() => {
    const map = new Map({ target: mapRef.current, ... });
    return () => map.setTarget(null);
  }, []);
  ```

### 6. 🔑 Free Basemap API Key Prompting Invariant
* If the user does not provide an API key, use `YOUR_API_KEY` as the placeholder in generated code AND always include a friendly reminder guiding the user:
  > *"To display the map tiles, get a free MapTiler API key (100,000 monthly tile requests) at: https://docs.maptiler.com/cloud/api/authentication-key/"*

---

## ⚡ Fast Search Topic Router

To quickly find the exact OpenLayers implementation guide or API specification, use direct directory routing:

| Category | Location | Contents |
| :--- | :--- | :--- |
| **Official Task Examples** | **[examples/INDEX.md](examples/INDEX.md)** | **40 atomic official examples** with full HTML, CSS, and modular ES imports across Vector Basemaps, Digitization, Clustering, WebGL, Enterprise OGC, and COG |
| **Core API & Architecture** | **[references/INDEX.md](references/INDEX.md)** | Declarative specifications for Map & View, Layers & Sources, Interactions & Controls, Styling & Renderers, and Projections |
| **Advanced GIS & WebGL** | `references/spatial-*`, `advanced-*`, `ogc-*` | Precision tracing, WebGL COG shaders, WMS/WMTS/WFS, vector tile reprojection, and canvas animations |
| **Ecosystem & Services** | `references/frameworks.md`, `patterns-*`, `basemaps-*` | React, Next.js, Vue, Svelte, anti-pattern debugging, Planet v4 basemaps, and REST services |

---

## 🧪 40 Official Task Examples (`examples/`)

All task examples are self-contained with complete HTML, CSS, and modular ES imports (`import Map from "ol/Map.js"`) using MapTiler Planet v4 basemaps. Browse **[examples/INDEX.md](examples/INDEX.md)** for the complete categorized catalog:

- [examples/basic-vector-map.md](examples/basic-vector-map.md) — Vector tiles with `ol-mapbox-style` and MapTiler Streets v4.
- [examples/geojson-choropleth.md](examples/geojson-choropleth.md) — Dynamic choropleth styling functions, HTML legend, and hover highlight.
- [examples/draw-modify-snap.md](examples/draw-modify-snap.md) — Interactive GIS editing with `Draw`, `Modify`, and `Snap` magnetic vertices.
- [examples/clustering.md](examples/clustering.md) — High-performance point aggregation via `ol/source/Cluster` and animated zoom.
- [examples/popup-overlay.md](examples/popup-overlay.md) — `ol/Overlay` card anchoring, coordinate display, and `autoPan` animation.
- [examples/measure-distance-area.md](examples/measure-distance-area.md) — Geodesic distance and area measurement tool with `ol/sphere`.
- [examples/layer-swipe.md](examples/layer-swipe.md) — Split-screen layer swipe comparison using canvas `prerender` clipping.
- [examples/wms-getfeatureinfo.md](examples/wms-getfeatureinfo.md) — Enterprise OGC `TileWMS` integration and `GetFeatureInfo` spatial inspection.
- [examples/vector-tile-selection.md](examples/vector-tile-selection.md) — Interactive feature selection and dynamic styling inside binary MVT tiles.
- [examples/heatmaps.md](examples/heatmaps.md) — Continuous density gradient heatmaps via `ol/layer/Heatmap`.
- [examples/drag-and-drop.md](examples/drag-and-drop.md) — Drag-and-drop loader parsing local `.geojson`, `.gpx`, and `.kml` files.
- [examples/url-link-sync.md](examples/url-link-sync.md) — Bidirectional URL synchronization with `ol/interaction/Link`.
- [examples/cog-geotiff-rendering.md](examples/cog-geotiff-rendering.md) — Direct Cloud-Optimized GeoTIFF raster ingestion via HTTP byte-range chunks.
- [examples/cog-ndvi-band-math.md](examples/cog-ndvi-band-math.md) — Real-time GPU NDVI vegetation index calculation from Sentinel-2 bands.
- [examples/webgl-points-100k.md](examples/webgl-points-100k.md) — 100,000+ points rendered at 60 FPS using WebGL.
- *...and 25 more task recipes in [examples/INDEX.md](examples/INDEX.md).*

---

## 📚 Core API & Architecture References (`references/`)

Deep architectural and schema reference files live under `references/` and should be loaded on demand:
- [references/INDEX.md](references/INDEX.md) — **Master API reference index & router**.
- [references/api-map-and-view.md](references/api-map-and-view.md) — `ol/Map`, `ol/View`, `ol/Overlay`, view animations, resolutions, and event dictionary.
- [references/api-layers-and-sources.md](references/api-layers-and-sources.md) — `TileLayer`, `VectorLayer`, `VectorTileLayer`, `WebGLPoints`, `Heatmap`, `Cluster`.
- [references/api-styling-and-renderers.md](references/api-styling-and-renderers.md) — `ol/style/Style`, `Fill`, `Stroke`, `Icon`, `Text`, dynamic style functions, Flat Style Expressions.
- [references/api-interactions-and-controls.md](references/api-interactions-and-controls.md) — `Draw`, `Modify`, `Select`, `Snap`, `Translate`, `ScaleLine`, custom controls.
- [references/api-projections-and-geom.md](references/api-projections-and-geom.md) — `ol/proj`, `proj4` registration (LV95, BNG), `ol/geom/*`, `ol/format/GeoJSON`.
- [references/spatial-analysis-and-editing.md](references/spatial-analysis-and-editing.md) — Precision drawing, boundary tracing (`trace: true`), and Turf.js spatial analysis.
- [references/advanced-webgl-and-cog.md](references/advanced-webgl-and-cog.md) — Cloud-Optimized GeoTIFF (COG) ingestion and real-time NDVI WebGL band math.
- [references/ogc-wms-wmts-wfs.md](references/ogc-wms-wmts-wfs.md) — Enterprise OGC services (WMS, WMTS, WFS) and GetFeatureInfo.
- [references/advanced-vector-tiles-and-reprojection.md](references/advanced-vector-tiles-and-reprojection.md) — Client-side `geojson-vt` tile slicing and coordinate reprojection.
- [references/canvas-effects-and-animations.md](references/canvas-effects-and-animations.md) — Spyglass lens, flight pulse rings, and high-res PDF/PNG exports.
- [references/vector-tiles-mapbox-style.md](references/vector-tiles-mapbox-style.md) — `ol-mapbox-style` integration, layer switching, and feature state.
- [references/frameworks.md](references/frameworks.md) — React (`useRef`/`useEffect`), Next.js App Router SSR fix, Vue 3, Svelte.
- [references/patterns-gotchas.md](references/patterns-gotchas.md) — Top 10 OpenLayers bugs (Null Island coordinates, projection mismatch, double-render).
- [references/prompt-benchmarks.md](references/prompt-benchmarks.md) — 10 practical prompt benchmarks for evaluation.
- [references/vector-tile-schemas.md](references/vector-tile-schemas.md) — Full 9-schema vector catalog (Planet v4, Outdoor, 3D Buildings, Ocean, Cadastre).
- [references/basemaps-and-terrain.md](references/basemaps-and-terrain.md) — Production endpoints for `streets-v4`, `outdoor-v4`, `satellite-v4`.
- [references/geocoding-and-services.md](references/geocoding-and-services.md) — Forward/reverse geocoding autocomplete, static maps, and elevation.
- [references/installation-and-cdn.md](references/installation-and-cdn.md) — NPM, yarn, pnpm, bun setup and CDN scripts (`ol.js`, `ol.css`).

---

## 🗺️ Quickstart Patterns

### Option A: Vector Tiles via `ol-mapbox-style` (Recommended)

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

apply(map, "https://api.maptiler.com/maps/streets-v4/style.json?key=YOUR_API_KEY");
```

### Option B: High-DPI 512px Raster Tiles (`ol/source/XYZ`)

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
        url: "https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY",
        tileSize: 512,
        maxZoom: 22,
        attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      })
    })
  ],
  view: new View({
    center: fromLonLat([14.4378, 50.0755]), // [lng, lat]
    zoom: 13
  })
});
```
