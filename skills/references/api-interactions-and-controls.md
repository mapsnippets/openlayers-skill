# OpenLayers API Reference — Interactions & Controls

Interactions modify the map or its vector features in response to user gestures (mouse, touch, keyboard). Controls are UI DOM elements positioned over the map container that provide buttons, status indicators, or mini-maps.

---

## 1. Vector & Map Interactions (`ol/interaction/*`)

### Managing Default Map Interactions
By default, OpenLayers initializes a set of standard navigation interactions. You can customize, disable, or extend them via `ol/interaction/defaults.js`:

```javascript
import Map from 'ol/Map.js';
import { defaults as defaultInteractions } from 'ol/interaction/defaults.js';
import DragRotate from 'ol/interaction/DragRotate.js';
import { altShiftKeysOnly } from 'ol/events/condition.js';

const map = new Map({
  target: 'map',
  interactions: defaultInteractions({
    doubleClickZoom: false,     // Disable zoom on double-click
    mouseWheelZoom: true,       // Keep smooth mouse wheel zoom
    dragPan: true,              // Keep drag panning
    pinchRotate: false          // Disable two-finger rotation on mobile
  }).extend([
    new DragRotate({ condition: altShiftKeysOnly })
  ])
});
```

---

### Key Interaction Specifications

#### A. `ol/interaction/Draw`
Creates new geometries.
```javascript
import Draw from 'ol/interaction/Draw.js';

const draw = new Draw({
  source: vectorSource,
  type: 'Polygon',              // 'Point' | 'LineString' | 'Polygon' | 'Circle'
  freehand: false,              // Set true for pencil-like freehand sketch mode
  stopClick: true,              // Prevent singleClick from firing on completion
  snapTolerance: 12,            // Pixel radius to close polygon ring
  maxPoints: 8                  // Auto-finishes when reaching max vertices
});
map.addInteraction(draw);

draw.on('drawstart', (e) => console.log('Drafting started:', e.feature));
draw.on('drawend', (e) => console.log('Drafting completed:', e.feature));
draw.on('drawabort', () => console.log('Drafting cancelled (Escape)'));
```

#### B. `ol/interaction/Modify`
Drags and edits existing vertices, or inserts new ones.
```javascript
import Modify from 'ol/interaction/Modify.js';
import { altKeyOnly } from 'ol/events/condition.js';

const modify = new Modify({
  source: vectorSource,
  pixelTolerance: 10,
  deleteCondition: altKeyOnly   // Alt+Click vertex to delete it
});
map.addInteraction(modify);

modify.on('modifyend', (e) => {
  const modifiedFeatures = e.features.getArray();
  console.log('Modified features count:', modifiedFeatures.length);
});
```

#### C. `ol/interaction/Snap`
Magnetically snaps pointer coordinates to vertices or lines during drawing/editing.
```javascript
import Snap from 'ol/interaction/Snap.js';

// INVARIANT: Snap must always be added AFTER Draw and Modify
const snap = new Snap({
  source: vectorSource,
  vertex: true,
  edge: true,
  pixelTolerance: 12
});
map.addInteraction(snap);
```

#### D. `ol/interaction/Select`
Highlights and selects features on hover or click.
```javascript
import Select from 'ol/interaction/Select.js';
import { click, pointerMove } from 'ol/events/condition.js';
import { Style, Fill, Stroke } from 'ol/style.js';

const select = new Select({
  condition: click,             // Or pointerMove for hover selection
  hitTolerance: 6,              // Screen pixel buffer for easy mobile taps
  multi: false,                 // Disallow multi-selection
  style: new Style({
    fill: new Fill({ color: 'rgba(0, 132, 255, 0.25)' }),
    stroke: new Stroke({ color: '#0084FF', width: 3 })
  })
});
map.addInteraction(select);

select.on('select', (e) => {
  console.log('Selected:', e.selected);     // Array of newly selected features
  console.log('Deselected:', e.deselected); // Array of unselected features
});
```

#### E. `ol/interaction/DragBox`
Draws a bounding rectangle (typically with Shift or Ctrl) to select features within a spatial extent.
```javascript
import DragBox from 'ol/interaction/DragBox.js';
import { platformModifierKeyOnly } from 'ol/events/condition.js';

const dragBox = new DragBox({
  condition: platformModifierKeyOnly // Cmd on macOS, Ctrl on Windows/Linux
});
map.addInteraction(dragBox);

dragBox.on('boxend', () => {
  const extent = dragBox.getGeometry().getExtent();
  const selectedFeatures = [];
  vectorSource.forEachFeatureIntersectingExtent(extent, (feature) => {
    selectedFeatures.push(feature);
  });
  console.log('Features inside bounding box:', selectedFeatures.length);
});
```

#### F. `ol/interaction/DragAndDrop`
Allows users to drag local GeoJSON, KML, GPX, or IGC files directly onto the browser window:
```javascript
import DragAndDrop from 'ol/interaction/DragAndDrop.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import KML from 'ol/format/KML.js';
import GPX from 'ol/format/GPX.js';

const dragAndDrop = new DragAndDrop({
  formatConstructors: [GeoJSON, KML, GPX]
});
map.addInteraction(dragAndDrop);

dragAndDrop.on('addfeatures', (event) => {
  vectorSource.addFeatures(event.features);
  map.getView().fit(vectorSource.getExtent(), { duration: 800, padding: [40, 40, 40, 40] });
});
```

#### G. `ol/interaction/Link`
Automatically synchronizes map state with URL hash/query parameters (`zoom`, `x`, `y`, `rotation`):
```javascript
import Link from 'ol/interaction/Link.js';

// Syncs URL query params: https://example.com/?x=14.42&y=50.08&z=13
map.addInteraction(new Link());
```

---

## 2. UI Controls Reference (`ol/control/*`)

### Complete Suite of Built-in Controls

```javascript
import { defaults as defaultControls } from 'ol/control/defaults.js';
import ScaleLine from 'ol/control/ScaleLine.js';
import FullScreen from 'ol/control/FullScreen.js';
import OverviewMap from 'ol/control/OverviewMap.js';
import MousePosition from 'ol/control/MousePosition.js';
import ZoomSlider from 'ol/control/ZoomSlider.js';
import ZoomToExtent from 'ol/control/ZoomToExtent.js';
import Rotate from 'ol/control/Rotate.js';
import { createStringXY } from 'ol/coordinate.js';
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ.js';
import { fromLonLat } from 'ol/proj.js';

const map = new Map({
  target: 'map',
  controls: defaultControls({
    zoom: true,                 // +/- buttons
    rotate: true,               // Compass needle when rotated
    attribution: true           // Collapsible copyright notice
  }).extend([
    // 1. Scale Bar with graphic ticks
    new ScaleLine({
      units: 'metric',          // 'metric' | 'imperial' | 'nautical' | 'us' | 'degrees'
      bar: true,                // Modern stepped scale bar
      steps: 4,
      text: true,
      minWidth: 140
    }),

    // 2. HTML5 Fullscreen button
    new FullScreen({
      tipLabel: 'Toggle Fullscreen'
    }),

    // 3. Pointer Coordinates display
    new MousePosition({
      coordinateFormat: createStringXY(4),  // 4 decimal places
      projection: 'EPSG:4326',              // Convert to [lng, lat]
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-coords') || undefined
    }),

    // 4. Continuous vertical zoom track slider
    new ZoomSlider(),

    // 5. Jump to Home Extent button
    new ZoomToExtent({
      extent: [1590000, 6450000, 1620000, 6470000],
      tipLabel: 'Fit to City Center'
    }),

    // 6. Inset Mini-Map (OverviewMap)
    new OverviewMap({
      collapsed: false,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=YOUR_API_KEY',
            tileSize: 512
          })
        })
      ]
    })
  ])
});
```

---

## 3. Building Custom OpenLayers Controls

To build a custom button, search widget, or HUD overlay, subclass `ol/control/Control.js`:

```javascript
import Control from 'ol/control/Control.js';
import { fromLonLat } from 'ol/proj.js';

/**
 * Custom Reset View Control button
 */
export class ResetViewControl extends Control {
  constructor(opt_options) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = '⌂';
    button.title = 'Reset to Prague';
    button.setAttribute('aria-label', 'Reset to Prague');

    const element = document.createElement('div');
    element.className = 'ol-reset-view ol-unselectable ol-control';
    element.style.top = '65px';
    element.style.left = '.5em';
    element.style.position = 'absolute';
    element.appendChild(button);

    super({
      element: element,
      target: options.target
    });

    button.addEventListener('click', this.handleReset.bind(this), false);
  }

  handleReset() {
    this.getMap().getView().animate({
      center: fromLonLat([14.4378, 50.0755]),
      zoom: 13,
      duration: 750
    });
  }
}

// Add to map
map.addControl(new ResetViewControl());
```
