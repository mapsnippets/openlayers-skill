# OpenLayers Skill Master Reference & Examples Index 📚🌐

This directory contains the authoritative, complete reference and example catalog for **OpenLayers (v9–v10+)**, mapping all **281 official interactive examples** and the **entire OpenLayers API module hierarchy**.

> **Upstream Authority:** All MapTiler basemap styles, tile endpoints, and vector tile schemas conform to the official definitions in the [`maptiler/maptiler-skills`](https://github.com/maptiler/maptiler-skills) reference repository.

---

## 📑 Complete Catalog Architecture

### 🗂️ 1. All 281 Official Examples (Domain Breakdown & Directory):
* **[examples-complete-directory.md](examples-complete-directory.md)** — **Master Directory of all 281 Official Examples (Alphabetical 1–281)**.
* **[examples-webgl-raster-cog.md](examples-webgl-raster-cog.md)** — WebGL, COG, GeoZarr, DEM, NDVI/NDWI math, and WebGL Tile shaders.
* **[examples-drawing-and-interactions.md](examples-drawing-and-interactions.md)** — Draw, Modify, Snap, Trace, Measure, Geodesic, and Topology editing.
* **[examples-vector-and-clustering.md](examples-vector-and-clustering.md)** — GeoJSON, KML, GPX, Point Clustering, Heatmaps, and Decluttering.
* **[examples-vector-tiles-and-mvt.md](examples-vector-tiles-and-mvt.md)** — Vector Tiles (MVT), Mapbox Style JSON, and `geojson-vt` slicing.
* **[examples-ogc-and-enterprise.md](examples-ogc-and-enterprise.md)** — WMS, WMTS, WFS with BBOX strategy, ArcGIS REST, and OGC APIs.
* **[examples-projections-and-reprojection.md](examples-projections-and-reprojection.md)** — Client-side reprojection, Proj4 (LV95, BNG), and Graticules.
* **[examples-animations-and-canvas.md](examples-animations-and-canvas.md)** — Layer swipe, spyglass lens, flight pulse radar rings, and PDF/PNG export.
* **[examples-ui-controls-and-mobile.md](examples-ui-controls-and-mobile.md)** — Custom controls, GPS geolocation, device orientation, and touch gestures.

### 🏛️ 2. Exhaustive API Specifications (All OpenLayers Modules):
* **[api-all-layers.md](api-all-layers.md)** — All 11 Layer Classes (`Tile`, `Vector`, `VectorTile`, `WebGLTile`, `WebGLPoints`, `WebGLVector`, `Heatmap`, `Image`, `VectorImage`, `Group`, `Graticule`).
* **[api-all-sources.md](api-all-sources.md)** — All 21 Source Classes (`XYZ`, `OSM`, `TileWMS`, `ImageWMS`, `WMTS`, `Vector`, `VectorTile`, `Cluster`, `GeoTIFF`, `DataTile`, `Raster`, `SentinelHub`, `UTFGrid`, `IIIF`, `TileArcGISRest`, `ImageArcGISRest`, `OGCMapTile`, `OGCVectorTile`, `ImageStatic`, `Zoomify`).
* **[api-all-formats.md](api-all-formats.md)** — All 12 Format Parsers (`GeoJSON`, `MVT`, `KML`, `GPX`, `TopoJSON`, `WKT`, `WKB`, `GML3`, `EsriJSON`, `IGC`, `Polyline`, `OSMXML`).
* **[api-all-interactions.md](api-all-interactions.md)** — All 18 Interactions (`Draw`, `Modify`, `Select`, `Snap`, `Translate`, `DragBox`, `Extent`, `DragAndDrop`, `Link`, `DragPan`, `DragRotate`, `DragZoom`, `PinchZoom`, `PinchRotate`, `MouseWheelZoom`, `KeyboardPan`, `KeyboardZoom`, `Pointer`).
* **[api-all-controls.md](api-all-controls.md)** — All 10 Control Classes (`Zoom`, `ZoomSlider`, `ZoomToExtent`, `Rotate`, `Attribution`, `ScaleLine`, `FullScreen`, `MousePosition`, `OverviewMap`, `Control` base).
* **[api-map-and-view.md](api-map-and-view.md)** — `ol/Map`, `ol/View`, `ol/Overlay`, view animations, resolutions, and event dictionary.
* **[api-styling-and-renderers.md](api-styling-and-renderers.md)** — `ol/style/Style`, `Fill`, `Stroke`, `Icon`, `Text`, dynamic functions, and Flat Style Expressions.
* **[api-projections-and-geom.md](api-projections-and-geom.md)** — `ol/proj` (`fromLonLat`, `toLonLat`), `proj4` registration, and `ol/geom/*`.

### 🚀 3. Deep Capabilities & Advanced Guides:
* **[advanced-webgl-and-cog.md](advanced-webgl-and-cog.md)** — COG streaming, real-time NDVI calculation, and 100k+ WebGL point sprites.
* **[ogc-wms-wmts-wfs.md](ogc-wms-wmts-wfs.md)** — WMS `GetFeatureInfo`, live WFS BBOX strategy, and high-DPI WMTS.
* **[canvas-effects-and-animations.md](canvas-effects-and-animations.md)** — Split-screen layer swipe, spyglass lens, flight pulse, and PDF export.
* **[spatial-analysis-and-editing.md](spatial-analysis-and-editing.md)** — Boundary tracing (`trace: true`), magnetic snapping, `ol/sphere` geodesic measurements, and Turf.js.
* **[advanced-vector-tiles-and-reprojection.md](advanced-vector-tiles-and-reprojection.md)** — `geojson-vt` client slicing and on-the-fly CRS reprojection.

### 🛠️ 4. Ecosystem & Workflows:
* **[installation-and-cdn.md](installation-and-cdn.md)** — NPM/yarn/bun setup and hosted CDN scripts.
* **[vector-tiles-mapbox-style.md](vector-tiles-mapbox-style.md)** — `ol-mapbox-style` (`apply`).
* **[frameworks.md](frameworks.md)** — React (`useRef`/`useEffect`), Next.js App Router SSR fix, Svelte, and Vue 3.
* **[patterns-gotchas.md](patterns-gotchas.md)** — Solutions for the top 10 OpenLayers bugs (Null Island coordinates, projection mismatch).
* **[prompt-benchmarks.md](prompt-benchmarks.md)** — 10 practical prompt benchmarks for evaluation.
* **[vector-tile-schemas.md](vector-tile-schemas.md)** — Full 9-schema vector catalog (`Planet v4`, `Outdoor`, `Contours`, `3D Buildings`, `Ocean`, `Cadastre`).
* **[basemaps-and-terrain.md](basemaps-and-terrain.md)** — Production endpoints for `streets-v4`, `outdoor-v4`, `satellite-v4`.
* **[geocoding-and-services.md](geocoding-and-services.md)** — Forward/reverse geocoding, autocomplete search, static maps, and elevation.
