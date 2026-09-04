# OpenLayers Skill References Index 📚🗺️

> The authoritative catalog of declarative API specifications, architecture guides, and schema references for building enterprise web mapping applications with **OpenLayers (v9–v10+)**.

---

## ⚡ Fast Search Prefix Conventions

When searching for specific topics, use file prefix routing to locate the exact reference without context window overhead:

| Topic Area | Directory / Prefix | Description |
| :--- | :--- | :--- |
| **Official Task Examples** | `examples/` | 40 complete, production-tested recipes categorized in [examples/INDEX.md](../examples/INDEX.md). |
| **Core APIs & Architecture** | `references/api-*` | Deep specs on Map, View, Layers, Sources, Interactions, Styling, and Projections. |
| **Advanced GIS & WebGL** | `references/spatial-*`, `advanced-*`, `ogc-*` | Snapping, boundary tracing, WebGL COG shaders, WMS/WMTS/WFS, reprojection, and canvas animations. |
| **Frameworks & Production** | `references/frameworks.md`, `patterns-*`, `basemaps-*` | React, Next.js, Vue, Svelte, anti-pattern guides, and Planet v4 endpoints. |

---

## 📑 Complete Reference Catalog

### 🏛️ 1. Core API Specifications & Architecture
* **[api-map-and-view.md](api-map-and-view.md)** — Complete guide to `ol/Map`, `ol/View`, `ol/Overlay`, view animations, resolutions, extent constraints, and map event lifecycles.
* **[api-layers-and-sources.md](api-layers-and-sources.md)** — Exhaustive guide to `TileLayer`, `VectorLayer`, `VectorTileLayer`, `VectorImageLayer`, `Heatmap`, `LayerGroup`, `VectorSource`, `Cluster`, and `XYZ`.
* **[api-interactions-and-controls.md](api-interactions-and-controls.md)** — Full reference for `Draw`, `Modify`, `Snap`, `Select`, `Translate`, `DragBox`, `DragAndDrop`, `Link`, built-in UI controls, and subclassing `ol/control/Control`.
* **[api-styling-and-renderers.md](api-styling-and-renderers.md)** — `ol/style/Style`, `Fill`, `Stroke`, `Icon`, `Text`, `CircleStyle`, `RegularShape`, multi-pass road casings, dynamic style functions, and modern Flat Style Expressions.
* **[api-projections-and-geom.md](api-projections-and-geom.md)** — Coordinate conversions (`fromLonLat`, `toLonLat`), custom `proj4` registration (Swiss LV95, British National Grid), and `ol/geom/*` geometry classes.

### 🚀 2. Advanced Geospatial Capabilities
* **[spatial-analysis-and-editing.md](spatial-analysis-and-editing.md)** — Precision drawing, live polygon boundary tracing (`trace: true`), magnetic snapping, and Turf.js spatial analysis.
* **[advanced-webgl-and-cog.md](advanced-webgl-and-cog.md)** — Cloud-Optimized GeoTIFF (COG) ingestion, real-time NDVI band math in WebGL fragment shaders, and 100k+ WebGL point sprites.
* **[ogc-wms-wmts-wfs.md](ogc-wms-wmts-wfs.md)** — Enterprise OGC services: Tiled vs Single-Image WMS, interactive `GetFeatureInfo`, streaming WFS with BBOX loading strategy, and WMTS capabilities parsing.
* **[advanced-vector-tiles-and-reprojection.md](advanced-vector-tiles-and-reprojection.md)** — Client-side `geojson-vt` tile slicing and on-the-fly raster/vector coordinate reprojection.
* **[canvas-effects-and-animations.md](canvas-effects-and-animations.md)** — Split-screen layer swipe comparisons, magnifying spyglass lens, flight pulse rings, and high-resolution PDF/PNG exports.

### 🛠️ 3. Ecosystem, Frameworks & Best Practices
* **[installation-and-cdn.md](installation-and-cdn.md)** — Package manager installations (NPM, pnpm, yarn, bun) and hosted CDN script tag bundles.
* **[vector-tiles-mapbox-style.md](vector-tiles-mapbox-style.md)** — `ol-mapbox-style` integration (`apply`), vector tile basemaps, and runtime styling.
* **[frameworks.md](frameworks.md)** — React (`useRef`/`useEffect`), Next.js App Router SSR safety, Svelte (`bind:this`), and Vue 3 integrations.
* **[events.md](events.md)** — Exhaustive dictionary of OpenLayers map, layer, source, geometry, and pointer events.
* **[patterns-gotchas.md](patterns-gotchas.md)** — Solutions for the top 10 OpenLayers anti-patterns (Null Island, projection mismatches, memory leaks on unmount).
* **[prompt-benchmarks.md](prompt-benchmarks.md)** — 10 comprehensive architectural prompt benchmarks with evaluation rubrics.
* **[basemaps-and-terrain.md](basemaps-and-terrain.md)** — Production basemap style URLs (`streets-v4`, `outdoor-v4`, `satellite-v4`, `dataviz-v4-dark`), high-DPI raster XYZ endpoints, and shaded relief hillshades.
* **[geocoding-and-services.md](geocoding-and-services.md)** — Direct REST API specifications for forward/reverse geocoding, autocomplete search, static maps, and elevation lookups.
* **[vector-tile-schemas.md](vector-tile-schemas.md)** — Complete 9-schema vector catalog (`Planet v4`, `Outdoor`, `Contours`, `3D Buildings`, `Ocean`, `Cadastre`, `Landcover`).

---

> For task-driven implementations with full HTML/CSS/JS, see **[examples/INDEX.md](../examples/INDEX.md)**.
