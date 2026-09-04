# OpenLayers Official Examples Catalog (150+ Interactive Patterns)

Source: https://openlayers.org/en/latest/examples/

This master reference catalogs the official OpenLayers example suite, classified by functional domain.

---

## 📑 Domain Classification & Example Recipes

### 1. WebGL & Advanced Raster Analytics
* `cog.html` / `cog-math.html` — Cloud-Optimized GeoTIFF streaming and real-time NDVI math calculation.
* `cog-stretch.html` / `geozarr-stretch.html` — Band contrast stretching and multi-spectral band selection.
* `geozarr.html` / `geozarr-dimensions.html` — Sentinel-1/Sentinel-2 4D time-cube exploration.
* `webgl-points-layer.html` / `filter-points-webgl.html` — Rendering 100,000+ points with GPU filtering.
* `webgl-shaded-relief.html` / `contour-interpolation.html` — WebGL hillshade and DEM contour generation.
* `webgl-sea-level.html` — Interactive sea level flood simulation using WebGL expressions.

### 2. Geometry Editing, Drawing & Snapping
* `draw-and-modify-features.html` — Simultaneous Draw and Modify interaction chaining.
* `draw-modify-trace-snap.html` — Boundary tracing around adjacent polygon topologies.
* `measure.html` / `measure-style.html` — Dynamic geodesic length and area measurement tooltips.
* `draw-and-modify-geodesic.html` — True geodesic circles taking Earth curvature into account.
* `snap.html` / `snap-custom-segmenter.html` — Magnetic vertex snapping and midpoint division.
* `modify-scale-and-rotate.html` — Transform and rotate geometries with modifier keys.

### 3. Spatial Point Aggregation & Visualizations
* `cluster.html` / `clusters-dynamic.html` — `ol/source/Cluster` with convex hull previews and spiderfy.
* `heatmap-earthquakes.html` / `heatmap-trajectories.html` — WebGL canvas heatmaps for point and line densities.
* `animated-gif.html` / `icon-color.html` — Animated GIF pins and dynamic icon tinting.
* `feature-animation.html` / `flight-animation.html` — Pulsing radar rings and geodesic flight paths.

### 4. Vector Tiles & Formats
* `mapbox-style.html` — `ol-mapbox-style` vector rendering with MapTiler / MapLibre style JSON.
* `geojson-vt.html` — On-the-fly client-side vector tile slicing for 50MB+ datasets.
* `drag-and-drop.html` / `drag-and-drop-custom-kmz.html` — Native drag-and-drop ingestion for GPX, GeoJSON, KML, and KMZ.
* `vector-tile-selection.html` / `vector-tile-info.html` — Interrogating and highlighting features in vector tiles.

### 5. OGC Standards & Enterprise GIS
* `wms-tiled.html` / `wms-image.html` — Tiled and single-image WMS layer architectures.
* `getfeatureinfo-tile.html` / `getfeatureinfo-image.html` — Interactive WMS feature queries.
* `vector-wfs.html` / `vector-wfs-getfeature.html` — Live WFS vector layers with BBOX server strategy.
* `ogc-map-tiles.html` / `ogc-vector-tiles.html` — OGC API - Tiles and Features standards.

### 6. Canvas Effects & Layer Manipulation
* `layer-swipe.html` / `webgl-layer-swipe.html` — Side-by-side swipe comparison sliders.
* `layer-spy.html` / `magnify.html` — Circular spyglass lens revealing hidden raster layers.
* `export-map.html` / `export-pdf.html` — High-DPI canvas export to PNG and multi-page PDF documents.
* `color-manipulation.html` / `image-filter.html` — Canvas hue, lightness, and grayscale filters.

### 7. Projections & Spatial Analysis
* `reprojection.html` / `reprojection-by-code.html` — Client-side on-the-fly raster and vector reprojection.
* `equal-earth-geojson.html` / `sphere-mollweide.html` — Equal Earth and Mollweide global maps with graticules.
* `turf.html` / `jsts.html` — Spatial buffering, intersections, Voronoi polygons, and convex hulls.
