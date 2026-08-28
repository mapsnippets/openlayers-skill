# OpenLayers Official Examples — ⚡ WebGL, COG & Raster Analytics

Cloud-Optimized GeoTIFF (COG), GeoZarr, DEM, NDVI/NDWI math, WebGL Tile shaders, and 100k+ WebGL Points.

**Total Interactive Demos in this Category:** `76`

---

| Example | Official Demo URL | Description | Tags |
| :--- | :--- | :--- | :--- |
| **Advanced View Positioning** | [`center.html`](https://openlayers.org/en/latest/examples/center.html) | This example demonstrates how a map's view can be adjusted so a geometry or coordinate is positioned at a specific pixel location. | `center`, `rotation`, `openstreetmap` |
| **Applying a filter along lines rendered with WebGL** | [`filter-webgl-line.html`](https://openlayers.org/en/latest/examples/filter-webgl-line.html) | Example showing how filtering a line using the M parameter is represented with the WebGL renderer | `draw`, `vector`, `webgl`, `line`, `line-metric` |
| **Band Contrast Stretch** | [`cog-stretch.html`](https://openlayers.org/en/latest/examples/cog-stretch.html) | Choosing bands and applying contrast stretch | `cog`, `webgl`, `style` |
| **Band Selection and Contrast Stretch** | [`geozarr-stretch.html`](https://openlayers.org/en/latest/examples/geozarr-stretch.html) | Choosing bands and applying contrast stretch | `geozarr`, `zarr`, `style` |
| **Change Tile Layer Style** | [`cog-style.html`](https://openlayers.org/en/latest/examples/cog-style.html) | Updating the style of a WebGL tile layer | `cog`, `webgl`, `style` |
| **Cloud Optimized GeoTIFF (COG)** | [`cog.html`](https://openlayers.org/en/latest/examples/cog.html) | Rendering a COG as a tiled layer. | `cog` |
| **Cloud Optimized GeoTIFF (COG) from a Blob** | [`cog-blob.html`](https://openlayers.org/en/latest/examples/cog-blob.html) | Rendering a COG as a tiled layer from a Blob. | `cog` |
| **Cloud Optimized GeoTIFF (COG) with Custom Loader** | [`cog-custom-client.html`](https://openlayers.org/en/latest/examples/cog-custom-client.html) | Rendering a COG with a custom loader function. | `cog` |
| **COG with automatic Projection Lookup** | [`cog-projection.html`](https://openlayers.org/en/latest/examples/cog-projection.html) | Rendering a COG over another layer in a different projection. | `cog`, `projection`, `proj4js`, `maptiler` |
| **COG with ModelTransformation** | [`cog-modeltransformation.html`](https://openlayers.org/en/latest/examples/cog-modeltransformation.html) | COG with ModelTransformation. | `cog`, `projection`, `ModelTransformation` |
| **Color Manipulation** | [`color-manipulation.html`](https://openlayers.org/en/latest/examples/color-manipulation.html) | Demonstrates color manipulation with a raster source. | `color`, `hue`, `lightness`, `chroma` |
| **Custom Animation** | [`feature-animation.html`](https://openlayers.org/en/latest/examples/feature-animation.html) | Demonstrates how to animate features. | `animation`, `vector`, `feature`, `flash` |
| **Draw lines rendered with WebGL** | [`webgl-draw-line.html`](https://openlayers.org/en/latest/examples/webgl-draw-line.html) | Example showing how stroke styling options are represented with the WebGL renderer | `draw`, `vector`, `webgl`, `line`, `dash` |
| **Earthquake Clusters** | [`earthquake-clusters.html`](https://openlayers.org/en/latest/examples/earthquake-clusters.html) | Demonstrates the use of style geometries to render source features of a cluster. | `KML`, `vector`, `style`, `geometry`, `cluster` |
| **Earthquakes Heatmap** | [`heatmap-earthquakes.html`](https://openlayers.org/en/latest/examples/heatmap-earthquakes.html) | Demonstrates the use of a heatmap layer. | `heatmap`, `kml`, `vector`, `style`, `webgl` |
| **Earthquakes in KML** | [`kml-earthquakes.html`](https://openlayers.org/en/latest/examples/kml-earthquakes.html) | Demonstrates the use of a Shape symbolizer to render earthquake locations. | `KML`, `vector`, `style`, `tooltip` |
| **Earthquakes with custom symbols** | [`earthquake-custom-symbol.html`](https://openlayers.org/en/latest/examples/earthquake-custom-symbol.html) | Demonstrates the use of `toContext` to create custom icon symbols. | `KML`, `vector`, `style`, `canvas`, `symbol` |
| **Filtering features with WebGL** | [`filter-points-webgl.html`](https://openlayers.org/en/latest/examples/filter-points-webgl.html) | Using WebGL to filter large quantities of features | `webgl`, `icon`, `sprite`, `filter`, `feature` |
| **Flight Animation** | [`flight-animation.html`](https://openlayers.org/en/latest/examples/flight-animation.html) | Demonstrates how to animate flights with ´postrender´. | `animation`, `vector`, `feature`, `flights`, `arc` |
| **GeoTIFF per band statistics** | [`geotiff-per-band-stats.html`](https://openlayers.org/en/latest/examples/geotiff-per-band-stats.html) | Demonstrates how a GeoTIFF can be rendered with different min and max values for each band. | `geotiff`, `statistics`, `visualization` |
| **GeoTIFF Reprojection** | [`geotiff-reprojection.html`](https://openlayers.org/en/latest/examples/geotiff-reprojection.html) | Demonstrates how a GeoTIFF can be rendered in a different projection. | `cog`, `geotiff`, `reprojection`, `utm` |
| **GeoTIFF tile pyramid** | [`cog-pyramid.html`](https://openlayers.org/en/latest/examples/cog-pyramid.html) | Rendering a COG tile pyramid as layer group. | `cog`, `tilepyramid`, `stac` |
| **GeoTIFF with Overviews** | [`cog-overviews.html`](https://openlayers.org/en/latest/examples/cog-overviews.html) | Rendering a GeoTIFF with external overviews as a layer. | `cog`, `overview` |
| **GeoZarr** | [`geozarr.html`](https://openlayers.org/en/latest/examples/geozarr.html) | A GeoZarr source displaying Sentinel-2 imagery. | `zarr`, `geozarr`, `sentinel-2` |
| **GeoZarr dimensions** | [`geozarr-dimensions.html`](https://openlayers.org/en/latest/examples/geozarr-dimensions.html) | Stepping through the time dimension of a GeoZarr cube with a slider. | `zarr`, `geozarr`, `sentinel-1`, `time`, `dimensions` |
| **GeoZarr Multi-Group** | [`geozarr-groups.html`](https://openlayers.org/en/latest/examples/geozarr-groups.html) | Cloud-masked Sentinel-2 imagery using bands from multiple Zarr groups. | `zarr`, `geozarr`, `sentinel-2`, `cloud`, `masking` |
| **GeoZarr Resampling** | [`geozarr-sparse.html`](https://openlayers.org/en/latest/examples/geozarr-sparse.html) | A GeoZarr source displaying Sentinel-2 imagery with resampling. | `zarr`, `geozarr`, `sentinel-2` |
| **GeoZarr storytelling** | [`geozarr-storytelling.html`](https://openlayers.org/en/latest/examples/geozarr-storytelling.html) | Exploring Sentinel-1 event scenarios across orbit groups and time in GeoZarr cubes. | `zarr`, `geozarr`, `sentinel-1`, `time`, `dimensions` |
| **Icon Colors** | [`icon-color.html`](https://openlayers.org/en/latest/examples/icon-color.html) | Example assigning a custom color to an icon | `vector`, `style`, `icon`, `marker` |
| **Icon Pixel Operations** | [`icon-negative.html`](https://openlayers.org/en/latest/examples/icon-negative.html) | Canvas pixel operations on a point icon. | `vector`, `style`, `icon`, `marker`, `canvas` |
| **Icon Sprites with WebGL** | [`icon-sprite-webgl.html`](https://openlayers.org/en/latest/examples/icon-sprite-webgl.html) | Rendering many icons with WebGL | `webgl`, `icon`, `sprite`, `point`, `ufo` |
| **IGN WMTS** | [`wmts-ign.html`](https://openlayers.org/en/latest/examples/wmts-ign.html) | Demonstrates displaying IGN (France) WMTS layers. | `french`, `ign`, `geoportail`, `wmts`, `grid` |
| **Image Reprojection** | [`reprojection-image.html`](https://openlayers.org/en/latest/examples/reprojection-image.html) | Demonstrates client-side reprojection of single image source. | `reprojection`, `projection`, `proj4js`, `image`, `imagestatic` |
| **Interpolating Contours from a DEM** | [`contour-interpolation.html`](https://openlayers.org/en/latest/examples/contour-interpolation.html) | Example of WebGL data interpolation | `image-interpolation`, `contours`, `raster`, `mouse-position`, `mapzen` |
| **Layer Swipe (WebGL)** | [`webgl-layer-swipe.html`](https://openlayers.org/en/latest/examples/webgl-layer-swipe.html) | Cropping a WebGL tile layer | `swipe`, `webgl` |
| **Map Export** | [`export-map.html`](https://openlayers.org/en/latest/examples/export-map.html) | Export a map as a GeoTIFF or PNG image. | `export`, `png`, `geotiff`, `worldfile` |
| **Marker Animation** | [`feature-move-animation.html`](https://openlayers.org/en/latest/examples/feature-move-animation.html) | Demonstrates how to move a feature along a line. | `animation`, `feature`, `postrender`, `polyline`, `maptiler` |
| **Multiple COG sources** | [`multiple-cogs.html`](https://openlayers.org/en/latest/examples/multiple-cogs.html) | Displaying two Sentinel 2 COGs with different projections | `cog`, `webgl`, `projection`, `reprojection` |
| **NDVI from a Sentinel 2 COG** | [`cog-math.html`](https://openlayers.org/en/latest/examples/cog-math.html) | Calculating NDVI and applying a custom color map. | `cog`, `ndvi` |
| **NDVI with a Dynamic Color Ramp** | [`cog-colors.html`](https://openlayers.org/en/latest/examples/cog-colors.html) | NDVI from a COG with a dynamic color ramp | `cog`, `ndvi` |
| **NDVI+NDWI from two 16-bit COGs** | [`cog-math-multisource.html`](https://openlayers.org/en/latest/examples/cog-math-multisource.html) | Calculating NDVI+NDWI as green and blue values. | `cog`, `ndvi`, `ndwi`, `sentinel`, `geotiff` |
| **OpenStreetMap Reprojection** | [`reprojection-wgs84.html`](https://openlayers.org/en/latest/examples/reprojection-wgs84.html) | Demonstrates client-side reprojection of OpenStreetMap in WGS84. | `reprojection`, `projection`, `openstreetmap`, `wgs84`, `tile` |
| **OpenStreetMap Reprojection with ScaleLine Control** | [`scaleline-indiana-east.html`](https://openlayers.org/en/latest/examples/scaleline-indiana-east.html) | Demonstrates client-side reprojection of OpenStreetMap to NAD83 Indiana East. | `reprojection`, `projection`, `openstreetmap`, `nad83`, `tile` |
| **Overlay** | [`overlay.html`](https://openlayers.org/en/latest/examples/overlay.html) | Demonstrates overlays. | `overlay`, `popup`, `bootstrap`, `popover` |
| **PMTiles Image Tiles** | [`pmtiles-image.html`](https://openlayers.org/en/latest/examples/pmtiles-image.html) | Displaying image tiles from a PMTiles archive. | `pmtiles`, `raster`, `imagetiles` |
| **Populated Places** | [`populated-places.html`](https://openlayers.org/en/latest/examples/populated-places.html) | Scaling and coloring points according to population. | `vector`, `interpolate` |
| **Raster Reprojection** | [`reprojection.html`](https://openlayers.org/en/latest/examples/reprojection.html) | Demonstrates client-side raster reprojection between various projections. | `reprojection`, `projection`, `proj4js`, `osm`, `wms` |
| **Raster Source** | [`raster.html`](https://openlayers.org/en/latest/examples/raster.html) | Demonstrates pixelwise operations with a raster source. | `raster`, `pixel`, `maptiler` |
| **Region Growing** | [`region-growing.html`](https://openlayers.org/en/latest/examples/region-growing.html) | Grow a region from a seed pixel | `raster`, `regiongrowing`, `maptiler` |
| **Rendering 16-bit NumpyTiles** | [`numpytile.html`](https://openlayers.org/en/latest/examples/numpytile.html) | Renders a multi-byte depth source image directly using WebGL. | `numpytiles`, `webgl` |
| **Reprojection with coordinate system search** | [`reprojection-by-code.html`](https://openlayers.org/en/latest/examples/reprojection-by-code.html) | Demonstrates client-side raster reprojection of OSM to arbitrary projection | `reprojection`, `projection`, `proj4js`, `epsg`, `maptiler` |
| **Sea Level** | [`sea-level.html`](https://openlayers.org/en/latest/examples/sea-level.html) | Render sea level at different elevations | `raster`, `pixeloperation`, `flood` |
| **Sea Level (with WebGL)** | [`webgl-sea-level.html`](https://openlayers.org/en/latest/examples/webgl-sea-level.html) | Render sea level at different elevations | `webgl`, `math`, `flood` |
| **Sentinel Hub** | [`sentinel-hub.html`](https://openlayers.org/en/latest/examples/sentinel-hub.html) | A tile source using the Sentinel Hub Processing API | `SentinelHub`, `process` |
| **Sentinel Hub Custom Format** | [`sentinel-hub-custom-format.html`](https://openlayers.org/en/latest/examples/sentinel-hub-custom-format.html) | Updating the format used by the Sentinel Hub source. | `SentinelHub`, `process` |
| **Sentinel Hub Custom Script** | [`sentinel-hub-custom-script.html`](https://openlayers.org/en/latest/examples/sentinel-hub-custom-script.html) | Updating the Evalscript used by the Sentinel Hub source. | `SentinelHub`, `process`, `Evalscript` |
| **Sentinel Hub Date Picker** | [`sentinel-hub-date-picker.html`](https://openlayers.org/en/latest/examples/sentinel-hub-date-picker.html) | Updating a Sentinel Hub source with new input data. | `SentinelHub`, `process` |
| **Shaded Relief** | [`shaded-relief.html`](https://openlayers.org/en/latest/examples/shaded-relief.html) | Calculate shaded relief from elevation data | `raster`, `shadedrelief` |
| **Shaded Relief (with WebGL)** | [`webgl-shaded-relief.html`](https://openlayers.org/en/latest/examples/webgl-shaded-relief.html) | Calculate shaded relief from elevation data | `webgl`, `shadedrelief` |
| **STAC support** | [`stac-item.html`](https://openlayers.org/en/latest/examples/stac-item.html) | Rendering a STAC Item with geometry and COG. | `stac`, `geotiff`, `cog`, `layergroup` |
| **Stadia Maps (Stamen Tile Layer Composition)** | [`stamen.html`](https://openlayers.org/en/latest/examples/stamen.html) | Example of composing layers with a Stadia Maps tile source. | `stamen`, `watercolor`, `terrain-labels`, `two-layers`, `stadia-maps` |
| **Style Expressions** | [`style-expressions.html`](https://openlayers.org/en/latest/examples/style-expressions.html) | Demonstrates rule based styling. | `vector`, `style`, `expression` |
| **Timezones in KML** | [`kml-timezones.html`](https://openlayers.org/en/latest/examples/kml-timezones.html) | Demonstrates rendering timezones from KML. | `KML`, `vector`, `style` |
| **TopoJSON** | [`topojson.html`](https://openlayers.org/en/latest/examples/topojson.html) | Demonstrates rendering of features from a TopoJSON topology. | `topojson`, `vector`, `style` |
| **Trajectories Heatmap** | [`heatmap-trajectories.html`](https://openlayers.org/en/latest/examples/heatmap-trajectories.html) | Demonstrates the use of a heatmap layer with linear geometries. | `heatmap`, `geojson`, `vector`, `trajectory`, `webgl` |
| **View Animation** | [`animation.html`](https://openlayers.org/en/latest/examples/animation.html) | Demonstrates animated pan, zoom, and rotation. | `animation` |
| **View Min-Zoom** | [`min-zoom.html`](https://openlayers.org/en/latest/examples/min-zoom.html) | Demonstrates how the view's minimum zoom level can be changed. | `min`, `zoom` |
| **View Padding** | [`view-padding.html`](https://openlayers.org/en/latest/examples/view-padding.html) | This example demonstrates the use of the view's padding option. | `center`, `padding`, `view`, `shift` |
| **WebGL points layer** | [`webgl-points-layer.html`](https://openlayers.org/en/latest/examples/webgl-points-layer.html) | Using a WebGL-optimized layer to render a large quantities of points | `webgl`, `point`, `layer`, `feature` |
| **WebGL Tile Layer Styles** | [`webgl-tile-style.html`](https://openlayers.org/en/latest/examples/webgl-tile-style.html) | Styling raster tiles with WebGL. | `webgl`, `style` |
| **WebGL Tiles** | [`webgl-tiles.html`](https://openlayers.org/en/latest/examples/webgl-tiles.html) | Rendering raster data with WebGL. | `webgl`, `osm` |
| **WebGL Vector Layer** | [`webgl-vector-layer.html`](https://openlayers.org/en/latest/examples/webgl-vector-layer.html) | Example of a vector layer rendered using WebGL | `vector`, `geojson`, `webgl` |
| **WebGL Vector Tiles Layer** | [`webgl-vector-tiles.html`](https://openlayers.org/en/latest/examples/webgl-vector-tiles.html) | Example of a vector tiles map rendered using WebGL. | `simple`, `mapbox`, `vector`, `tiles`, `webgl` |
| **WMS Time (WebGL)** | [`wms-time-webgl.html`](https://openlayers.org/en/latest/examples/wms-time-webgl.html) | Smooth tile transitions on a WebGL tile layer when changing the time dimension of a tiled WMS layer. | `wms`, `time`, `dimensions`, `transition`, `nexrad` |
| **XYZ Retina Tiles** | [`xyz-retina.html`](https://openlayers.org/en/latest/examples/xyz-retina.html) | Example of Retina / HiDPI mercator tiles (512x512px) available as XYZ. | `retina`, `hidpi`, `xyz`, `maptiler`, `@2x` |
| **Zoomify** | [`zoomify.html`](https://openlayers.org/en/latest/examples/zoomify.html) | Example of a Zoomify source. | `zoomify`, `deepzoom`, `IIP`, `pixel`, `projection` |
