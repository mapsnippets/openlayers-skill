# OpenLayers Complete API Specification — All Layer Classes (`ol/layer/*`)

Source: https://openlayers.org/en/latest/apidoc/module-ol_layer_Base-BaseLayer.html

---

## 1. `ol/layer/Tile`
Renders tile data from grid sources (`ol/source/XYZ`, `ol/source/OSM`, `ol/source/TileWMS`, `ol/source/WMTS`).
* **Options:** `source`, `opacity`, `visible`, `extent`, `zIndex`, `minResolution`, `maxResolution`, `minZoom`, `maxZoom`, `preload`, `cacheSize`.

## 2. `ol/layer/Vector`
Client-side vector geometry rendering using Canvas 2D.
* **Options:** `source` (`ol/source/Vector`), `style`, `renderBuffer`, `updateWhileAnimating`, `updateWhileInteracting`, `declutter`.

## 3. `ol/layer/VectorTile`
Vector tiles rendering (MVT).
* **Options:** `source` (`ol/source/VectorTile`), `style`, `renderMode` (`'hybrid'` | `'vector'`), `declutter`.

## 4. `ol/layer/WebGLTile`
Hardware-accelerated raster tile rendering with shader styling.
* **Options:** `source` (`ol/source/GeoTIFF`, `ol/source/DataTile`), `style` (color expressions, band math), `cacheSize`.

## 5. `ol/layer/WebGLPoints`
Hardware-accelerated WebGL point layer (100,000+ points).
* **Options:** `source`, `style` (`symbol: { symbolType, size, color, texture }`), `disableHitDetection`.

## 6. `ol/layer/WebGLVector`
Experimental hardware-accelerated vector lines and polygons.
* **Options:** `source`, `style` (flat style expressions with WebGL shaders).

## 7. `ol/layer/Heatmap`
Density heatmap rendered on Canvas.
* **Options:** `source`, `blur`, `radius`, `weight` (`feature => number`), `gradient`.

## 8. `ol/layer/Image`
Single image source rendering (`ol/source/ImageWMS`, `ol/source/ImageStatic`, `ol/source/ImageArcGISRest`).

## 9. `ol/layer/VectorImage`
Vector features pre-rendered into canvas images during panning/zooming.

## 10. `ol/layer/Group`
Hierarchical layer container.
* **Options:** `layers` (`Collection<BaseLayer> | Array<BaseLayer>`).

## 11. `ol/layer/Graticule`
Renders latitude/longitude grid lines over the map.
* **Options:** `maxLines`, `strokeStyle`, `targetSize`, `showLabels`, `latLabelStyle`, `lonLabelStyle`.
