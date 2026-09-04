# OpenLayers Skill References Index 📚🗺️

> The authoritative catalog of API specifications, architecture guides, and official atomic examples for building enterprise web mapping applications with **OpenLayers (v9–v10+)**.

---

## ⚡ Fast Search Prefix Conventions

When searching for specific topics, use file prefix routing to locate the exact reference without context window overhead:

| Topic Area | File Prefix / Pattern | Description |
| :--- | :--- | :--- |
| **Core APIs & Architecture** | `api-*` | Deep specs on Map, View, Layers, Sources, Interactions, Styling, and Projections. |
| **Official Atomic Examples** | `examples-openlayers-*` | 12 complete, production-tested examples extracted directly from official OpenLayers docs. |
| **Advanced GIS & WebGL** | `spatial-*`, `advanced-*`, `ogc-*` | Snapping, boundary tracing, WebGL COG shaders, WMS/WFS, reprojection, and canvas animations. |
| **Frameworks & Production** | `frameworks.md`, `patterns-*`, `basemaps-*` | React, Next.js, Vue, Svelte, anti-pattern guides, and Planet v4 endpoints. |

---

## 📑 Complete Reference Catalog

### 🏛️ 1. Core API Specifications & Architecture
* **[api-map-and-view.md](api-map-and-view.md)** — Complete guide to `ol/Map`, `ol/View`, `ol/Overlay`, view animations, resolutions, extent constraints, and map event lifecycles.
* **[api-layers-and-sources.md](api-layers-and-sources.md)** — Exhaustive guide to `TileLayer`, `VectorLayer`, `VectorTileLayer`, `VectorImageLayer`, `Heatmap`, `LayerGroup`, `VectorSource`, `Cluster`, and `XYZ`.
* **[api-interactions-and-controls.md](api-interactions-and-controls.md)** — Full reference for `Draw`, `Modify`, `Snap`, `Select`, `Translate`, `DragBox`, `DragAndDrop`, `Link`, built-in UI controls, and subclassing `ol/control/Control`.
* **[api-styling-and-renderers.md](api-styling-and-renderers.md)** — `ol/style/Style`, `Fill`, `Stroke`, `Icon`, `Text`, `CircleStyle`, `RegularShape`, multi-pass road casings, dynamic style functions, and modern Flat Style Expressions.
* **[api-projections-and-geom.md](api-projections-and-geom.md)** — Coordinate conversions (`fromLonLat`, `toLonLat`), custom `proj4` registration (Swiss LV95, British National Grid), and `ol/geom/*` geometry classes.

### 🧪 2. Official Production Examples (`examples-openlayers-*`)
* **[examples-openlayers-basic-vector-map.md](examples-openlayers-basic-vector-map.md)** — Map, View, TileLayer, and `ol-mapbox-style` vector tiles with MapTiler Streets v4.
* **[examples-openlayers-geojson-choropleth.md](examples-openlayers-geojson-choropleth.md)** — GeoJSON vector layer, dynamic data-driven style functions, HTML legend, and hover highlight.
* **[examples-openlayers-draw-modify-snap.md](examples-openlayers-draw-modify-snap.md)** — Interactive GIS editing with `Draw`, `Modify`, and `Snap` vertex magnetic snapping.
* **[examples-openlayers-clustering.md](examples-openlayers-clustering.md)** — High-performance point aggregation via `ol/source/Cluster`, dynamic badge radius, and click zoom.
* **[examples-openlayers-popup-overlay.md](examples-openlayers-popup-overlay.md)** — `ol/Overlay` card anchoring, closer button, coordinate formatting, and `autoPan` animation.
* **[examples-openlayers-measure-distance-area.md](examples-openlayers-measure-distance-area.md)** — Geodesic distance and surface area measurement tool using `ol/sphere`.
* **[examples-openlayers-layer-swipe.md](examples-openlayers-layer-swipe.md)** — Split-screen layer swipe comparison using HTML5 Canvas `prerender` / `postrender` clipping.
* **[examples-openlayers-wms-getfeatureinfo.md](examples-openlayers-wms-getfeatureinfo.md)** — Enterprise OGC `TileWMS` integration with coordinate click `getFeatureInfoUrl` queries.
* **[examples-openlayers-vector-tile-selection.md](examples-openlayers-vector-tile-selection.md)** — Interactive feature selection and dynamic highlighting inside binary MVT vector tiles.
* **[examples-openlayers-heatmaps.md](examples-openlayers-heatmaps.md)** — Continuous density gradient heatmaps via `ol/layer/Heatmap` with radius and blur tuning.
* **[examples-openlayers-drag-and-drop.md](examples-openlayers-drag-and-drop.md)** — Client-side drag-and-drop loader parsing local `.geojson`, `.gpx`, and `.kml` files.
* **[examples-openlayers-url-link-sync.md](examples-openlayers-url-link-sync.md)** — Bidirectional URL synchronization for map center, zoom, and rotation with `ol/interaction/Link`.

### 🚀 3. Advanced Geospatial Capabilities
* **[spatial-analysis-and-editing.md](spatial-analysis-and-editing.md)** — Precision drawing, live polygon boundary tracing (`trace: true`), magnetic snapping, and Turf.js spatial analysis.
* **[advanced-webgl-and-cog.md](advanced-webgl-and-cog.md)** — Cloud-Optimized GeoTIFF (COG) ingestion, real-time NDVI band math in WebGL fragment shaders, and 100k+ WebGL point sprites.
* **[ogc-wms-wmts-wfs.md](ogc-wms-wmts-wfs.md)** — Enterprise OGC services: Tiled vs Single-Image WMS, interactive `GetFeatureInfo`, streaming WFS with BBOX loading strategy, and WMTS capabilities parsing.
* **[advanced-vector-tiles-and-reprojection.md](advanced-vector-tiles-and-reprojection.md)** — Client-side `geojson-vt` tile slicing and on-the-fly raster/vector coordinate reprojection.
* **[canvas-effects-and-animations.md](canvas-effects-and-animations.md)** — Split-screen layer swipe comparisons, magnifying spyglass lens, flight pulse rings, and high-resolution PDF/PNG exports.

### 🛠️ 4. Ecosystem, Frameworks & Best Practices
* **[installation-and-cdn.md](installation-and-cdn.md)** — Package manager installations (NPM, pnpm, yarn, bun) and hosted CDN script tag bundles.
* **[vector-tiles-mapbox-style.md](vector-tiles-mapbox-style.md)** — `ol-mapbox-style` integration (`apply`), vector tile basemaps, and runtime styling.
* **[frameworks.md](frameworks.md)** — React (`useRef`/`useEffect`), Next.js App Router SSR safety, Svelte (`bind:this`), and Vue 3 integrations.
* **[events.md](events.md)** — Exhaustive dictionary of OpenLayers map, layer, source, geometry, and pointer events.
* **[patterns-gotchas.md](patterns-gotchas.md)** — Solutions for the top 10 OpenLayers anti-patterns (Null Island, projection mismatches, memory leaks on unmount).
* **[prompt-benchmarks.md](prompt-benchmarks.md)** — 10 comprehensive architectural prompt benchmarks with evaluation rubrics.
* **[basemaps-and-terrain.md](basemaps-and-terrain.md)** — Production basemap style URLs (`streets-v4`, `outdoor-v4`, `satellite-v4`, `dataviz-v4-dark`), high-DPI raster XYZ endpoints, and shaded relief hillshades.
* **[geocoding-and-services.md](geocoding-and-services.md)** — Direct REST API specifications for forward/reverse geocoding, autocomplete search, static maps, and elevation lookups.
* **[vector-tile-schemas.md](vector-tile-schemas.md)** — Complete 9-schema vector catalog (`Planet v4`, `Outdoor`, `Contours`, `3D Buildings`, `Ocean`, `Cadastre`, `Landcover`).
