# OpenLayers — Agent Skill 🌐🤖

> Official **OpenLayers** skill for AI coding assistants (Cursor, Claude Code, Antigravity, GitHub Copilot, Windsurf, Cline).

Maintained by **[MapSnippets](https://mapsnippets.org/)** — Open-source geospatial snippets, guides, and agent tools.

---

🌐 [Website](https://mapsnippets.org/) &nbsp; 📚 [OpenLayers Documentation](https://openlayers.org/doc/)

---

<br>

<details>
<summary><b>Table of Contents</b></summary>
<ul>
<li><a href="#what-it-does">What it does</a></li>
<li><a href="#how-skills-plugins-and-agents-fit-together">How skills, plugins, and agents fit together</a></li>
<li><a href="#-installation">Installation</a></li>
<li><a href="#-repository-layout">Repository layout</a></li>
<li><a href="#-quickstart-examples">Quickstart Examples</a></li>
<li><a href="#-basemap-api-keys">Basemap API Keys</a></li>
<li><a href="#links">Links</a></li>
<li><a href="#-contributing">Contributing</a></li>
<li><a href="#-license">License</a></li>
</ul>
</details>

<br>

## What it does

A skill is on-demand expertise: the agent loads it only when your request matches the skill's description, then follows its instructions instead of guessing. When you ask for OpenLayers maps, vector tiles, raster XYZ layers, projections, coordinate transforms, drawing tools, or spatial analysis, this skill makes the agent:

- **Generate modern modular OpenLayers code** (v9–v10+) using standard ES module imports (`ol/Map`, `ol/View`, `ol/layer/Tile`, `ol/layer/Vector`, `ol/source/XYZ`).
- **Render Vector Tile styles seamlessly** using `ol-mapbox-style` (`apply` / `applyStyle`) with standard vector style JSON (`streets-v4`).
- **Configure high-DPI Raster Tiles** using `ol/source/XYZ` with custom tile sizes, retina scaling, and attributions.
- **Handle coordinate systems & projections reliably** (`EPSG:3857`, `EPSG:4326`, and custom national grids with `proj4` and `ol/proj`).
- **Implement interactive GIS tools** — feature selection, drawing (`ol/interaction/Draw`), modification, snapping, and HTML overlays (`ol/Overlay`).
- **Optimize heavy vector data rendering** using `ol/source/Cluster` and WebGL-accelerated point layers.
- **Prevent common architecture pitfalls** — eliminates legacy global `ol.*` patterns, resolves asynchronous vector layer styling, and ensures clean cleanup in modern frontend frameworks.

<br>

## How skills, plugins, and agents fit together

1. **The skill** is the portable content: a `SKILL.md` plus a `references/` folder. This is what every AI agent reads.
2. **The plugin** is a Claude Code–specific wrapper for distributing the skill through a marketplace.
3. **The agent** (Claude Code, Gemini CLI, Cursor, Antigravity, Windsurf…) loads the skill from its designated skills directory.

<br>

## 📦 Installation

### Universal — via Skills CLI

Works with Claude Code, Cursor, Gemini CLI, Windsurf, and dozens of other agents. The [Skills CLI](https://github.com/vercel-labs/skills) auto-detects which agents you have installed:

```bash
npx skills add mapsnippets/openlayers-skill
```

### Claude Code — as a plugin

Add the marketplace, install the plugin, then reload:

```bash
/plugin marketplace add mapsnippets/openlayers-skill
/plugin install openlayers-skill@openlayers-skill
/reload-plugins
```

### Gemini CLI & Antigravity

Install directly from the repository:

#### Windows (PowerShell)
```powershell
git clone https://github.com/mapsnippets/openlayers-skill.git; mkdir "$HOME\.gemini\skills\openlayers" -Force; cp -Recurse openlayers-skill\skills\* "$HOME\.gemini\skills\openlayers\"; rm -Recurse -Force openlayers-skill
```

#### Linux & macOS (bash)
```bash
git clone https://github.com/mapsnippets/openlayers-skill.git && mkdir -p ~/.gemini/skills/openlayers && cp -r openlayers-skill/skills/* ~/.gemini/skills/openlayers/ && rm -rf openlayers-skill
```

### Cursor

Project-scoped. Copy the skill folder into your project's skills directory:

```bash
mkdir -p .cursor/skills && cp -r skills/openlayers .cursor/skills/
```

### Windsurf

Project-scoped, read by Cascade:

```bash
mkdir -p .windsurf/skills && cp -r skills/openlayers .windsurf/skills/
```

---

<br>

## 📘 Repository layout

```text
.claude-plugin/
  marketplace.json    — Claude Code marketplace manifest
  plugin.json         — Claude Code plugin manifest
skills/
  openlayers/
    SKILL.md          — Main skill prompt entry point
    references/       — Deep technical reference guides (loaded on demand)
README.md             — This guide
LICENSE.md            — MIT License
```

<br>

## 🗺️ Quickstart Examples

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

apply(map, "https://api.maptiler.com/maps/streets-v4/style.json?key=YOUR_API_KEY");
```

### Raster Tiles via `ol/source/XYZ`:
```javascript
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new XYZ({
        url: "https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY",
        tileSize: 512,
        maxZoom: 22,
        attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      })
    })
  ],
  view: new View({
    center: fromLonLat([14.4378, 50.0755]), // [lng, lat]
    zoom: 12
  })
});
```

<br>

## 🔑 Basemap API Keys

The vector and raster tile examples in this skill utilize MapTiler basemap styles. To run the examples with live map tiles:
- Follow the guide on [how to get a free MapTiler API Key](https://docs.maptiler.com/cloud/api/authentication-key/) (includes a free plan with 100,000 monthly tile requests).
- Replace `YOUR_API_KEY` in the snippet with your key.

---

<br>

## Links

- 🌐 [MapSnippets Community](https://mapsnippets.org/)
- 🌐 [OpenLayers Documentation](https://openlayers.org/doc/)
- 🐙 [GitHub Repository](https://github.com/mapsnippets/openlayers-skill)

---

<br>

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests with improved snippets and documentation.

<br>

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE.md) file for details.

<br>

<p align="center">
  Maintained by <a href="https://mapsnippets.org/">MapSnippets</a> — Open web mapping tools & snippets.
</p>
