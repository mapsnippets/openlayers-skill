# OpenLayers Patterns & Common Gotchas

This document details the top 10 most frequent bugs and pitfalls encountered in OpenLayers development, along with verified fixes.

---

### Gotcha 1: Null Island / Blank View (`fromLonLat` Missing)
* **Problem:** Passing raw GPS `[14.4378, 50.0755]` to `new View({ center })`. In default `EPSG:3857`, coordinates are in meters. `[14.4, 50.0]` is 50 meters off the coast of Africa (Null Island).
* **Fix:** Always wrap coordinates with `fromLonLat([lng, lat])`:
```javascript
view: new View({
  center: fromLonLat([14.4378, 50.0755]),
  zoom: 13
})
```

---

### Gotcha 2: Legacy Global `ol.*` Anti-Pattern
* **Problem:** Using `new ol.Map()` or `new ol.layer.Tile()` in modern bundlers causes `ReferenceError: ol is not defined`.
* **Fix:** Use modular imports: `import Map from 'ol/Map.js';`.

---

### Gotcha 3: Missing `ol.css` Stylesheet
* **Problem:** Map controls appear stretched, scattered across the screen, or interaction overlays misalign.
* **Fix:** Add `import 'ol/ol.css';` at the top of your main JavaScript/TypeScript file.

---

### Gotcha 4: GeoJSON Coordinate Mismatch (`dataProjection` vs `featureProjection`)
* **Problem:** GeoJSON coordinates render in the ocean or invisible because they were not transformed during parsing.
* **Fix:** Specify projection mapping in `ol/format/GeoJSON`:
```javascript
new GeoJSON().readFeatures(geoJsonData, {
  dataProjection: "EPSG:4326",
  featureProjection: "EPSG:3857"
});
```

---

### Gotcha 5: Container Resizing & Grey Canvas (`map.updateSize()`)
* **Problem:** Initializing a map inside an inactive tab or hidden modal results in an unrendered canvas.
* **Fix:** Call `map.updateSize()` once the container becomes visible.

---

### Gotcha 6: React Double Initialization (`map.setTarget(null)`)
* **Problem:** In React 18 Strict Mode, components mount twice, creating duplicate WebGL contexts and memory leaks.
* **Fix:** Always clean up target in `useEffect`:
```javascript
useEffect(() => {
  const map = new Map({ target: mapElementRef.current, ... });
  return () => map.setTarget(null);
}, []);
```

---

### Gotcha 7: 512px Tile Blurriness
* **Problem:** High-res vector/raster tiles appear blurry if using default 256px tile configuration.
* **Fix:** Specify `tileSize: 512` and `maxZoom: 22` on `ol/source/XYZ`.
