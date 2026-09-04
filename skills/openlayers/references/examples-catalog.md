# OpenLayers Recipe Catalog & API Cross-Reference 📚🛠️

> An encyclopedic technical directory connecting every OpenLayers API class, layer, and interaction directly to its verified, production-grade standalone recipe in `skills/examples/`. Engineered with modern MapTiler Planet v4 styles.

---

## 1. Vector Formats, MVT & Cartography

| Task & Architecture | Primary APIs & Techniques | Production Recipe |
| :--- | :--- | :--- |
| **Vector Tiles Basemap** | `ol-mapbox-style`, `VectorTileLayer`, MapTiler `streets-v4`. | [`basic-vector-map.md`](../examples/basic-vector-map.md) |
| **GeoJSON Choropleth** | Dynamic style function, legend, hover highlight. | [`geojson-choropleth.md`](../examples/geojson-choropleth.md) |
| **KML Earthquakes** | Parsing KML data and scaling circles by seismic magnitude. | [`kml-earthquakes.md`](../examples/kml-earthquakes.md) |
| **GPX Track Viewer** | Ingesting GPS tracks and waypoints with custom styles. | [`gpx-track-viewer.md`](../examples/gpx-track-viewer.md) |
| **TopoJSON Layer** | Compressed topological administrative boundaries. | [`topojson-layer.md`](../examples/topojson-layer.md) |
| **FlatGeobuf Loading** | Streaming indexed binary FlatGeobuf files with spatial BBOX. | [`flatgeobuf-loading.md`](../examples/flatgeobuf-loading.md) |
| **Esri REST FeatureServer** | Querying ArcGIS REST FeatureServer with BBOX strategy. | [`esri-rest-feature-service.md`](../examples/esri-rest-feature-service.md) |
| **MVT Feature Inspection** | Interactive selection inside binary vector tiles. | [`vector-tile-selection.md`](../examples/vector-tile-selection.md) |
| **Flat Style Expressions** | Client-side Flat Style expressions on raw MVT tiles. | [`vector-tile-styling-mvt.md`](../examples/vector-tile-styling-mvt.md) |
| **Advanced Flat Expressions**| `interpolate`, `match`, and `case` expressions on MVT. | [`vector-tile-style-expressions.md`](../examples/vector-tile-style-expressions.md) |
| **Drag & Drop Loader** | Client-side drag-and-drop parsing `.geojson`, `.gpx`, `.kml`. | [`drag-and-drop.md`](../examples/drag-and-drop.md) |

---

## 2. Projections & Advanced Datums

| Task & Architecture | Primary APIs & Techniques | Production Recipe |
| :--- | :--- | :--- |
| **Swiss LV95 (EPSG:2056)** | Proj4js registration, Swiss National Grid extent bounding. | [`reprojection-proj4js-swiss.md`](../examples/reprojection-proj4js-swiss.md) |
| **British Grid (EPSG:27700)**| British National Grid reprojection with Proj4js. | [`reprojection-proj4js-bng.md`](../examples/reprojection-proj4js-bng.md) |
| **WGS 84 Vector Tiles** | Vector tiles reprojected in Plate Carrée (`EPSG:4326`). | [`vector-tiles-epsg4326.md`](../examples/vector-tiles-epsg4326.md) |
| **Graticule Grid Lines** | Latitude/longitude coordinate grid overlay with labels. | [`graticule-grid-overlay.md`](../examples/graticule-grid-overlay.md) |

---

## 3. Digitization & GIS Interactions

| Task & Architecture | Primary APIs & Techniques | Production Recipe |
| :--- | :--- | :--- |
| **Draw, Modify & Snap** | Precision vector CAD digitization with magnetic vertices. | [`draw-modify-snap.md`](../examples/draw-modify-snap.md) |
| **Freehand & Bounding Boxes**| Digitizing boxes, regular stars, and freehand sketches. | [`draw-freehand-and-shapes.md`](../examples/draw-freehand-and-shapes.md) |
| **Regular Polygons & Stars** | `createRegularPolygon` generating geometric shapes. | [`draw-regular-polygons-stars.md`](../examples/draw-regular-polygons-stars.md) |
| **Scale & Rotate Geometries**| Interactive feature scaling and rotation handles. | [`modify-scale-rotate.md`](../examples/modify-scale-rotate.md) |
| **Rubber-Band Box Select** | Marquee bounding box selection via `DragBox`. | [`box-selection.md`](../examples/box-selection.md) |
| **Hover vs Click Select** | Configuring selection triggers and feature highlights. | [`select-hover-click.md`](../examples/select-hover-click.md) |
| **Translate Geometries** | Repositioning and dragging vector geometries. | [`translate-features.md`](../examples/translate-features.md) |
| **Extent Crop Interaction** | Interactive spatial cropping with bounding box handles. | [`extent-interaction.md`](../examples/extent-interaction.md) |
| **Mobile Hit Tolerance** | Configurable pixel hit-detection tolerance for touch. | [`hit-tolerance-touch.md`](../examples/hit-tolerance-touch.md) |
| **Pinch Zoom & Rotate** | Touch pinch zoom, kinetic pan, and two-finger rotate. | [`pinch-zoom-rotate.md`](../examples/pinch-zoom-rotate.md) |
| **Turf.js Spatial Analysis** | Buffer, convex hull, and spatial operations with Turf.js. | [`turf-spatial-operations.md`](../examples/turf-spatial-operations.md) |

---

## 4. Clustering, Heatmaps & Dense WebGL

| Task & Architecture | Primary APIs & Techniques | Production Recipe |
| :--- | :--- | :--- |
| **High-Performance Cluster** | Point clustering via `ol/source/Cluster` and animated zoom. | [`clustering.md`](../examples/clustering.md) |
| **Cluster Spiderfy** | Animated spiderfy and spiral expansion on overlapping points.| [`cluster-animated-expansion.md`](../examples/cluster-animated-expansion.md) |
| **Continuous Heatmaps** | Density gradient heatmaps via `ol/layer/Heatmap`. | [`heatmaps.md`](../examples/heatmaps.md) |
| **100,000+ WebGL Points** | GPU point rendering at 60 FPS via `ol/layer/WebGLPoints`. | [`webgl-points-100k.md`](../examples/webgl-points-100k.md) |
| **WebGL Line Filtering** | Real-time WebGL line rendering and dynamic attribute filters.| [`webgl-line-filter.md`](../examples/webgl-line-filter.md) |
| **WebGL Icon Sprites** | Thousands of icon markers using GPU sprite sheets. | [`webgl-icon-sprites.md`](../examples/webgl-icon-sprites.md) |

---

## 5. Enterprise OGC Services

| Task & Architecture | Primary APIs & Techniques | Production Recipe |
| :--- | :--- | :--- |
| **Tiled WMS Layer** | Standardized OGC `TileWMS` with custom caching. | [`wms-tiled.md`](../examples/wms-tiled.md) |
| **Single-Image WMS** | Untiled dynamic server rendering via `ImageWMS`. | [`wms-single-image.md`](../examples/wms-single-image.md) |
| **WMS GetFeatureInfo** | Spatial coordinate click queries with `getFeatureInfoUrl`. | [`wms-getfeatureinfo.md`](../examples/wms-getfeatureinfo.md) |
| **WMTS Matrix Sets** | Standardized OGC WMTS with predefined matrix sets. | [`wmts-layer.md`](../examples/wmts-layer.md) |
| **WFS BBOX Streaming** | Direct vector streaming from WFS using BBOX strategy. | [`wfs-bbox-loading.md`](../examples/wfs-bbox-loading.md) |
| **WFS GetFeature Filter** | WFS POST requests with OGC XML spatial & attribute filters.| [`wfs-getfeature-attribute-filter.md`](../examples/wfs-getfeature-attribute-filter.md) |

---

## 6. Raster, WebGL, COG & GeoZarr

| Task & Architecture | Primary APIs & Techniques | Production Recipe |
| :--- | :--- | :--- |
| **Retina 512px Tiles** | Crisp HiDPI `@2x` raster tiles with `tilePixelRatio: 2`. | [`xyz-retina-hidpi.md`](../examples/xyz-retina-hidpi.md) |
| **Cloud-Optimized GeoTIFF** | Direct COG streaming via HTTP Range requests. | [`cog-geotiff-rendering.md`](../examples/cog-geotiff-rendering.md) |
| **COG Auto Projection** | COG raster ingestion with automatic projection detection. | [`cog-automatic-projection.md`](../examples/cog-automatic-projection.md) |
| **GPU NDVI Band Math** | Real-time NDVI calculation from Sentinel-2 bands. | [`cog-ndvi-band-math.md`](../examples/cog-ndvi-band-math.md) |
| **GeoZarr Earth Observation**| Cloud-native GeoZarr climate array rendering. | [`geozarr-earth-observation.md`](../examples/geozarr-earth-observation.md) |
| **Raster Pixel Operations** | Elevation & slope thresholding via `ol/source/Raster`. | [`raster-source-pixel-operations.md`](../examples/raster-source-pixel-operations.md) |
| **WebGL Contrast Stretch** | Dynamic band contrast curves on WebGLTile layers. | [`webgl-tile-contrast-stretch.md`](../examples/webgl-tile-contrast-stretch.md) |
| **WebGL Layer Swipe** | Hardware-accelerated WebGL tile layer swipe slider. | [`multi-layer-swipe-webgl.md`](../examples/multi-layer-swipe-webgl.md) |
| **Canvas Layer Swipe** | Split-screen comparison slider via canvas clipping. | [`layer-swipe.md`](../examples/layer-swipe.md) |
| **Magnifier Spyglass Lens** | Circular magnifying glass lens following mouse pointer. | [`spyglass-magnifier.md`](../examples/spyglass-magnifier.md) |
| **Color Manipulation** | Real-time hue, saturation, and contrast adjustment. | [`color-manipulation-raster.md`](../examples/color-manipulation-raster.md) |

---

## 7. UI Controls & Navigation

| Task & Architecture | Primary APIs & Techniques | Production Recipe |
| :--- | :--- | :--- |
| **Popup Overlay** | Anchored DOM bubble with closer button and `autoPan`. | [`popup-overlay.md`](../examples/popup-overlay.md) |
| **Distance & Area Measure** | Geodesic distance and area measurement with `ol/sphere`. | [`measure-distance-area.md`](../examples/measure-distance-area.md) |
| **URL Link Sync** | Bidirectional URL query synchronization for center & zoom. | [`url-link-sync.md`](../examples/url-link-sync.md) |
| **Flight Animation** | Cinematic camera flight arcs with bounce easing. | [`fly-to-camera-animation.md`](../examples/fly-to-camera-animation.md) |
| **Marker Along Route** | Smooth 60 FPS marker translation along a route. | [`feature-move-animation.md`](../examples/feature-move-animation.md) |
| **Synchronized Dual Maps** | Two side-by-side maps sharing a single `View` instance. | [`shared-dual-views-side-by-side.md`](../examples/shared-dual-views-side-by-side.md) |
| **FullScreen & Rotate** | FullScreen API control combined with `DragRotateAndZoom`. | [`fullscreen-drag-rotate-zoom.md`](../examples/fullscreen-drag-rotate-zoom.md) |
| **Overview Mini-Map** | Secondary mini-map context control. | [`overview-map-control.md`](../examples/overview-map-control.md) |
| **Scale Bar Units** | Dynamic scale bar supporting metric, imperial, nautical. | [`scale-line-units.md`](../examples/scale-line-units.md) |
| **Custom Basemap Switcher** | Custom UI control toggling between Planet v4 basemaps. | [`layer-switcher-custom.md`](../examples/layer-switcher-custom.md) |
| **High-DPI PDF/PNG Export** | Exporting high-DPI canvas prints to PNG and PDF. | [`export-map-pdf-png.md`](../examples/export-map-pdf-png.md) |
