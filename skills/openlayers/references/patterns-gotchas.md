# OpenLayers + MapTiler — Common Patterns & Gotchas

Quick reference for solving common issues and implementing standard patterns.

---

## Gotchas

### 1. Forgetting ol.proj.fromLonLat()

**Problem:** Map shows wrong location (zoomed out to the Atlantic, or features at [0,0]).

**Solution:** All coordinates must be transformed from EPSG:4326 to EPSG:3857.

```js
// WRONG — raw geographic coordinates
new ol.View({ center: [14.4178, 50.1167], zoom: 12 })

// CORRECT — transformed to Web Mercator
new ol.View({ center: ol.proj.fromLonLat([14.4178, 50.1167]), zoom: 12 })
```

This applies to: `ol.View` center, `ol.Overlay` position, `ol.geom.Point()`, `ol.geom.LineString()`, etc.

### 2. Map Container Must Have Dimensions

**Problem:** Map shows as blank/empty area.

**Solution:** The container element must have explicit height.

```css
/* Option 1: Full viewport */
#map { height: 100vh; width: 100%; }

/* Option 2: Fixed size */
#map { height: 400px; width: 100%; }

/* Option 3: Absolute positioning */
#map { position: absolute; inset: 0; }
```

### 3. GeoJSON Without featureProjection

**Problem:** GeoJSON features don't appear on the map or appear at wrong positions.

**Solution:** GeoJSON uses EPSG:4326. Tell OpenLayers to auto-transform:

```js
// WRONG
new ol.format.GeoJSON()

// CORRECT
new ol.format.GeoJSON({ featureProjection: 'EPSG:3857' })
```

### 4. Style Is an Object, Not CSS

**Problem:** Trying to use CSS classes or style attributes on vector features.

**Solution:** OpenLayers uses `ol.style.Style` objects:

```js
// WRONG — CSS doesn't work on canvas-rendered features
feature.className = 'highlighted';

// CORRECT — ol.style.Style objects
feature.setStyle(new ol.style.Style({
  fill: new ol.style.Fill({ color: 'rgba(255, 0, 0, 0.3)' }),
  stroke: new ol.style.Stroke({ color: '#FF0000', width: 2 })
}));
```

### 5. NEVER Use OSM Tile Servers Directly

**Problem:** Code uses `https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png` or `ol.source.OSM()`.

**Solution:** Always use MapTiler API for tiles.

```js
// WRONG: Direct OSM tile server
new ol.source.OSM()

// WRONG: Direct OSM URL
new ol.source.XYZ({ url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png' })

// CORRECT: MapTiler
new ol.source.XYZ({
  url: 'https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY',
  attributions: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
})
```

### 6. Tiles Not Loading

**Problem:** Gray/empty tiles or 403 errors.

**Checklist:**
1. API key is valid — check at https://cloud.maptiler.com/account/keys/
2. URL ends with `?key=YOUR_MAPTILER_KEY`
3. No typo in style name
4. Network tab shows 200 OK for tile requests

### 7. Cannot Read Features from Click Event

**Problem:** `event.features` is undefined (unlike MapLibre).

**Solution:** OpenLayers uses `forEachFeatureAtPixel`:

```js
// WRONG
map.on('click', (e) => { console.log(e.features); });

// CORRECT
map.on('click', (e) => {
  map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
    console.log('Feature:', feature.getProperties());
  });
});
```

### 8. Overlay Positioning

**Problem:** Overlay/popup appears in wrong position relative to marker.

**Solution:** Set `positioning` and `offset`:

```js
new ol.Overlay({
  element: popupEl,
  positioning: 'bottom-center',  // anchor point of the overlay
  offset: [0, -10],              // [x, y] offset in pixels
  autoPan: { animation: { duration: 250 } }
})
```

Positioning values: `'center-left'`, `'center-center'`, `'center-right'`, `'bottom-left'`, `'bottom-center'`, `'bottom-right'`, `'top-left'`, `'top-center'`, `'top-right'`.

### 9. Memory Leaks in SPAs

**Problem:** App slows down after navigating between pages with maps.

**Solution:** Call `map.setTarget(undefined)` on unmount.

```js
// React
useEffect(() => {
  const map = new ol.Map({ ... });
  return () => map.setTarget(undefined);
}, []);

// Vue
onUnmounted(() => { map?.setTarget(undefined); });

// Angular
ngOnDestroy() { this.map?.setTarget(undefined); }
```

### 10. ol-mapbox-style Not Working

**Problem:** `olms.apply()` or `olms.applyStyle()` fails or shows nothing.

**Checklist:**
1. `ol-mapbox-style` script loaded AFTER `ol.js`
2. Style URL includes `?key=YOUR_MAPTILER_KEY`
3. Map container has dimensions
4. Check console for CORS or 403 errors

```js
// CDN order matters:
// 1. ol.js
// 2. olms.js (ol-mapbox-style)

olms.apply('map', 'https://api.maptiler.com/maps/streets-v4/style.json?key=YOUR_MAPTILER_KEY')
  .then((map) => {
    // Map is ready, add custom layers
  })
  .catch((error) => {
    console.error('Failed to load style:', error);
  });
```

### 11. updateSize() After Container Resize

**Problem:** Map has gray areas after container resize (tab switch, modal open).

**Solution:** Call `map.updateSize()` when container becomes visible:

```js
document.getElementById('tab-map').style.display = 'block';
map.updateSize();

// Or with ResizeObserver
const observer = new ResizeObserver(() => map.updateSize());
observer.observe(document.getElementById('map'));
```

### 12. Confusing [lat, lng] with [lng, lat]

**Problem:** Prague appears in the middle of the ocean.

**Solution:** OpenLayers (and GeoJSON) uses `[lng, lat]` — NOT `[lat, lng]` (Leaflet order).

```js
// WRONG (Leaflet order)
ol.proj.fromLonLat([50.1167, 14.4178])  // Turkmenistan

// CORRECT
ol.proj.fromLonLat([14.4178, 50.1167])  // Prague
```

---

## Common Patterns

### Pattern: Safe Feature Query at Click

```js
map.on('click', (e) => {
  const features = [];
  map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
    features.push({ feature, layer });
  });

  if (features.length > 0) {
    const { feature } = features[0];
    popup.setPosition(e.coordinate);
    popupEl.innerHTML = `<b>${feature.get('name')}</b>`;
  } else {
    popup.setPosition(undefined);
  }
});
```

### Pattern: Hover Cursor Change

```js
map.on('pointermove', (e) => {
  const hit = map.hasFeatureAtPixel(e.pixel);
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});
```

### Pattern: Hover Highlight

```js
let highlighted = null;
const highlightStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({ color: '#FF0000', width: 3 }),
  fill: new ol.style.Fill({ color: 'rgba(255, 0, 0, 0.1)' })
});

map.on('pointermove', (e) => {
  if (highlighted) {
    highlighted.setStyle(null);  // reset to layer style
    highlighted = null;
  }

  map.forEachFeatureAtPixel(e.pixel, (feature) => {
    highlighted = feature;
    feature.setStyle(highlightStyle);
    return true;  // stop after first hit
  });
});
```

### Pattern: Fit Map to Features

```js
function fitToFeatures(map, source) {
  const extent = source.getExtent();
  if (!ol.extent.isEmpty(extent)) {
    map.getView().fit(extent, {
      padding: [50, 50, 50, 50],
      duration: 1000
    });
  }
}
```

### Pattern: Geocode and Place Marker

```js
async function searchAndMark(map, query, markerSource) {
  markerSource.clear();

  const response = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=YOUR_MAPTILER_KEY&limit=1`
  );
  const data = await response.json();

  if (data.features.length === 0) return;

  const [lng, lat] = data.features[0].geometry.coordinates;
  const center = ol.proj.fromLonLat([lng, lat]);

  const feature = new ol.Feature({
    geometry: new ol.geom.Point(center),
    name: data.features[0].place_name
  });
  markerSource.addFeature(feature);

  map.getView().animate({ center, zoom: 14, duration: 1000 });
}
```

### Pattern: Layer Visibility Toggle

```js
function toggleLayer(layer, visible) {
  layer.setVisible(visible);
}

// With opacity fade
function fadeLayer(layer, targetOpacity, duration = 500) {
  const start = layer.getOpacity();
  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    layer.setOpacity(start + (targetOpacity - start) * progress);
    if (progress < 1) requestAnimationFrame(animate);
  }
  animate();
}
```

### Pattern: Export Map as Image

```js
map.once('rendercomplete', () => {
  const canvas = document.createElement('canvas');
  const size = map.getSize();
  canvas.width = size[0];
  canvas.height = size[1];
  const ctx = canvas.getContext('2d');

  document.querySelectorAll('.ol-layer canvas').forEach((layerCanvas) => {
    if (layerCanvas.width > 0) {
      const opacity = layerCanvas.parentNode.style.opacity || 1;
      ctx.globalAlpha = opacity;
      ctx.drawImage(layerCanvas, 0, 0);
    }
  });

  const link = document.createElement('a');
  link.download = 'map.png';
  link.href = canvas.toDataURL();
  link.click();
});

map.renderSync();
```

### Pattern: Custom Control

```js
class InfoControl extends ol.control.Control {
  constructor(options = {}) {
    const element = document.createElement('div');
    element.className = 'ol-control info-control';
    element.innerHTML = '<button title="Info">i</button>';

    super({ element, target: options.target });

    element.querySelector('button').addEventListener('click', () => {
      alert('Map info');
    });
  }
}

map.addControl(new InfoControl());
```

### Pattern: Debounced Move Handler

```js
let moveTimeout;
map.getView().on('change:center', () => {
  clearTimeout(moveTimeout);
  moveTimeout = setTimeout(() => {
    const [lng, lat] = ol.proj.toLonLat(map.getView().getCenter());
    const zoom = map.getView().getZoom();
    loadDataForView(lng, lat, zoom);
  }, 300);
});
```

### Pattern: Save/Restore Map View

```js
function saveView(map) {
  const view = map.getView();
  const [lng, lat] = ol.proj.toLonLat(view.getCenter());
  localStorage.setItem('mapView', JSON.stringify({
    lng, lat,
    zoom: view.getZoom(),
    rotation: view.getRotation()
  }));
}

function restoreView(map) {
  const saved = localStorage.getItem('mapView');
  if (!saved) return false;
  const { lng, lat, zoom, rotation } = JSON.parse(saved);
  map.getView().setCenter(ol.proj.fromLonLat([lng, lat]));
  map.getView().setZoom(zoom);
  if (rotation) map.getView().setRotation(rotation);
  return true;
}
```

### Pattern: Distance Measurement

```js
function measureDistance(coords3857) {
  const line = new ol.geom.LineString(coords3857);
  const length = ol.sphere.getLength(line);
  return length; // meters
}

// From geographic coordinates
const line = new ol.geom.LineString([
  ol.proj.fromLonLat([14.4178, 50.1167]),
  ol.proj.fromLonLat([16.6068, 49.1951])
]);
console.log(`${(ol.sphere.getLength(line) / 1000).toFixed(1)} km`);
```

### Pattern: Resize Handler

```js
const observer = new ResizeObserver(() => map.updateSize());
observer.observe(document.getElementById('map'));
```

---

## Debugging Tips

### Log Map State

```js
map.getView().on('change:center', () => {
  const [lng, lat] = ol.proj.toLonLat(map.getView().getCenter());
  console.log(`Center: [${lng.toFixed(4)}, ${lat.toFixed(4)}], Zoom: ${map.getView().getZoom().toFixed(1)}`);
});
```

### List All Layers

```js
map.getLayers().forEach((layer, index) => {
  console.log(`Layer ${index}:`, layer.constructor.name, 'visible:', layer.getVisible());
});
```

### Check Map Extent

```js
const extent = map.getView().calculateExtent(map.getSize());
const [west, south, east, north] = ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
console.log(`Bounds: [${west.toFixed(4)}, ${south.toFixed(4)}, ${east.toFixed(4)}, ${north.toFixed(4)}]`);
```

### Count Features in Source

```js
const count = vectorSource.getFeatures().length;
console.log(`Features: ${count}`);
```

### Inspect Feature at Click

```js
map.on('click', (e) => {
  map.forEachFeatureAtPixel(e.pixel, (feature) => {
    console.log('Properties:', feature.getProperties());
    console.log('Geometry:', feature.getGeometry().getType());
    console.log('Coords (4326):', ol.proj.toLonLat(feature.getGeometry().getCoordinates()));
  });
});
```
