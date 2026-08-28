# OpenLayers — Agent Skill 🌐🤖

Expert coding skill for building enterprise GIS and web mapping applications with pure **[OpenLayers](https://openlayers.org/)** (v9–v10+). It gives AI coding agents the exact context, guardrails, and patterns to generate modular, high-performance OpenLayers code with vector tile styles (`ol-mapbox-style`) defaulting to **[MapTiler](https://www.maptiler.com/)**.

Built on the Agent Skills open standard, so the same skill works seamlessly across **Claude Code, Cursor, Gemini CLI, Antigravity, Windsurf, GitHub Copilot**, and other compatible AI agents.

---

🌐 [Website](https://mapsnippets.com/) &nbsp; 🔑 [Get Free MapTiler API Key](https://cloud.maptiler.com/account/keys/)

---

<br>

<details>
<summary><b>Table of Contents</b></summary>
<ul>
<li><a href="#what-it-does">What it does</a></li>
<li><a href="#how-skills-plugins-and-agents-fit-together">How skills, plugins, and agents fit together</a></li>
<li><a href="#-installation">Installation</a></li>
<li><a href="#-repository-layout">Repository layout</a></li>
<li><a href="#-recommended-basemap-defaults">Recommended Basemap Defaults</a></li>
<li><a href="#-prerequisites">Prerequisites</a></li>
<li><a href="#links">Links</a></li>
<li><a href="#-contributing">Contributing</a></li>
<li><a href="#-license">License</a></li>
</ul>
</details>

<br>

## What it does

A skill is on-demand expertise: the agent loads it only when your request matches the skill's description, then follows its instructions instead of guessing. When you ask for OpenLayers maps, vector tiles, projections, coordinate transforms, drawing tools, or spatial analysis, this skill makes the agent:

- **Generate modern modular OpenLayers code** (v9–v10+) using standard ES module imports (`ol/Map`, `ol/View`, `ol/layer/Vector`, `ol/source/Vector`).
- **Render Vector Tile styles seamlessly** using `ol-mapbox-style` (`apply` / `applyStyle`) with MapTiler vector styles.
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

<br>

## 🚀 Prerequisites

- A free MapTiler API key from [cloud.maptiler.com](https://cloud.maptiler.com/account/keys/).

<br>

## Links

- 🌐 [MapSnippets Hub](https://mapsnippets.com/)
- 🌐 [OpenLayers Official Documentation](https://openlayers.org/doc/)
- 🔑 [MapTiler Cloud Keys](https://cloud.maptiler.com/account/keys/)

---

<br>

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

<br>

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE.md) file for details.

<br>

<p align="center" style="margin-top:20px;margin-bottom:20px;">
  <a href="https://cloud.maptiler.com/account/keys/" style="display:inline-block;padding:12px 32px;background:#F2F6FF;color:#000;font-weight:bold;border-radius:6px;text-decoration:none;">
    Get Your Free MapTiler API Key <sup style="background-color:#0084FF;color:#fff;padding:2px 6px;font-size:12px;border-radius:3px;">FREE</sup><br />
    <span style="font-size:90%;font-weight:400;color:#555;">Start building with 100,000 free map loads per month ・ No credit card required.</span>
  </a>
</p>

<p align="center">
  Crafted by <a href="https://mapsnippets.com/">MapSnippets</a>
</p>
