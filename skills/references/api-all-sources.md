# OpenLayers Complete API Specification — All Source Classes (`ol/source/*`)

Source: https://openlayers.org/en/latest/apidoc/module-ol_source_Source-Source.html

---

| Source Class | Import Path | Protocol / Purpose |
| :--- | :--- | :--- |
| `XYZ` | `ol/source/XYZ.js` | Raster tile pyramids with `{z}/{x}/{y}` URL patterns. |
| `OSM` | `ol/source/OSM.js` | OpenStreetMap standard raster tiles. |
| `TileWMS` | `ol/source/TileWMS.js` | OGC Web Map Service (WMS) in tiled chunks. |
| `ImageWMS` | `ol/source/ImageWMS.js` | Single-image OGC WMS queries (no tile seams). |
| `WMTS` | `ol/source/WMTS.js` | OGC Web Map Tile Service with `WMTSTileGrid`. |
| `Vector` | `ol/source/Vector.js` | Vector feature data source (GeoJSON, KML, GPX, WFS). |
| `VectorTile` | `ol/source/VectorTile.js` | Vector tile source (`MVT`). |
| `Cluster` | `ol/source/Cluster.js` | Spatial point clustering with distance thresholds. |
| `GeoTIFF` | `ol/source/GeoTIFF.js` | Cloud-Optimized GeoTIFF streaming with multi-band extraction. |
| `DataTile` | `ol/source/DataTile.js` | Raw array / NumPy tile data generation. |
| `Raster` | `ol/source/Raster.js` | Pixelwise operations across multiple raster inputs. |
| `TileJSON` | `ol/source/TileJSON.js` | TileJSON 2.x/3.x metadata parser. |
| `SentinelHub` | `ol/source/SentinelHub.js`| Sentinel Hub Processing API integration with Evalscripts. |
| `UTFGrid` | `ol/source/UTFGrid.js` | JSON interactivity grids. |
| `IIIF` | `ol/source/IIIF.js` | International Image Interoperability Framework (high-res images). |
| `TileArcGISRest`| `ol/source/TileArcGISRest.js`| Tiled ArcGIS Server MapServer / ImageServer services. |
| `ImageArcGISRest`| `ol/source/ImageArcGISRest.js`| Dynamic ArcGIS Server MapServer imagery. |
| `OGCMapTile` | `ol/source/OGCMapTile.js`| OGC API – Tiles (Raster maps). |
| `OGCVectorTile`| `ol/source/OGCVectorTile.js`| OGC API – Tiles (Vector tiles). |
| `ImageStatic` | `ol/source/ImageStatic.js`| Static single georeferenced raster image (with `imageExtent`). |
| `Zoomify` | `ol/source/Zoomify.js` | Gigapixel Zoomify tile pyramid. |
