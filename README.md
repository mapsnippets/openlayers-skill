# OpenLayers — Agent Skill 🌐🤖

[![Agent Skills Specification](https://img.shields.io/badge/Agent_Skills-Specification_Compliant-0084FF?logo=anthropic&logoColor=white)](https://agentskills.io/specification)
[![Claude Code Plugin](https://img.shields.io/badge/Claude_Code-Plugin_v1.1.0-7952B3?logo=anthropic&logoColor=white)](https://code.claude.com)
[![Skills CLI](https://img.shields.io/badge/Skills_CLI-npx_skills_add-success)](https://github.com/vercel-labs/skills)
[![OpenLayers](https://img.shields.io/badge/OpenLayers-v10.10.0-1F6B75)](https://openlayers.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE.md)

> Open-source **OpenLayers** AI skill for coding assistants (Claude Code, Cursor, Antigravity, GitHub Copilot, Windsurf, Roo Code, Gemini CLI). Built in accordance with the open **[Agent Skills Specification](https://agentskills.io/)**.

Maintained by **[MapSnippets](https://mapsnippets.org/)** — Open-source geospatial snippets, guides, and agent tools.

---

🌐 [Website](https://mapsnippets.org/) &nbsp; 📚 [OpenLayers Documentation](https://openlayers.org/doc/) &nbsp; 📋 [Agent Skills Standard](https://agentskills.io/)

---



## 💡 Overview & Capabilities

An **Agent Skill** is on-demand domain expertise: AI assistants load it dynamically when a task requires specialized geospatial knowledge, replacing guesswork and hallucinated legacy APIs with verified patterns.

When activated for **OpenLayers**, this skill guides the agent to:

- **Generate modern modular OpenLayers code** (v9–v10+) using standard ES module imports (`ol/Map`, `ol/View`, `ol/layer/Tile`, `ol/layer/Vector`, `ol/source/XYZ`).
- **Render Vector Tile styles seamlessly** using `ol-mapbox-style` (`apply` / `applyStyle`) with standard vector style JSON.
- **Configure high-DPI Raster Tiles** using `ol/source/XYZ` with custom tile sizes, retina scaling (`@2x`), and proper copyright attributions.
- **Handle coordinate systems & projections reliably** (`EPSG:3857`, `EPSG:4326`, and custom national grids using `proj4` and `ol/proj`).
- **Implement interactive GIS tools** — feature selection, drawing (`ol/interaction/Draw`), polygon modification, vertex snapping, and HTML overlays (`ol/Overlay`).
- **Optimize heavy vector data rendering** using `ol/source/Cluster` and WebGL-accelerated point layers (`ol/layer/WebGLPoints`).
- **Prevent common architecture pitfalls** — eliminates legacy global `ol.*` patterns, resolves asynchronous vector layer styling, and ensures clean resource disposal in modern frontend frameworks (React, Vue, Svelte).

<br>

## 🧠 How Agent Skills Work

This skill follows the **[Agent Skills open format](https://agentskills.io/)**, utilizing a **three-tier progressive disclosure model** to minimize context overhead:

```text
┌────────────────────────┐         Match Query         ┌────────────────────────┐         As Needed          ┌───────────────────────────────────┐
│ 1. Discovery (Startup) │ ──────────────────────────> │ 2. Activation (Load)   │ ─────────────────────────> │ 3. Execution (Deep Dive)          │
│    name & description  │                             │    SKILL.md router     │                            │    Modular References & Recipes   │
└────────────────────────┘                             └────────────────────────┘                            └───────────────────────────────────┘
```

1. **Discovery (Startup)**: The agent only inspects the YAML frontmatter `name` and `description` (~50 tokens).
2. **Activation (Task Identified)**: When your prompt mentions OpenLayers, modular `ol/*` imports, vector tiles, or reprojection, the agent loads `skills/openlayers/SKILL.md` (< 2,850 tokens).
3. **Execution (Deep Dive)**: The agent traverses targeted guides in `references/` or runnable recipes in `examples/` on demand, without polluting your context window.

<br>

## 🎯 Example Prompts That Trigger This Skill

You don't need special commands to use this skill. Any natural language request matching its capabilities will trigger it:

- *"Create an interactive vector basemap in React using OpenLayers."*
- *"How do I reproject a British National Grid (EPSG:27700) GeoJSON polygon into standard Web Mercator in OpenLayers?"*
- *"Add a vector layer with drawing and vertex editing tools so users can digitize custom polygons."*
- *"Implement high-density marker clustering with dynamic cluster count badges and spiderfy clicks in OpenLayers."*
- *"Render a Cloud-Optimized GeoTIFF (COG) in OpenLayers with true color satellite bands."*

<br>

## 📦 Installation

### Option 1: Universal — via Skills CLI (Recommended)

Works across Claude Code, Cursor, Windsurf, Gemini CLI, Antigravity, and dozens of other AI coding tools. The [Skills CLI](https://github.com/vercel-labs/skills) auto-detects your active environments:

```bash
npx skills add mapsnippets/openlayers-skill
```

<br>

### Option 2: Claude Code Plugin

Install directly via the Claude Code plugin marketplace:

```bash
/plugin marketplace add mapsnippets/openlayers-skill
/plugin install openlayers-skill@openlayers-skill
/reload-plugins
```

<br>

### Option 3: Manual Installation by Client

Copy or symlink the `skills/openlayers` directory into your agent's configured skills path:

| Agent / Tool | Target Directory | Install Command |
| :--- | :--- | :--- |
| **Cursor** | `.cursor/skills/openlayers` | `mkdir -p .cursor/skills && cp -r skills/openlayers .cursor/skills/` |
| **VS Code / Copilot** | `.agents/skills/openlayers` | `mkdir -p .agents/skills && cp -r skills/openlayers .agents/skills/` |
| **Gemini CLI / Antigravity** | `~/.gemini/skills/openlayers` | `mkdir -p ~/.gemini/skills && cp -r skills/openlayers ~/.gemini/skills/` |
| **Windsurf (Cascade)** | `.windsurf/skills/openlayers` | `mkdir -p .windsurf/skills && cp -r skills/openlayers .windsurf/skills/` |
| **Roo Code / Cline** | `.roo/skills/openlayers` | `mkdir -p .roo/skills && cp -r skills/openlayers .roo/skills/` |
| **OpenHands** | `.agents/skills/openlayers` | `mkdir -p .agents/skills && cp -r skills/openlayers .agents/skills/` |

<br>

## 📘 Repository Architecture

This repository strictly conforms to the [Agent Skills specification](https://agentskills.io/specification) (`dir_name == name`):

```text
mapsnippets/openlayers-skill/
├── .claude-plugin/
│   ├── marketplace.json    — Claude Code marketplace catalog manifest (v1.1.0)
│   └── plugin.json         — Claude Code plugin manifest & metadata (v1.1.0)
├── skills/
│   └── openlayers/
│       ├── SKILL.md        — Entry point prompt & progressive disclosure router (< 200 lines)
│       ├── evals/
│       │   └── evals.json  — Machine-readable evaluation benchmarks (5 core test cases)
│       ├── examples/       — 61 standalone runnable recipes (HTML/CSS/JS)
│       │   ├── INDEX.md    — Curated categorized catalog of all recipes
│       │   └── ...         — Vector tiles, drawing tools, clustering, GeoTIFF, WMS
│       └── references/     — 21 deep technical reference guides & API specifications
│           ├── INDEX.md    — Searchable index of references
│           ├── versions.md — Single source of truth for library releases & styles
│           └── ...         — modular imports, vector tile styling, projections, interactions
├── README.md               — Project documentation & setup guide
└── LICENSE.md              — MIT License
```

<br>

## 🗺️ Quickstart Examples

### Vector Tiles via `ol-mapbox-style` (Recommended):

```javascript
import Map from "ol/Map.js";
import View from "ol/View.js";
import { fromLonLat } from "ol/proj.js";
import { apply } from "ol-mapbox-style";
import "ol/ol.css";

const map = new Map({
  target: "map",
  view: new View({
    center: fromLonLat([14.4378, 50.0755]), // [longitude, latitude]
    zoom: 12
  })
});

apply(map, "https://api.maptiler.com/maps/streets-v4/style.json?key=YOUR_API_KEY");
```

<br>

### High-DPI Raster Tiles via `ol/source/XYZ`:

```javascript
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import { fromLonLat } from "ol/proj.js";
import "ol/ol.css";

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new XYZ({
        url: "https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY",
        tileSize: 512,
        maxZoom: 19,
        attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      })
    })
  ],
  view: new View({
    center: fromLonLat([14.4378, 50.0755]),
    zoom: 12
  })
});
```

<br>

## 🔑 Basemap API Keys

The examples and recipes in this skill utilize basemaps from **MapTiler**, which is free for use:
- Get a free API key at [MapTiler Cloud](https://docs.maptiler.com/cloud/api/authentication-key/) (the free tier includes 100,000 requests/month with no credit card required).
- Replace `YOUR_API_KEY` in the snippets with your active key to load live basemaps.

<br>

## 🧪 Evaluation & Validation

This skill includes an automated evaluation benchmark suite in `skills/openlayers/evals/evals.json` covering:
1. Modern Interactive Vector Basemap (modular ES imports, clean street styling)
2. Interactive Geometry Digitization (Draw, Modify, and magnetic Snap interactions)
3. High-Performance Point Clustering (dynamic count badges, zoom to extent)
4. Split-Screen Layer Swipe Comparison (real-time canvas event clipping)
5. Cloud-Optimized GeoTIFF (COG) Ingestion (WebGLTileLayer with band expressions)

To validate compliance against the Agent Skills specification using the reference validator:

```bash
npx @agentskills/skills-ref validate skills/openlayers
```

<br>

## Links

- 🌐 [MapSnippets Community](https://mapsnippets.org/)
- 📚 [OpenLayers Documentation](https://openlayers.org/doc/)
- 📋 [Agent Skills Specification](https://agentskills.io/)
- 🐙 [GitHub Repository](https://github.com/mapsnippets/openlayers-skill)

<br>

## 🍴 Forking & Customization

This repository is maintained by [MapSnippets](https://mapsnippets.org/) for automated distribution to AI coding agents. To keep maintenance lightweight and reliable, external pull requests and code contributions are not accepted.

However, you are completely free to fork, customize, and extend this skill for your own private agents, corporate workflows, or specialized mapping tools under the permissive [MIT License](./LICENSE.md).

<br>

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE.md) file for details.

<br>

<p align="center">
  Maintained with ❤️ by <a href="https://mapsnippets.org/">MapSnippets</a> — Open web mapping tools & agent skills.
</p>
