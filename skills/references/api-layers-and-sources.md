# OpenLayers API Reference — Layers & Sources

OpenLayers strictly separates the visual presentation container (`ol/layer/*`) from the underlying data protocol (`ol/source/*`). A single source can feed multiple layers with different styles, filters, or renderers.

---

## 1. Complete Layer Hierarchy (`ol/layer/*`)

| Layer Class | Import Path | Best Use Case |
| :--- | :--- | :--- |
| `TileLayer` | `ol/layer/Tile.js` | Pre-rendered raster tile pyramids (MapTiler XYZ, OpenStreetMap, TileWMS, WMTS). |
| `VectorLayer` | `ol/layer/Vector.js` | Client-side vector geometries (GeoJSON, KML, GPX, interactive drawing). |
| `VectorTileLayer` | `ol/layer/VectorTile.js` | Vector tiles (MVT / Mapbox vector tiles) with client-side styling. |
| `VectorImageLayer` | `ol/layer/VectorImage.js` | Complex vector layers pre-rendered to canvas tiles for fast panning/zooming. |
| `WebGLTileLayer` | `ol/layer/WebGLTile.js` | High-performance WebGL-rendered raster tiles and Cloud Optimized GeoTIFFs (COG). |
| `Heatmap` | `ol/layer/Heatmap.js` | Density heatmaps with customizable blur, radius, and color gradients. |
| `ImageLayer` | `ol/layer/Image.js` | Single untiled images (WMS Single Tile, static floorplans, drone orthophotos). |
| `LayerGroup` | `ol/layer/Group.js` | Hierarchical collection of layers toggled or managed as a single unit. |

### Universal Layer Options
Every layer inherits from `ol/layer/Base` and supports these configuration properties:
- `opacity` (`number`, default `1.0`) — Layer opacity between `0.0` and `1.0`.
- `visible` (`boolean`, default `true`) — Visibility toggle.
- `extent` (`[minX, minY, maxX, maxY]`) — Bounding extent outside which the layer is not rendered.
- `zIndex` (`number`, default `0`) — Stacking order index.
- `minZoom` / `maxZoom` (`number`) — Zoom levels (inclusive/exclusive) where layer is visible.
- `minResolution` / `maxResolution` (`number`) — Ground resolution thresholds in projection units.

---

## 2. Vector Sources (`ol/source/*`)

### A. `ol/source/Vector` (GeoJSON & In-Memory Data)
```javascript
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { fromLonLat } from 'ol/proj.js';

// 1. Static Remote GeoJSON Source
const remoteVectorSource = new VectorSource({
  url: 'https://example.com/api/data.geojson',
  format: new GeoJSON({
    dataProjection: 'EPSG:4326',      // Coordinates in the file are [lng, lat]
    featureProjection: 'EPSG:3857'    // Coordinates are transformed to Web Mercator
  })
});

// 2. In-Memory Programmatic Source
const memorySource = new VectorSource();
const marker = new Feature({
  geometry: new Point(fromLonLat([14.4378, 50.0755])),
  name: 'Prague Office',
  type: 'headquarters'
});
memorySource.addFeature(marker);

const vectorLayer = new VectorLayer({
  source: memorySource,
  zIndex: 10
});
map.addLayer(vectorLayer);
```

### B. BBOX Loading Strategy (Streaming Large Data on Viewport Move)
When dealing with millions of features on a remote server, load only the features inside the current map viewport using `ol/loadingstrategy.js`:

```javascript
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { bbox } from 'ol/loadingstrategy.js';

const wfsSource = new VectorSource({
  format: new GeoJSON(),
  strategy: bbox, // Re-runs loader function whenever viewport extent changes
  loader: function (extent, resolution, projection, success, failure) {
    const url = `https://example.com/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&outputFormat=application/json&srsname=${projection.getCode()}&bbox=${extent.join(',')},${projection.getCode()}`;
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const features = new GeoJSON().readFeatures(data);
        wfsSource.addFeatures(features);
        success(features);
      })
      .catch((err) => {
        failure();
      });
  }
});
```

### C. `ol/source/Cluster` (Marker Clustering)
```javascript
import VectorSource from 'ol/source/Vector.js';
import Cluster from 'ol/source/Cluster.js';
import VectorLayer from 'ol/layer/Vector.js';
import { Style, Circle as CircleStyle, Fill, Stroke, Text } from 'ol/style.js';

const pointSource = new VectorSource({
  url: 'https://example.com/stores.geojson',
  format: new GeoJSON()
});

const clusterSource = new Cluster({
  distance: 45,       // Cluster distance in pixels
  minDistance: 20,    // Minimum distance between two clusters
  source: pointSource
});

const clusterLayer = new VectorLayer({
  source: clusterSource,
  style: (feature) => {
    const clusteredFeatures = feature.get('features');
    const size = clusteredFeatures.length;

    // Single unclustered marker
    if (size === 1) {
      return new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: '#0084FF' }),
          stroke: new Stroke({ color: '#ffffff', width: 2 })
        })
      });
    }

    // Cluster badge with count
    return new Style({
      image: new CircleStyle({
        radius: Math.min(14 + size * 1.2, 32),
        fill: new Fill({ color: size > 20 ? '#ef4444' : '#0084FF' }),
        stroke: new Stroke({ color: '#ffffff', width: 3 })
      }),
      text: new Text({
        text: size.toString(),
        fill: new Fill({ color: '#ffffff' }),
        font: 'bold 12px sans-serif'
      })
    });
  }
});
map.addLayer(clusterLayer);
```

---

## 3. Raster & Tile Sources (`ol/source/*`)

### A. `ol/source/XYZ` (MapTiler & Standard Raster Tiles)
```javascript
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ.js';

const maptilerStreets = new TileLayer({
  source: new XYZ({
    url: 'https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY',
    tileSize: 512,
    maxZoom: 22,
    crossOrigin: 'anonymous',
    attributions: '<a href="https://www.maptiler.com/copyright/">&copy; MapTiler</a>'
  })
});
map.addLayer(maptilerStreets);
```

### B. `ol/layer/Group` (Hierarchical Layer Management)
```javascript
import LayerGroup from 'ol/layer/Group.js';

const basemapGroup = new LayerGroup({
  layers: [streetsTileLayer, satelliteTileLayer]
});

const overlayGroup = new LayerGroup({
  layers: [parcelsLayer, pipelinesLayer]
});

map.addLayer(basemapGroup);
map.addLayer(overlayGroup);

// Toggle all overlays with a single call:
overlayGroup.setVisible(false);
```

### C. `ol/layer/Heatmap`
```javascript
import Heatmap from 'ol/layer/Heatmap.js';

const heatmapLayer = new Heatmap({
  source: pointSource,
  blur: 15,                     // Blur size in pixels
  radius: 10,                   // Radius size in pixels
  weight: (feature) => {
    // Return float between 0.0 and 1.0
    return feature.get('magnitude') / 10;
  },
  gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'] // Custom color ramp
});
map.addLayer(heatmapLayer);
```
