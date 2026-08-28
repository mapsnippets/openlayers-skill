# OpenLayers Framework Integration

Same core pattern everywhere: create a map on mount, call `map.setTarget(undefined)` on unmount. OpenLayers uses canvas rendering — **client-side only**.

---

## React

No official React wrapper — use OpenLayers directly (it works great with hooks).

```bash
npm install ol
```

### Basic Usage

```jsx
import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

function MapComponent() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return; // Strict Mode guard

    mapRef.current = new Map({
      target: containerRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY',
            attributions: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          })
        })
      ],
      view: new View({
        center: fromLonLat([14.4178, 50.1167]),
        zoom: 12
      })
    });

    return () => {
      mapRef.current?.setTarget(undefined);
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '400px' }} />;
}
```

**Strict Mode**: React 18 fires `useEffect` twice in dev. The `if (mapRef.current) return` guard + `null` reset in cleanup is essential.

### Adding Layers Dynamically

```jsx
import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import 'ol/ol.css';

function GeoJSONMap({ data }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const vectorLayerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    vectorLayerRef.current = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: '#0891b2' }),
          stroke: new Stroke({ color: '#fff', width: 2 })
        })
      })
    });

    mapRef.current = new Map({
      target: containerRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY',
            attributions: '&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
          })
        }),
        vectorLayerRef.current
      ],
      view: new View({ center: fromLonLat([14.4178, 50.1167]), zoom: 10 })
    });

    return () => {
      mapRef.current?.setTarget(undefined);
      mapRef.current = null;
    };
  }, []);

  // Update data when prop changes
  useEffect(() => {
    if (!vectorLayerRef.current || !data) return;
    const source = vectorLayerRef.current.getSource();
    source.clear();
    const features = new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(data);
    source.addFeatures(features);
  }, [data]);

  return <div ref={containerRef} style={{ width: '100%', height: '400px' }} />;
}
```

### Next.js

OpenLayers requires `window`/`document` — use dynamic import with SSR disabled:

```jsx
// components/Map.jsx
"use client";
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapView'), { ssr: false });
export default MapView;
```

Env: `NEXT_PUBLIC_MAPTILER_KEY`

---

## Vue 3

```bash
npm install ol
```

### Basic Usage

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

const container = ref(null);
let map = null;  // plain let, NOT ref() — Vue reactivity on map causes issues

onMounted(() => {
  map = new Map({
    target: container.value,
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY',
          attributions: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        })
      })
    ],
    view: new View({ center: fromLonLat([14.4178, 50.1167]), zoom: 12 })
  });
});

onUnmounted(() => {
  map?.setTarget(undefined);
  map = null;
});
</script>

<template>
  <div ref="container" style="width: 100%; height: 400px" />
</template>
```

### Vue Composable

```js
// composables/useOlMap.js
import { ref, onMounted, onUnmounted } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';

export function useOlMap(containerRef, options = {}) {
  let map = null;
  const loaded = ref(false);

  onMounted(() => {
    const style = options.style || 'streets-v4';
    map = new Map({
      target: containerRef.value,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://api.maptiler.com/maps/${style}/256/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY`,
            attributions: '&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
          })
        })
      ],
      view: new View({
        center: fromLonLat(options.center || [14.4178, 50.1167]),
        zoom: options.zoom || 12
      })
    });

    map.once('rendercomplete', () => { loaded.value = true; });
  });

  onUnmounted(() => { map?.setTarget(undefined); map = null; });

  return { getMap: () => map, loaded };
}
```

### Nuxt SSR

Wrap with `<ClientOnly>`:

```vue
<template>
  <ClientOnly>
    <MapView />
  </ClientOnly>
</template>
```

---

## Angular

```bash
npm install ol
```

```typescript
import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map',
  template: `<div #mapEl style="width: 100%; height: 400px"></div>`,
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapEl', { static: true }) mapEl!: ElementRef;
  private map!: Map;

  ngAfterViewInit() {
    this.map = new Map({
      target: this.mapEl.nativeElement,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY',
            attributions: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          })
        })
      ],
      view: new View({
        center: fromLonLat([14.4178, 50.1167]),
        zoom: 12
      })
    });
  }

  ngOnDestroy() {
    this.map?.setTarget(undefined);
  }
}
```

Add OpenLayers CSS in `angular.json`:
```json
"styles": [
  "node_modules/ol/ol.css",
  "src/styles.css"
]
```

**SSR (Angular Universal):** Guard with `isPlatformBrowser()` or use `afterNextRender()`.

---

## Svelte

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import Map from 'ol/Map';
  import View from 'ol/View';
  import TileLayer from 'ol/layer/Tile';
  import XYZ from 'ol/source/XYZ';
  import { fromLonLat } from 'ol/proj';
  import 'ol/ol.css';

  let mapContainer;
  let map;

  onMount(() => {
    map = new Map({
      target: mapContainer,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY',
            attributions: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          })
        })
      ],
      view: new View({
        center: fromLonLat([14.4178, 50.1167]),
        zoom: 12
      })
    });
  });

  onDestroy(() => { map?.setTarget(undefined); });
</script>

<div bind:this={mapContainer} style="width: 100%; height: 400px;" />
```

**SvelteKit SSR:** `onMount` only runs client-side, so imports are safe.

---

## Cleanup Checklist

1. **Always call `map.setTarget(undefined)` on unmount** — prevents canvas leaks
2. **Guard against double initialization** — React Strict Mode, HMR, SPA navigation
3. **`height` is required** — container must have explicit CSS height
4. **SSR guard** — OpenLayers needs `window`/`document`; use dynamic import or client-only wrappers
5. **Do NOT wrap map instance in Vue `ref()`/`reactive()`** — Vue proxy breaks internals

## Env Var Quick Reference

| Tool | Prefix | Access |
|------|--------|--------|
| Vite | `VITE_` | `import.meta.env.VITE_MAPTILER_KEY` |
| Next.js | `NEXT_PUBLIC_` | `process.env.NEXT_PUBLIC_MAPTILER_KEY` |
| CRA | `REACT_APP_` | `process.env.REACT_APP_MAPTILER_KEY` |
| Angular | — | `environment.ts` |
| SvelteKit | `PUBLIC_` | `$env/static/public` |
