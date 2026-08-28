# OpenLayers AI Skill 🌐🤖

> Official **OpenLayers** skill for AI coding assistants (Cursor, Claude Code, Antigravity, GitHub Copilot, Cline).

Maintained by **[MapSnippets](https://mapsnippets.com/)**.

---

## 📌 Overview

This skill provides comprehensive instructions, idiomatic patterns, and guardrails for building scalable, enterprise GIS web mapping applications with **pure native [OpenLayers](https://openlayers.org/)** (v9–v10+).

### Core Capabilities Covered:
* **Modern Modular Architecture:** `ol/Map`, `ol/View`, `ol/layer/Vector`, `ol/layer/VectorTile`, `ol/source`.
* **Vector Tile Styles:** Applying Mapbox Style JSON specifications to OpenLayers using `ol-mapbox-style` (`apply` / `applyStyle`).
* **Coordinate Projections & Transforms:** Seamless projection handling (`EPSG:3857`, `EPSG:4326`, local national grids with `proj4`).
* **Vector Data & GeoJSON:** Dynamic vector rendering, spatial querying, feature properties, cluster sources (`ol/source/Cluster`).
* **Interactive Tools:** Feature selection, drawing (`ol/interaction/Draw`), modifying, snap interactions, and overlays/popups (`ol/Overlay`).
* **Performance & WebGL:** Optimizing large point datasets, render buffers, vector tile caching.

---

## ⚡ Quick Start / Installation

### Cursor
Add to your project rules in `.cursor/rules/openlayers.mdc` or project instructions.

### Claude Code / Anthropic Projects
Add the `SKILL.md` content to your Project Instructions or system prompt.

### Antigravity / Agents
Clone or symlink into `.agents/skills/openlayers/`:
```bash
git clone https://github.com/mapsnippets/openlayers-skill.git .agents/skills/openlayers
```

---

## 🗺️ Recommended Basemap Defaults

### Vector Tiles via `ol-mapbox-style` (Recommended):
```javascript
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import { apply } from "ol-mapbox-style";
import "ol/ol.css";

const map = new Map({
  target: "map",
  view: new View({
    center: fromLonLat([14.4378, 50.0755]), // [lng, lat]
    zoom: 12
  })
});

apply(map, "https://api.maptiler.com/maps/streets-v2/style.json?key=YOUR_MAPTILER_API_KEY");
```

---

## 📄 License
MIT © [MapSnippets](https://mapsnippets.com/)
