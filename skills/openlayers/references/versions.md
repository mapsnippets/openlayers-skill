# OpenLayers & Ecosystem Versions 📦⚡

This guide lists the current production versions of OpenLayers, verified official companion packages, geodetic transformers, raster engines, and MapTiler Planet v4 style endpoints. Use these versions when creating HTML scripts, `package.json` dependencies, or CDN links.

---

## 1. Core Library & Companion Packages Matrix

| Library / Package | Current Version | Ingestion / Type | Primary Purpose | Used in Recipe / Guide |
| :--- | :--- | :--- | :--- | :--- |
| **ol** | `10.10.0` | ES Modules / UMD / NPM | Core web mapping engine (WebGL, Canvas, OGC) | Core basemaps & all 60 recipes |
| **ol-mapbox-style** | `12.4.0` | NPM / Hosted CDN | Parses Mapbox/MapTiler vector tile styles for OpenLayers | `basic-vector-map.md` / MVT styling |
| **proj4** | `2.15.0` | NPM / Hosted CDN | Geodetic coordinate transformations (BNG, Swiss LV95, etc.) | `reprojection-proj4js-*.md` |
| **geotiff** | `2.1.3` | NPM / CDN | Cloud-Optimized GeoTIFF (COG) client-side parsing | `cog-geotiff-rendering.md` |
| **flatgeobuf** | `3.33.0` | NPM / CDN | High-performance binary vector stream parsing | `flatgeobuf-loading.md` |
| **turf** | `7.2.0` | NPM / CDN | Spatial operations, clipping, and convex hulls | `turf-spatial-operations.md` |
| **jspdf** | `2.5.1` | NPM / UMD CDN | Client-side map printing and high-DPI PDF generation | `export-map-pdf-png.md` |
| **geojson-vt** | `3.2.1` | NPM / ESM | Slicing GeoJSON into vector tiles client-side | `vector-tile-styling-mvt.md` |
| **geozarr** | `0.1.0` | NPM / ESM | Multi-dimensional Earth Observation Zarr cubes | `geozarr-earth-observation.md` |
| **@types/ol** | `^10.0.0` | TypeScript Definitions | Type definitions for TypeScript, Vite, Next.js | `frameworks.md` |

---

## 2. Official CDN Endpoints

### OpenLayers v10.10.0
* **JavaScript Bundle:** `https://cdn.jsdelivr.net/npm/ol@v10.10.0/dist/ol.js`
* **CSS Stylesheet:** `https://cdn.jsdelivr.net/npm/ol@v10.10.0/ol.css`
* **Unpkg Fallback:** `https://unpkg.com/ol@10.10.0/dist/ol.js`

### Companion Packages (CDN)
* **ol-mapbox-style v12.4.0:** `https://cdn.jsdelivr.net/npm/ol-mapbox-style@12.4.0/dist/olms.js`
* **proj4js v2.15.0:** `https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.15.0/proj4.js`
* **GeoTIFF v2.1.3:** `https://cdn.jsdelivr.net/npm/geotiff@2.1.3/dist-browser/geotiff.js`
* **FlatGeobuf v3.33.0:** `https://cdn.jsdelivr.net/npm/flatgeobuf@3.33.0/dist/flatgeobuf-geojson.min.js`
* **Turf.js v7.2.0:** `https://cdn.jsdelivr.net/npm/@turf/turf@7.2.0/turf.min.js`
* **jsPDF v2.5.1:** `https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js`

### Modern Bundler Installation (NPM)
```bash
# Core & Common Packages
npm install ol@10.10.0 ol-mapbox-style@12.4.0 proj4@2.15.0

# Printing & GeoTIFF support
npm install jspdf@2.5.1 geotiff@2.1.3
```

```javascript
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ.js';
import 'ol/ol.css'; // CRITICAL: Always import CSS in root JS file
```

---

## 3. MapTiler Planet v4 Basemap Registry

### Vector Tiles via `ol-mapbox-style`:
```javascript
import { apply } from 'ol-mapbox-style';
apply(map, 'https://api.maptiler.com/maps/<style-id>/style.json?key=YOUR_API_KEY');
```

### Raster XYZ Tiles via `ol/source/XYZ`:
```javascript
new XYZ({
  url: 'https://api.maptiler.com/maps/<style-id>/{z}/{x}/{y}.png?key=YOUR_API_KEY',
  tileSize: 512,
  maxZoom: 22,
  attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'
})
```

| Style ID (`<style-id>`) | Variants | Category | Best Use Case |
| :--- | :--- | :--- | :--- |
| **`streets-v4`** | `streets-v4-dark`, `streets-v4-pastel` | Vector / Raster | Default general-purpose street map |
| **`outdoor-v4`** | `outdoor-v4-dark` | Vector / Raster | Topographic hiking map with contour lines & hillshading |
| **`satellite-v4`** | `satellite-v4-dark` | Raster Orthophoto | High-resolution satellite imagery |
| **`hybrid-v4`** | `hybrid-v4-dark` | Hybrid | Satellite imagery with road, place, and boundary overlays |
| **`dataviz-v4-dark`**| `dataviz-v4-light` | Minimal Vector | Muted palette for data visualization overlays |
| **`base-v4`** | `base-v4-dark`, `base-v4-light` | Minimal Vector | Minimalist base layout (replaces deprecated `basic-v2`) |
| **`winter-v4`** | `winter-v4-dark` | Vector / Raster | Winter sports, ski trails, and lifts |
| **`ocean-v4`** | `ocean-v4-dark` | Vector / Raster | Marine data view and bathymetry contours |
| **`topo-v4`** | `topo-v4-dark`, `topo-v4-pastel` | Topographic | High-detail topographic survey layout |

---

## 4. Legacy-to-Modern Style Translation Table

> [!WARNING]
> All `v2` style variants are deprecated. Always replace legacy strings with their modern **V4** production counterparts:

| Deprecated Key (v2) | Modern Replacement (v4) | Notes / Action |
| :--- | :--- | :--- |
| `streets-v2` | `streets-v4` | Full Planet v4 schema update |
| `streets-v2-dark` / `-night` | `streets-v4-dark` | Dark mode street basemap |
| `streets-v2-pastel` | `streets-v4-pastel` | Low-contrast pastel palette |
| `basic-v2` | `base-v4` | Replace deprecated basic-v2 with modern base-v4 |
| `basic-v2-dark` | `base-v4-dark` | Dark minimalist base |
| `basic-v2-light` | `base-v4-light` | Light minimalist base |
| `outdoor-v2` | `outdoor-v4` | Detailed hiking contours & peaks |
| `outdoor-v2-dark` | `outdoor-v4-dark` | Dark mode outdoor map |
| `satellite` / `satellite-v2` | `satellite-v4` | Clean cloudless satellite imagery |
| `hybrid` / `hybrid-v2` | `hybrid-v4` | Satellite with roads and labels |
| `dataviz` / `dataviz-dark` | `dataviz-v4-dark` | High-contrast data visualization |
| `dataviz-light` | `dataviz-v4-light` | Clean light data visualization |
| `toner-v2` | `base-v4-dark` | High-contrast monochrome dark |
| `voyager-v2` | `streets-v4-pastel` or `base-v4-light` | Muted neutral tones |
| `topo-v2` | `topo-v4` | Standard topographic relief |
