# MapTiler Cloud APIs — OpenLayers Reference

Unlike MapTiler SDK, OpenLayers has no built-in API wrappers. Use `fetch()` to call MapTiler REST endpoints.

> [REST API docs](https://docs.maptiler.com/cloud/api/) · [API keys](https://cloud.maptiler.com/account/keys/)

All endpoints use base URL `https://api.maptiler.com/` with `?key=YOUR_MAPTILER_KEY`.

---

## 1. Geocoding

### Forward Geocoding (search places)

```
GET https://api.maptiler.com/geocoding/{query}.json?key=YOUR_MAPTILER_KEY
```

```javascript
async function geocodeForward(query, options = {}) {
  const params = new URLSearchParams({
    key: 'YOUR_MAPTILER_KEY',
    limit: options.limit || 5,
    ...(options.language && { language: options.language }),
    ...(options.country && { country: options.country.join(',') }),
    ...(options.bbox && { bbox: options.bbox.join(',') }),
    ...(options.proximity && { proximity: options.proximity.join(',') }),
    ...(options.types && { types: options.types.join(',') })
  });

  const response = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?${params}`
  );
  return response.json();
}

// Usage with OpenLayers
const result = await geocodeForward('Prague Castle', { language: 'en', limit: 5 });

// Result structure (GeoJSON FeatureCollection)
// result.features[0].geometry.coordinates → [lng, lat]
// result.features[0].place_name → "Prague Castle, Prague, Czech Republic"
// result.features[0].center → [lng, lat]
// result.features[0].bbox → [west, south, east, north]

// Place on OpenLayers map — MUST transform coordinates
const [lng, lat] = result.features[0].geometry.coordinates;
const center = ol.proj.fromLonLat([lng, lat]);
map.getView().animate({ center, zoom: 14, duration: 1000 });
```

### Reverse Geocoding (coordinates to address)

```
GET https://api.maptiler.com/geocoding/{lng},{lat}.json?key=YOUR_MAPTILER_KEY
```

```javascript
async function geocodeReverse(lng, lat, options = {}) {
  const params = new URLSearchParams({
    key: 'YOUR_MAPTILER_KEY',
    ...(options.language && { language: options.language }),
    ...(options.types && { types: options.types.join(',') })
  });

  const response = await fetch(
    `https://api.maptiler.com/geocoding/${lng},${lat}.json?${params}`
  );
  return response.json();
}

// Usage with OpenLayers click event
map.on('click', async (e) => {
  const [lng, lat] = ol.proj.toLonLat(e.coordinate);  // MUST transform back
  const result = await geocodeReverse(lng, lat, { language: 'en' });

  if (result.features.length > 0) {
    popup.setPosition(e.coordinate);
    popupEl.innerHTML = result.features[0].place_name;
  }
});
```

### Geocoding Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | string | API key (required) |
| `limit` | number | Max results (1-10, default 5) |
| `language` | string | Response language (e.g., `en`, `cs`, `de`) |
| `country` | string | Comma-separated ISO codes (e.g., `cz,sk`) |
| `bbox` | string | Bounding box `west,south,east,north` |
| `proximity` | string | Bias toward `lng,lat` |
| `types` | string | Filter by place type |
| `fuzzyMatch` | boolean | Enable fuzzy matching |
| `autocomplete` | boolean | Enable autocomplete mode |

### Place Types

`country`, `region`, `subregion`, `county`, `municipality`, `municipal_district`, `locality`, `neighbourhood`, `place`, `postal_code`, `address`, `road`, `poi`

---

## 2. Static Maps

Generate map images for thumbnails, emails, social cards.

### Centered

```
GET https://api.maptiler.com/maps/{style}/static/{lng},{lat},{zoom}/{width}x{height}.png?key=YOUR_MAPTILER_KEY
```

```javascript
function staticMapUrl(lng, lat, zoom, width, height, style = 'streets-v4') {
  return `https://api.maptiler.com/maps/${style}/static/${lng},${lat},${zoom}/${width}x${height}.png?key=YOUR_MAPTILER_KEY`;
}

const url = staticMapUrl(14.4178, 50.1167, 12, 800, 600);
document.getElementById('preview').src = url;
```

### With HiDPI

Add `@2x` before the extension:
```
.../800x600@2x.png?key=YOUR_MAPTILER_KEY
```

### Bounded (auto-fit to bbox)

```
GET https://api.maptiler.com/maps/{style}/static/{west},{south},{east},{north}/{width}x{height}.png?key=YOUR_MAPTILER_KEY
```

---

## 3. Geolocation (IP-based)

```
GET https://api.maptiler.com/geolocation/ip.json?key=YOUR_MAPTILER_KEY
```

```javascript
async function getVisitorLocation() {
  const response = await fetch(
    'https://api.maptiler.com/geolocation/ip.json?key=YOUR_MAPTILER_KEY'
  );
  const data = await response.json();

  // data.city, data.country, data.country_code
  // data.latitude, data.longitude

  const center = ol.proj.fromLonLat([data.longitude, data.latitude]);
  map.getView().animate({ center, zoom: 12, duration: 1000 });
  return data;
}
```

---

## 4. Tiles API

### Raster Tiles (used with ol.source.XYZ)

```
https://api.maptiler.com/maps/{style}/256/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY
https://api.maptiler.com/maps/{style}/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY  (512px)
```

### Vector Tiles (for ol-mapbox-style)

```
https://api.maptiler.com/maps/{style}/style.json?key=YOUR_MAPTILER_KEY
```

### Satellite Tiles

```
https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=YOUR_MAPTILER_KEY
```

### Terrain RGB Tiles (elevation data)

```
https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.webp?key=YOUR_MAPTILER_KEY
```

---

## 5. Coordinates API (CRS Transform)

```
GET https://api.maptiler.com/coordinates/transform/{lng},{lat}.json?key=YOUR_MAPTILER_KEY&target_crs=2154
```

```javascript
async function transformCoordinates(lng, lat, targetCrs) {
  const response = await fetch(
    `https://api.maptiler.com/coordinates/transform/${lng},${lat}.json?key=YOUR_MAPTILER_KEY&target_crs=${targetCrs}`
  );
  return response.json();
}
```

---

## Reusable Geocoding Helper for OpenLayers

```javascript
class MapTilerGeocoder {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.maptiler.com/geocoding';
  }

  async forward(query, options = {}) {
    const params = new URLSearchParams({
      key: this.apiKey,
      limit: options.limit || 5,
      ...(options.language && { language: options.language })
    });

    const res = await fetch(`${this.baseUrl}/${encodeURIComponent(query)}.json?${params}`);
    if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);
    return res.json();
  }

  async reverse(lng, lat, options = {}) {
    const params = new URLSearchParams({
      key: this.apiKey,
      ...(options.language && { language: options.language })
    });

    const res = await fetch(`${this.baseUrl}/${lng},${lat}.json?${params}`);
    if (!res.ok) throw new Error(`Reverse geocoding failed: ${res.status}`);
    return res.json();
  }

  // Convert geocoding result to OpenLayers coordinate (EPSG:3857)
  static toMapCoordinate(feature) {
    return ol.proj.fromLonLat(feature.geometry.coordinates);
  }

  // Convert geocoding result to EPSG:4326 [lng, lat]
  static toLonLat(feature) {
    return feature.geometry.coordinates;
  }
}

// Usage
const geocoder = new MapTilerGeocoder('YOUR_MAPTILER_KEY');
const result = await geocoder.forward('Brno');
const center = MapTilerGeocoder.toMapCoordinate(result.features[0]);
map.getView().animate({ center, zoom: 14, duration: 1000 });
```
