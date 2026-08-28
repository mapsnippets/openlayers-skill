# OpenLayers API Reference — Interactions & Controls

Source: https://openlayers.org/en/latest/apidoc/module-ol_interaction_Interaction-Interaction.html

---

## 1. Vector Interactions (`ol/interaction/*`)

Interactions modify vector features in response to user gestures.

### `ol/interaction/Draw` (Drawing Geometries)
```javascript
import Draw from "ol/interaction/Draw.js";

const draw = new Draw({
  source: vectorSource,
  type: "Polygon", // 'Point' | 'LineString' | 'Polygon' | 'Circle'
  freehand: false
});
map.addInteraction(draw);

draw.on("drawend", (evt) => {
  const feature = evt.feature;
  const geometry = feature.getGeometry();
  console.log("Drawn coordinates:", geometry.getCoordinates());
});
```

### `ol/interaction/Modify` (Vertex Editing)
```javascript
import Modify from "ol/interaction/Modify.js";

const modify = new Modify({ source: vectorSource });
map.addInteraction(modify);

modify.on("modifyend", (evt) => {
  console.log("Modified features:", evt.features.getArray());
});
```

### `ol/interaction/Snap` (Magnetic Snapping)
Snaps drawing or modifying vertices to existing geometry edges:
```javascript
import Snap from "ol/interaction/Snap.js";

const snap = new Snap({ source: vectorSource, pixelTolerance: 10 });
map.addInteraction(snap); // Always add AFTER Draw / Modify
```

### `ol/interaction/Select` (Feature Selection & Highlighting)
```javascript
import Select from "ol/interaction/Select.js";
import { pointerMove, click } from "ol/events/condition.js";

const select = new Select({
  condition: click,
  style: new Style({
    fill: new Fill({ color: "rgba(255, 255, 0, 0.5)" }),
    stroke: new Stroke({ color: "#ffaa00", width: 3 })
  })
});
map.addInteraction(select);

select.on("select", (e) => {
  const selected = e.selected; // Array of selected features
  if (selected.length > 0) {
    console.log("Selected feature properties:", selected[0].getProperties());
  }
});
```

---

## 2. UI Controls (`ol/control/*`)

### Built-in Controls:
```javascript
import { defaults as defaultControls } from "ol/control/defaults.js";
import ScaleLine from "ol/control/ScaleLine.js";
import FullScreen from "ol/control/FullScreen.js";
import OverviewMap from "ol/control/OverviewMap.js";

const map = new Map({
  target: "map",
  controls: defaultControls().extend([
    new ScaleLine({ units: "metric" }),
    new FullScreen(),
    new OverviewMap({
      layers: [
        new TileLayer({ source: new XYZ({ url: "https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=KEY" }) })
      ]
    })
  ])
});
```

### Custom UI Control Extension:
```javascript
import Control from "ol/control/Control.js";

class ResetViewControl extends Control {
  constructor(opt_options) {
    const options = opt_options || {};
    const button = document.createElement("button");
    button.innerHTML = "⌂";
    button.title = "Reset View";

    const element = document.createElement("div");
    element.className = "reset-view-control ol-unselectable ol-control";
    element.appendChild(button);

    super({ element: element, target: options.target });

    button.addEventListener("click", () => {
      this.getMap().getView().animate({
        center: fromLonLat([14.4378, 50.0755]),
        zoom: 13,
        duration: 800
      });
    });
  }
}
map.addControl(new ResetViewControl());
```
