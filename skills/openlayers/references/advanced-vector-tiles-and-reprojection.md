# Advanced Vector Tiles & On-the-Fly Reprojection in OpenLayers

---

## 1. Client-Side GeoJSON Slicing with `geojson-vt`

Convert massive GeoJSON datasets (e.g. 50 MB) into vector tile pyramids in memory on the fly:

```bash
npm install geojson-vt
```
```javascript
import VectorTileLayer from "ol/layer/VectorTile.js";
import VectorTileSource from "ol/source/VectorTile.js";
import GeoJSON from "ol/format/GeoJSON.js";
import geojsonvt from "geojson-vt";

fetch("https://example.com/huge_dataset.geojson")
  .then((res) => res.json())
  .then((geojson) => {
    const tileIndex = geojsonvt(geojson, {
      maxZoom: 14,
      indexMaxZoom: 5,
      indexMaxPoints: 100000
    });

    const vectorTileSource = new VectorTileSource({
      format: new GeoJSON(),
      tileUrlFunction: (tileCoord) => JSON.stringify(tileCoord),
      tileLoadFunction: (tile, url) => {
        const [z, x, y] = JSON.parse(url);
        const tileData = tileIndex.getTile(z, x, y);
        const features = tileData
          ? new GeoJSON().readFeatures({
              type: "FeatureCollection",
              features: tileData.features.map((f) => ({
                type: "Feature",
                geometry: {
                  type: f.type === 1 ? "Point" : f.type === 2 ? "LineString" : "Polygon",
                  coordinates: f.geometry
                },
                properties: f.tags
              }))
            })
          : [];
        tile.setFeatures(features);
      }
    });

    map.addLayer(new VectorTileLayer({ source: vectorTileSource }));
  });
```

---

## 2. On-The-Fly Raster & Vector Reprojection

OpenLayers reprojects any raster tile layer on the fly to match your custom view projection (e.g. Polar Stereographic `EPSG:3413` or British National Grid `EPSG:27700`):

```javascript
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import proj4 from "proj4";
import { register } from "ol/proj/proj4.js";
import { get as getProjection } from "ol/proj.js";

// Define British National Grid
proj4.defs(
  "EPSG:27700",
  "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs"
);
register(proj4);

const bngProjection = getProjection("EPSG:27700");
bngProjection.setExtent([0, 0, 700000, 1300000]);

const map = new Map({
  target: "map",
  layers: [
    // Standard Global Web Mercator tile source is automatically reprojected on the fly!
    new TileLayer({
      source: new XYZ({
        url: "https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=KEY",
        tileSize: 512
      })
    })
  ],
  view: new View({
    projection: bngProjection,
    center: [390000, 390000],
    zoom: 8
  })
});
```
