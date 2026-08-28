# OpenLayers Working Examples Directory 🌐🧪

This directory contains standalone, production-ready code examples demonstrating the most critical workflows in OpenLayers.

---

## 📂 Catalog of Working Examples:

1. **[`01_basic_vector_map.html`](01_basic_vector_map.html)** — Crisp vector basemap rendered with `ol-mapbox-style` and MapTiler `streets-v4`.
2. **[`02_raster_xyz_and_popup.html`](02_raster_xyz_and_popup.html)** — 512px High-DPI raster tiles with animated `ol/Overlay` popup and autoPan.
3. **[`03_geojson_choropleth.html`](03_geojson_choropleth.html)** — GeoJSON polygon rendering, dynamic fee-tier styling, and pointer hover highlights.
4. **[`04_marker_clustering.html`](04_marker_clustering.html)** — High-performance point clustering with tiered count circles and click-to-fit zooming.
5. **[`08_layer_swipe_comparison.html`](08_layer_swipe_comparison.html)** — Split-screen vertical swipe comparison slider between street vector tiles and satellite imagery.
6. **[`12_react_nextjs_component.tsx`](12_react_nextjs_component.tsx)** — Production React / Next.js App Router component with `useRef`, `ResizeObserver`, and `setTarget(null)` teardown.

---

## 🚀 How to Run Locally

Open any `.html` file directly in your browser or serve with:
```bash
npx serve .
# or
python -m http.server 8000
```
> **Note:** Replace `YOUR_API_KEY` with your free key from [MapTiler Cloud](https://docs.maptiler.com/cloud/api/authentication-key/).
