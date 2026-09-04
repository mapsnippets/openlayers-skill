# OpenLayers API Reference — Styling & Renderers

OpenLayers offers two complementary styling systems:
1. **Classical Object-Oriented Styling (`ol/style/*`)** — programmatic, highly flexible, with direct access to HTML5 Canvas 2D contexts and multi-style arrays.
2. **Modern Declarative Flat Styles (v8–v10+)** — JSON-like expressions with expressions, color ramps, and dynamic CSS runtime style variables.

---

## 1. Classical Style Model (`ol/style/*`)

Vector styling is encapsulated in the `ol/style/Style` class, which aggregates vector geometry decorators.

### Core Style Components
| Class | Import | Description |
| :--- | :--- | :--- |
| `Style` | `ol/style/Style.js` | Container holding `fill`, `stroke`, `image`, `text`, `zIndex`, `geometry`, or custom `renderer`. |
| `Fill` | `ol/style/Fill.js` | Interior polygon or circle fill (color, canvas pattern, canvas gradient). |
| `Stroke` | `ol/style/Stroke.js` | Line or border stroke (`color`, `width`, `lineDash`, `lineCap`, `lineJoin`). |
| `CircleStyle` | `ol/style/Circle.js` | High-performance vector point circle (`radius`, `fill`, `stroke`, `displacement`). |
| `RegularShape` | `ol/style/RegularShape.js` | Polygons and stars: triangles, crosses, hexagons, asterisks. |
| `Icon` | `ol/style/Icon.js` | Raster (PNG/JPG) or vector (SVG) marker pins with anchor and tinting. |
| `Text` | `ol/style/Text.js` | Labels with halo outlines, background boxes, offsets, and rotation. |

---

### Detailed Class Options & Implementations

#### A. Point Markers (`Icon`, `CircleStyle`, `RegularShape`)
```javascript
import { Style, Fill, Stroke, Icon, Circle as CircleStyle, RegularShape } from 'ol/style.js';

// 1. Scalable SVG Marker Pin with Tint
const svgMarker = new Style({
  image: new Icon({
    src: 'data:image/svg+xml;utf8,<svg .../>',
    anchor: [0.5, 1],               // Anchor at bottom center of pin
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    scale: 1.2,
    color: '#0084FF',               // Tints monochrome SVGs dynamically
    displacement: [0, 0],
    rotateWithView: false
  })
});

// 2. High-performance Circle Point
const circlePoint = new Style({
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({ color: '#00D2FF' }),
    stroke: new Stroke({ color: '#ffffff', width: 2 })
  })
});

// 3. 5-Pointed Star
const starShape = new Style({
  image: new RegularShape({
    fill: new Fill({ color: '#f59e0b' }),
    stroke: new Stroke({ color: '#ffffff', width: 1.5 }),
    points: 5,
    radius: 12,
    radius2: 5,                     // Inner radius creates star points
    angle: 0
  })
});

// 4. Triangle / Cross
const crossShape = new Style({
  image: new RegularShape({
    fill: new Fill({ color: '#ef4444' }),
    stroke: new Stroke({ color: '#ffffff', width: 2 }),
    points: 4,
    radius: 10,
    radius2: 0,                     // Inner radius 0 produces a cross
    angle: 0
  })
});
```

#### B. Text Labels & Halos
```javascript
import { Style, Text, Fill, Stroke } from 'ol/style.js';

const labelStyle = new Style({
  text: new Text({
    text: 'Prague Central Station',
    font: 'bold 13px Inter, sans-serif',
    placement: 'point',             // 'point' for markers, 'line' to follow LineStrings
    textAlign: 'center',            // 'left', 'right', 'center', 'start', 'end'
    textBaseline: 'middle',         // 'top', 'middle', 'bottom'
    offsetY: -22,                   // Offset above marker pin
    fill: new Fill({ color: '#0f172a' }),
    stroke: new Stroke({
      color: '#ffffff',             // White halo outline for readability
      width: 3.5
    }),
    backgroundFill: new Fill({ color: 'rgba(255, 255, 255, 0.85)' }),
    backgroundStroke: new Stroke({ color: '#cbd5e1', width: 1 }),
    padding: [3, 8, 3, 8]           // [top, right, bottom, left]
  })
});
```

---

## 2. Multi-Pass Styling & Road Casings

In OpenLayers, a feature can return an **Array of Styles** (`Style[]`). This enables layered rendering such as highway casings, glowing borders, or directional arrows on lines:

```javascript
import { Style, Stroke } from 'ol/style.js';

// Highway casing: Thick dark casing underneath, thinner vibrant line on top
const roadStyles = [
  // Pass 1: Dark Casing (Width 8)
  new Style({
    stroke: new Stroke({
      color: '#0f172a',
      width: 8,
      lineCap: 'round',
      lineJoin: 'round'
    }),
    zIndex: 1
  }),
  // Pass 2: Colored Highway Core (Width 5)
  new Style({
    stroke: new Stroke({
      color: '#0084FF',
      width: 5,
      lineCap: 'round',
      lineJoin: 'round'
    }),
    zIndex: 2
  })
];
```

---

## 3. High-Performance Dynamic Style Functions

Instead of attaching individual styles to thousands of features (which consumes substantial memory), assign a **dynamic style function** to the `VectorLayer`:

```javascript
import { Style, Fill, Stroke } from 'ol/style.js';

// Style cache prevents GC thrashing
const styleCache = {};

function choroplethStyleFunction(feature, resolution) {
  const popDensity = feature.get('density') || 0;
  
  // Categorize density
  let color = '#fef0d9';
  if (popDensity > 1000) color = '#b30000';
  else if (popDensity > 500) color = '#e34a33';
  else if (popDensity > 200) color = '#fc8d59';
  else if (popDensity > 50) color = '#fdcc8a';

  // Return cached style object if already compiled
  if (!styleCache[color]) {
    styleCache[color] = new Style({
      fill: new Fill({ color }),
      stroke: new Stroke({ color: '#ffffff', width: 1 })
    });
  }
  return styleCache[color];
}

vectorLayer.setStyle(choroplethStyleFunction);
```

---

## 4. Modern Declarative Flat Style Expressions (v8–v10)

Modern OpenLayers supports declarative, JSON-serializable styling using expressions directly parsed by OpenLayers. This eliminates boilerplate and improves WebGL/Canvas rendering efficiency:

```javascript
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';

const flatStyle = {
  // 1. Data-Driven Dynamic Fill using 'match' expression
  'fill-color': [
    'match',
    ['get', 'status'],
    'active', 'rgba(16, 185, 129, 0.6)',
    'warning', 'rgba(245, 158, 11, 0.6)',
    'critical', 'rgba(239, 68, 68, 0.6)',
    'rgba(148, 163, 184, 0.4)' // Fallback
  ],

  // 2. Continuous interpolation based on zoom resolution
  'stroke-color': '#0f172a',
  'stroke-width': [
    'interpolate',
    ['linear'],
    ['resolution'],
    2, 3,       // At resolution 2 (zoomed in): stroke width 3
    500, 1      // At resolution 500 (zoomed out): stroke width 1
  ],

  // 3. Dynamic circle styling
  'circle-radius': [
    'interpolate',
    ['linear'],
    ['get', 'capacity'],
    0, 4,
    1000, 16
  ],
  'circle-fill-color': '#0084FF',
  'circle-stroke-color': '#ffffff',
  'circle-stroke-width': 2
};

const layer = new VectorLayer({
  source: new VectorSource(),
  style: flatStyle
});
```

### Runtime CSS Variables in Flat Styles
You can update style colors and values dynamically without re-creating layer styles:

```javascript
const variableStyle = {
  'fill-color': ['var', 'fillColor'],
  'stroke-color': '#ffffff',
  'stroke-width': ['var', 'strokeWidth']
};

const layer = new VectorLayer({
  source: source,
  style: variableStyle,
  variables: {
    fillColor: '#0084FF',
    strokeWidth: 2
  }
});

// Update at runtime (e.g. user toggles dark mode or accent color)
layer.updateStyleVariables({
  fillColor: '#ef4444',
  strokeWidth: 3
});
```

---

## 5. Custom Canvas 2D Renderers (`renderer` hook)

For specialized visual effects such as animated radar pulses, donut pie charts, or complex canvas graphics, define a custom `renderer`:

```javascript
import { Style } from 'ol/style.js';

const animatedPulseStyle = new Style({
  renderer: (coordinates, state) => {
    const [[x, y]] = coordinates;
    const ctx = state.context;
    const time = Date.now() / 1000;
    const radius = 10 + (Math.sin(time * 3) + 1) * 8; // Pulsing radius 10px -> 26px

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(0, 132, 255, 0.3)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#0084FF';
    ctx.stroke();
    ctx.restore();

    // Request continuous animation loop
    map.render();
  }
});
```
