# OGC Enterprise Standards — WMS, WMTS, WFS & OGC API in OpenLayers

OpenLayers is the industry benchmark for standard OGC GIS protocols (GeoServer, MapServer, ArcGIS, QGIS Server).

---

## 1. Tiled & Single-Image WMS with `GetFeatureInfo`

### A. Tiled WMS (`ol/layer/Tile` + `ol/source/TileWMS`):
```javascript
import TileLayer from "ol/layer/Tile.js";
import TileWMS from "ol/source/TileWMS.js";

const wmsLayer = new TileLayer({
  source: new TileWMS({
    url: "https://ahocevar.com/geoserver/wms",
    params: {
      "LAYERS": "topp:states",
      "TILED": true,
      "VERSION": "1.3.0"
    },
    serverType: "geoserver",
    transition: 0
  })
});
map.addLayer(wmsLayer);
```

### B. Interactive `GetFeatureInfo` Click Query:
```javascript
map.on("singleclick", function (evt) {
  const viewResolution = map.getView().getResolution();
  const url = wmsLayer.getSource().getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    map.getView().getProjection(),
    { "INFO_FORMAT": "application/json" }
  );

  if (url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const stateName = data.features[0].properties.STATE_NAME;
          console.log("Queried WMS Feature:", stateName);
        }
      });
  }
});
```

---

## 2. Web Feature Service (WFS) with BBOX Strategy

Fetch live vector features from GeoServer dynamically constrained to the visible viewport:

```javascript
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { bbox as bboxStrategy } from "ol/loadingstrategy.js";

const wfsSource = new VectorSource({
  format: new GeoJSON(),
  loader: function (extent, resolution, projection, success, failure) {
    const url = "https://example.com/geoserver/wfs?" +
      "service=WFS&version=1.1.0&request=GetFeature&typename=my_workspace:roads&" +
      "outputFormat=application/json&srsname=" + projection.getCode() + "&" +
      "bbox=" + extent.join(",") + "," + projection.getCode();

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const features = wfsSource.getFormat().readFeatures(data);
        wfsSource.addFeatures(features);
        success(features);
      })
      .catch(failure);
  },
  strategy: bboxStrategy
});

const wfsLayer = new VectorLayer({ source: wfsSource });
map.addLayer(wfsLayer);
```

---

## 3. High-DPI WMTS (`ol/source/WMTS`) with Custom TileGrid

```javascript
import TileLayer from "ol/layer/Tile.js";
import WMTS from "ol/source/WMTS.js";
import WMTSTileGrid from "ol/tilegrid/WMTS.js";
import { get as getProjection } from "ol/proj.js";
import { getTopLeft, getWidth } from "ol/extent.js";

const projection = getProjection("EPSG:3857");
const projectionExtent = projection.getExtent();
const size = getWidth(projectionExtent) / 256;
const resolutions = new Array(19);
const matrixIds = new Array(19);
for (let z = 0; z < 19; ++z) {
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}

const wmtsLayer = new TileLayer({
  source: new WMTS({
    url: "https://example.com/geocache/wmts",
    layer: "orthophoto",
    matrixSet: "EPSG:3857",
    format: "image/jpeg",
    projection: projection,
    tileGrid: new WMTSTileGrid({
      origin: getTopLeft(projectionExtent),
      resolutions: resolutions,
      matrixIds: matrixIds
    }),
    style: "default",
    wrapX: true
  })
});
```
