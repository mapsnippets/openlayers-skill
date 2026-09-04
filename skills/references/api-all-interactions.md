# OpenLayers Complete API Specification — All Interaction Classes (`ol/interaction/*`)

Source: https://openlayers.org/en/latest/apidoc/module-ol_interaction_Interaction-Interaction.html

---

| Interaction | Import Path | Purpose |
| :--- | :--- | :--- |
| `Draw` | `ol/interaction/Draw.js` | Create points, lines, polygons, circles, freehand shapes, and trace boundaries. |
| `Modify` | `ol/interaction/Modify.js` | Drag and edit geometry vertices, scale, and rotate. |
| `Select` | `ol/interaction/Select.js` | Hit-test and select features on click or hover with custom selection style. |
| `Snap` | `ol/interaction/Snap.js` | Magnetic vertex and segment snapping. |
| `Translate` | `ol/interaction/Translate.js` | Drag and move entire features across the map. |
| `DragBox` | `ol/interaction/DragBox.js` | Draw bounding box with Ctrl/Shift for spatial feature selection. |
| `Extent` | `ol/interaction/Extent.js` | Interactive 2D bounding box modifier and resizer. |
| `DragAndDrop` | `ol/interaction/DragAndDrop.js` | Drag & drop GPX, GeoJSON, KML, or KMZ files directly into the map. |
| `Link` | `ol/interaction/Link.js` | Bidirectional URL query param synchronization (`zoom`, `lat`, `lng`, `rotation`). |
| `DragPan` | `ol/interaction/DragPan.js` | Panning with pointer/mouse. |
| `DragRotate` | `ol/interaction/DragRotate.js` | Rotating view with Shift+Drag. |
| `DragZoom` | `ol/interaction/DragZoom.js` | Zooming to drawn box with Shift+Drag. |
| `PinchZoom` | `ol/interaction/PinchZoom.js` | Multi-touch pinch-to-zoom on touch devices. |
| `PinchRotate` | `ol/interaction/PinchRotate.js` | Two-finger touch rotation. |
| `MouseWheelZoom`| `ol/interaction/MouseWheelZoom.js`| Mouse wheel zooming with smooth kinetic deceleration. |
| `KeyboardPan` | `ol/interaction/KeyboardPan.js` | Arrow key map panning. |
| `KeyboardZoom` | `ol/interaction/KeyboardZoom.js` | `+` and `-` keyboard zooming. |
| `Pointer` | `ol/interaction/Pointer.js` | Base class for building custom drag/touch interactions. |
