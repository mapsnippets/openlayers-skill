# OpenLayers API Reference — Styling & Renderers

Source: https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html

---

## 1. Classical Style Model (`ol/style/*`)

Vector styling in OpenLayers is managed via the `ol/style/Style` class hierarchy.

### Core Style Components:
* **`Style`**: Container holding `fill`, `stroke`, `image`, `text`, `zIndex`.
* **`Fill`**: Interior fill color (`color: 'rgba(0, 132, 255, 0.4)'`).
* **`Stroke`**: Outline border (`color: '#0084ff'`, `width: 3`, `lineDash: [4, 4]`, `lineCap: 'round'`).
* **`Circle` (`CircleStyle`)**: Circular point marker (`radius: 8`, `fill: Fill`, `stroke: Stroke`).
* **`Icon`**: Image/SVG icon pin (`src: 'pin.svg'`, `scale: 1.0`, `anchor: [0.5, 1]`, `rotation: Math.PI/4`).
* **`Text`**: Text label (`text: 'HQ'`, `font: 'bold 12px sans-serif'`, `fill: Fill`, `stroke: Stroke`, `offsetY: -15`).

### Example: Pin Icon with Label & Styled Polygon
```javascript
import { Style, Fill, Stroke, Icon, Text } from "ol/style.js";

const pointStyle = new Style({
  image: new Icon({
    src: "https://example.com/marker-pin.svg",
    anchor: [0.5, 1],
    scale: 0.8
  }),
  text: new Text({
    text: "Store #42",
    font: "bold 13px sans-serif",
    offsetY: -30,
    fill: new Fill({ color: "#1e293b" }),
    stroke: new Stroke({ color: "#ffffff", width: 3 })
  })
});

const polygonStyle = new Style({
  fill: new Fill({ color: "rgba(0, 210, 255, 0.25)" }),
  stroke: new Stroke({
    color: "#0084ff",
    width: 2,
    lineDash: [6, 6]
  })
});
```

---

## 2. Dynamic Style Functions

Pass a function `(feature, resolution) => Style | Style[]` to dynamically compute styles based on properties or map zoom resolution:

```javascript
const dynamicChoroplethStyle = (feature, resolution) => {
  const riskLevel = feature.get("riskLevel");
  const fillColor = riskLevel === "high" ? "rgba(231, 76, 60, 0.5)" : "rgba(46, 204, 113, 0.5)";
  const strokeColor = riskLevel === "high" ? "#c0392b" : "#27ae60";

  return new Style({
    fill: new Fill({ color: fillColor }),
    stroke: new Stroke({ color: strokeColor, width: 2 })
  });
};
```

---

## 3. Flat Style Expressions (Modern OpenLayers v8–v10)

OpenLayers allows declaring styles using JSON-like Flat Style Expressions, similar to MapLibre style rules:

```javascript
const flatStyle = {
  "fill-color": [
    "match",
    ["get", "category"],
    "commercial", "#0084ff",
    "residential", "#2ecc71",
    "#bdc3c7" // fallback
  ],
  "stroke-color": "#ffffff",
  "stroke-width": 1.5,
  "circle-radius": 8,
  "circle-fill-color": "#00d2ff"
};

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: flatStyle
});
```
