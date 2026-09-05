# Basemaps, Styles & Terrain Reference (Planet v4) — OpenLayers

This reference provides production-ready style JSON URLs, raster XYZ tile endpoints, and elevation/terrain configurations for OpenLayers applications.

---

## 1. Vector Map Styles (`style.json`)

To apply MapTiler vector styles with Mapbox/MapLibre Style JSON in OpenLayers, use the `ol-mapbox-style` package:

```javascript
import Map from "ol/Map.js";
import { apply } from "ol-mapbox-style";

const map = new Map({ target: "map" });
apply(map, "https://api.maptiler.com/maps/streets-v4/style.json?key=YOUR_API_KEY");
```

### Full Catalog of Modern v4 Styles:

| Style Name | Style URL | Recommended Use Case |
| :--- | :--- | :--- |
| **Streets v4** | `https://api.maptiler.com/maps/streets-v4/style.json?key=YOUR_API_KEY` | General purpose navigation, city maps, POIs |
| **Streets v4 Dark** | `https://api.maptiler.com/maps/streets-v4-dark/style.json?key=YOUR_API_KEY` | Night mode, high-contrast dark theme |
| **Streets v4 Pastel** | `https://api.maptiler.com/maps/streets-v4-pastel/style.json?key=YOUR_API_KEY` | Vintage / soft pastel streets theme |
| **Outdoor v4** | `https://api.maptiler.com/maps/outdoor-v4/style.json?key=YOUR_API_KEY` | Hiking, cycling, topographic contours & hillshading |
| **Outdoor v4 Dark** | `https://api.maptiler.com/maps/outdoor-v4-dark/style.json?key=YOUR_API_KEY` | Night mode trails and terrain |
| **Satellite v4** | `https://api.maptiler.com/maps/satellite-v4/style.json?key=YOUR_API_KEY` | High-resolution satellite imagery |
| **Satellite Hybrid v4** | `https://api.maptiler.com/maps/hybrid-v4/style.json?key=YOUR_API_KEY` | Satellite imagery with streets & labels |
| **Dataviz v4 Dark** | `https://api.maptiler.com/maps/dataviz-v4-dark/style.json?key=YOUR_API_KEY` | Minimalist contrast theme optimized for dense data overlays |
| **Dataviz v4 Light** | `https://api.maptiler.com/maps/dataviz-v4-light/style.json?key=YOUR_API_KEY` | Clean light background for analytical data overlays |
| **Dataviz v4** | `https://api.maptiler.com/maps/dataviz-v4/style.json?key=YOUR_API_KEY` | Balanced neutral backdrop for data visualizations |
| **Topo v4** | `https://api.maptiler.com/maps/topo-v4/style.json?key=YOUR_API_KEY` | Traditional topographic cartography with contours |
| **Base v4** | `https://api.maptiler.com/maps/base-v4/style.json?key=YOUR_API_KEY` | Clean muted background for custom thematic layers |
| **Base v4 Dark** | `https://api.maptiler.com/maps/base-v4-dark/style.json?key=YOUR_API_KEY` | Dark muted background for custom thematic layers |
| **Base v4 Light** | `https://api.maptiler.com/maps/base-v4-light/style.json?key=YOUR_API_KEY` | Light minimalist background for custom thematic layers |
| **Bright v4** | `https://api.maptiler.com/maps/bright-v4/style.json?key=YOUR_API_KEY` | Vibrant, colorful presentation style |
| **Winter v4** | `https://api.maptiler.com/maps/winter-v4/style.json?key=YOUR_API_KEY` | Ski slopes, winter pistes, and snow terrain |
| **Ocean** | `https://api.maptiler.com/maps/ocean/style.json?key=YOUR_API_KEY` | Nautical bathymetry and oceanic features |

---

## 2. High-DPI Raster Tiles (512×512)

Standard OpenLayers raster tile implementation using `ol/layer/Tile` and `ol/source/XYZ`:

```javascript
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";

// Standard 512px raster tiles
const rasterLayer = new TileLayer({
  source: new XYZ({
    url: "https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY",
    tileSize: 512,
    maxZoom: 22,
    attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
  })
});

// Crisp High-DPI Retina 512px raster tiles (@2x)
const retinaLayer = new TileLayer({
  source: new XYZ({
    url: "https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}@2x.png?key=YOUR_API_KEY",
    tilePixelRatio: 2,
    tileSize: 512,
    maxZoom: 22,
    attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
  })
});
```

### Raster Tile URL Structure & Resolution Rules:

| Tile Format | URL Pattern | Tile Size | OpenLayers `tileSize` | OpenLayers `tilePixelRatio` |
| :--- | :--- | :--- | :--- | :--- |
| **512px Standard (Default)** | `https://api.maptiler.com/maps/{style}/{z}/{x}/{y}.png?key=KEY` | 512×512 | `512` | `1` |
| **512px Retina (@2x)** | `https://api.maptiler.com/maps/{style}/{z}/{x}/{y}@2x.png?key=KEY` | 1024×1024 (@2x) | `512` | `2` |
| **256px Standard (Legacy)** | `https://api.maptiler.com/maps/{style}/256/{z}/{x}/{y}.png?key=KEY` | 256×256 | `256` | `1` |
| **256px Retina (@2x)** | `https://api.maptiler.com/maps/{style}/256/{z}/{x}/{y}@2x.png?key=KEY` | 512×512 (@2x) | `256` | `2` |

> ⚠️ **CRITICAL GOTCHA: `/512/` is NOT a valid URL path**
> * MapTiler Cloud serves 512px tiles as its standard native resolution. There is **NO `/512/` path prefix**!
> * ❌ **INVALID:** `https://api.maptiler.com/maps/streets-v4/512/{z}/{x}/{y}@2x.png?key=KEY` (fails with HTTP error)
> * ✅ **VALID (512px):** `https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}@2x.png?key=KEY` (retina) or `.../{z}/{x}/{y}.png?key=KEY` (normal)
> * ✅ **VALID (256px):** `https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}@2x.png?key=KEY` (only 256px requires explicit `/256/` prefix)

### High-DPI Raster Endpoints:

* **Streets v4:**
  - Standard (512px): `https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY`
  - Retina (512px @2x): `https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}@2x.png?key=YOUR_API_KEY`
* **Satellite v4:**
  - Standard (512px): `https://api.maptiler.com/maps/satellite-v4/{z}/{x}/{y}.jpg?key=YOUR_API_KEY`
  - Retina (512px @2x): `https://api.maptiler.com/maps/satellite-v4/{z}/{x}/{y}@2x.jpg?key=YOUR_API_KEY`
* **Outdoor v4:**
  - Standard (512px): `https://api.maptiler.com/maps/outdoor-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY`
  - Retina (512px @2x): `https://api.maptiler.com/maps/outdoor-v4/{z}/{x}/{y}@2x.png?key=YOUR_API_KEY`
* **Dataviz v4 Dark:**
  - Standard (512px): `https://api.maptiler.com/maps/dataviz-v4-dark/{z}/{x}/{y}.png?key=YOUR_API_KEY`
  - Retina (512px @2x): `https://api.maptiler.com/maps/dataviz-v4-dark/{z}/{x}/{y}@2x.png?key=YOUR_API_KEY`

---

## 3. Terrain, Hillshading & Elevation in OpenLayers

### A. Shaded Relief / Hillshade Layer
Overlay shaded relief over your basemap:
```javascript
const hillshadeLayer = new TileLayer({
  source: new XYZ({
    url: "https://api.maptiler.com/tiles/hillshade/{z}/{x}/{y}.png?key=YOUR_API_KEY",
    tileSize: 512,
    maxZoom: 20
  }),
  opacity: 0.5
});
```

### B. Point Elevation Lookup (Elevation API)
Query exact terrain elevation in meters for coordinates:
```javascript
async function getElevation(lng, lat, apiKey) {
  const res = await fetch(`https://api.maptiler.com/elevation/${lng},${lat}.json?key=${apiKey}`);
  const data = await res.json();
  return data[0][2]; // [lng, lat, elevation_in_meters]
}
```
