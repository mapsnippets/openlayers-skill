# OpenLayers Skill References Index 📚🌐

This catalog lists the deep-dive architectural and API references available in the `openlayers-skill`.

---

## 📑 Complete Catalog

### Core API Specifications (Official OpenLayers Reference):
1. **[api-map-and-view.md](api-map-and-view.md)** — `ol/Map`, `ol/View`, `ol/Overlay`, view animations, resolutions, and complete event dictionary.
2. **[api-layers-and-sources.md](api-layers-and-sources.md)** — `TileLayer`, `VectorLayer`, `VectorTileLayer`, `WebGLPoints`, `Heatmap`, `Cluster`, and tile sources.
3. **[api-styling-and-renderers.md](api-styling-and-renderers.md)** — `ol/style/Style`, `Fill`, `Stroke`, `Icon`, `Text`, dynamic style functions, Flat Style Expressions.
4. **[api-interactions-and-controls.md](api-interactions-and-controls.md)** — `Draw`, `Modify`, `Select`, `Snap`, `Translate`, `ScaleLine`, custom UI controls.
5. **[api-projections-and-geom.md](api-projections-and-geom.md)** — `ol/proj` (`fromLonLat`, `toLonLat`), `proj4` registration, `ol/geom/*`, `ol/format/GeoJSON`.

### Practical Guides & Modern Workflows:
6. **[installation-and-cdn.md](installation-and-cdn.md)** — NPM/yarn/bun package setup, types, and standalone CDN scripts.
7. **[vector-tiles-mapbox-style.md](vector-tiles-mapbox-style.md)** — Applying Mapbox/MapLibre Style JSON via `ol-mapbox-style` (`apply`).
8. **[frameworks.md](frameworks.md)** — React (`useRef`/`useEffect`), Next.js App Router SSR fix, Svelte, and Vue 3.
9. **[patterns-gotchas.md](patterns-gotchas.md)** — Solutions for the top 10 OpenLayers bugs (Null Island coordinates, projection mismatch, double-mount).
10. **[prompt-benchmarks.md](prompt-benchmarks.md)** — 10 practical prompt benchmarks for evaluation.

### Basemaps, Schemas & Services:
11. **[vector-tile-schemas.md](vector-tile-schemas.md)** — Full 9-schema vector catalog (`Planet v4`, `Outdoor`, `Contours`, `3D Buildings`, `Ocean`, `Cadastre`).
12. **[basemaps-and-terrain.md](basemaps-and-terrain.md)** — Production endpoints for `streets-v4`, `outdoor-v4`, `satellite-v4`, and 512px raster tiles.
13. **[geocoding-and-services.md](geocoding-and-services.md)** — Forward/reverse geocoding, autocomplete search, static maps, and elevation.
