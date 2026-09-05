# OpenLayers Reference Index 🗂️⚡

> Master index and topic routing directory for all OpenLayers agent references, API standards, comprehensive documentation guides, and MapTiler basemap integrations. Load on demand.

Maintained by **[MapSnippets](https://mapsnippets.org/)** — Open-source geospatial snippets, guides, and agent tools.

---

## 🔎 Fast Search & Directory Routing

| Topic Area | Directory / Prefix | Contents |
| :--- | :--- | :--- |
| **Official API Docs** | **[references/api-catalog.md](api-catalog.md)** | **Exhaustive catalog of all 293 official OpenLayers classes & modules** linking directly to [`openlayers.org/en/latest/apidoc/`](https://openlayers.org/en/latest/apidoc/) |
| **Task Examples** | **[examples/INDEX.md](../examples/INDEX.md)** | **60 atomic runnable recipes** with full HTML, CSS, and native JS across Projections, Digitization, Clustering, WebGL, COG, OGC, and UI Overlays |
| **Official Examples**| **[references/examples-catalog.md](examples-catalog.md)** | Full index of all 281 official OpenLayers website examples cross-referenced to recipes |
| **Core API & View** | `references/api-map-*`, `references/api-projections-*` | `Map` options, `View` physics, coordinate transformations, Proj4js registration |
| **Layers & Sources** | `references/api-layers-*`, `references/ogc-*` | `TileLayer`, `VectorLayer`, `WebGLTile`, COG, GeoZarr, WMS, WMTS, WFS |
| **Styling & Shaders** | `references/api-styling-*` | Style DSL, dynamic style functions, Flat Style expressions, WebGL styling |
| **Interactions & CAD** | `references/api-interactions-*` | Vector drawing, vertex editing, magnetic snapping, spatial analysis |
| **Basemaps, Schemas & Services**| `references/basemaps-*`, `references/vector-tile-*` | MapTiler Planet v4 tile URLs, vector schemas, and REST endpoints |

---

## 📑 Complete Reference Catalog (`references/`)

### 1. Core API Specifications & Architecture
* **[api-catalog.md](api-catalog.md)** — **Exhaustive 293-module official OpenLayers API directory** linking directly to [`openlayers.org/en/latest/apidoc/`](https://openlayers.org/en/latest/apidoc/).
* **[examples-catalog.md](examples-catalog.md)** — Exhaustive index of all 281 official OpenLayers website examples cross-referenced to standalone recipes.
* **[api-map-and-view.md](api-map-and-view.md)** — `Map` methods, `View` camera physics, coordinate conversion, flight animations.
* **[api-layers-and-sources.md](api-layers-and-sources.md)** — Complete layer and source classes (`Tile`, `Vector`, `VectorTile`, `WebGLTile`, `GeoTIFF`, `Raster`).
* **[api-styling-and-renderers.md](api-styling-and-renderers.md)** — Imperative style classes, dynamic style functions, Flat Style expressions, WebGL shader rules.
* **[api-interactions-and-controls.md](api-interactions-and-controls.md)** — Vector CAD digitization (`Draw`, `Modify`, `Snap`, `Select`, `Translate`) and UI controls.
* **[api-projections-and-geom.md](api-projections-and-geom.md)** — Coordinate systems, Proj4js registration (LV95, BNG, EPSG:4326), and geometry hierarchy.
* **[ogc-wms-wmts-wfs.md](ogc-wms-wmts-wfs.md)** — Enterprise OGC stack (WMS `getFeatureInfoUrl`, WMTS matrix sets, WFS BBOX strategy & XML filters).
* **[patterns-gotchas.md](patterns-gotchas.md)** — Solutions for the top OpenLayers bugs (EPSG:3857 coordinate trap, missing CSS, snap ordering, canvas export).
* **[events.md](events.md)** — Map lifecycle, view changes, pointer tracking, vector feature events, and render hooks.
* **[frameworks.md](frameworks.md)** — Integrating OpenLayers in React, Vue 3, Svelte, and Next.js SPAs.
* **[installation-and-cdn.md](installation-and-cdn.md)** — Bundler setup (Vite, Webpack, rollup), ESM CDN imports, and stylesheet assets.
* **[prompt-benchmarks.md](prompt-benchmarks.md)** — Standardized OpenLayers evaluation prompts and patterns.

### 2. Advanced Vector, WebGL & Spatial Analytics
* **[vector-tiles-mapbox-style.md](vector-tiles-mapbox-style.md)** — Client-side Mapbox Style specification parsing with `ol-mapbox-style`.
* **[advanced-vector-tiles-and-reprojection.md](advanced-vector-tiles-and-reprojection.md)** — Client-side on-the-fly reprojection and custom grid vector tiles.
* **[advanced-webgl-and-cog.md](advanced-webgl-and-cog.md)** — Cloud-Optimized GeoTIFF (COG), multi-band WebGL shaders, and raster math.
* **[canvas-effects-and-animations.md](canvas-effects-and-animations.md)** — Canvas post-render clipping, swipe comparison controls, and flight animations.
* **[spatial-analysis-and-editing.md](spatial-analysis-and-editing.md)** — Spatial analysis, geometry validation, snapping, and topology editing.

### 3. Basemaps, Schemas & Services
* **[vector-tile-schemas.md](vector-tile-schemas.md)** — Complete Planet v4 vector tile schema (transportation, building, water, place, poi, boundary).
* **[versions.md](versions.md)** — Core OpenLayers v10.10.0, companion packages, CDN URLs, and V4 styles.
* **[basemaps-and-terrain.md](basemaps-and-terrain.md)** — Production endpoints for `streets-v4`, `dataviz-v4-dark`, `outdoor-v4`, `satellite-v4`, and Terrain-RGB.
* **[geocoding-and-services.md](geocoding-and-services.md)** — Forward/reverse geocoding, autocomplete search, static maps, and elevation.

---

> For task-driven implementations with full HTML/CSS/JS, see **[examples/INDEX.md](../examples/INDEX.md)**.
