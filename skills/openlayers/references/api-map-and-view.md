# OpenLayers API Reference — `ol/Map`, `ol/View` & `ol/Overlay`

Source: https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html

---

## 1. `ol/Map`

The central class of OpenLayers. Renders layers to a target container.

### Import:
```javascript
import Map from "ol/Map.js";
```

### Constructor Options (`MapOptions`):
| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `target` | `HTMLElement | string` | `undefined` | DOM container element or its `id`. |
| `layers` | `Array<BaseLayer> | Collection`| `[]` | Array of layers to render. |
| `view` | `View` | `undefined` | Map's `ol/View` instance. |
| `controls` | `Collection<Control>` | `defaults()` | UI controls (`Zoom`, `Attribution`, `Rotate`). |
| `interactions` | `Collection<Interaction>` | `defaults()` | Mouse/touch interactions (`DragPan`, `PinchZoom`, `MouseWheelZoom`). |
| `overlays` | `Collection<Overlay>` | `[]` | HTML overlay popups. |
| `maxTilesLoading`| `number` | `16` | Max concurrent tile requests. |

### Key Methods:
* `setTarget(target: HTMLElement | string | null)` — Assigns target container. **Pass `null` to destroy and clean up map!**
* `getTarget(): HTMLElement | string`
* `getView(): View` / `setView(view: View)`
* `addLayer(layer: BaseLayer)` / `removeLayer(layer: BaseLayer)` / `getLayers(): Collection<BaseLayer>`
* `addOverlay(overlay: Overlay)` / `removeOverlay(overlay: Overlay)`
* `addControl(control: Control)` / `removeControl(control: Control)`
* `addInteraction(interaction: Interaction)` / `removeInteraction(interaction: Interaction)`
* `forEachFeatureAtPixel(pixel, callback, options)` — Hit-testing vector features under pointer.
* `getCoordinateFromPixel(pixel: Pixel): Coordinate`
* `getPixelFromCoordinate(coordinate: Coordinate): Pixel`
* `updateSize()` — Re-evaluates container dimensions (call after modal/tab opens or container resize).
* `render()` — Forces map re-render.

### Map Events:
* `click`, `singleclick`, `dblclick`, `pointermove`, `pointerdrag`, `movestart`, `moveend`, `postrender`, `change:size`.

---

## 2. `ol/View`

Manages 2D viewport parameters: center, zoom, resolution, rotation, projection, and animations.

### Import:
```javascript
import View from "ol/View.js";
```

### Constructor Options (`ViewOptions`):
* `center` (`Coordinate`): Center coordinate in the view projection (use `fromLonLat([lng, lat])`).
* `zoom` (`number`): Initial zoom level.
* `projection` (`ProjectionLike` = `'EPSG:3857'`): Projection of the view.
* `rotation` (`number` = `0`): Rotation in radians (clockwise).
* `minZoom` (`number` = `0`) / `maxZoom` (`number` = `28`)
* `extent` (`Extent`): Constrain the view center within a bounding box `[minX, minY, maxX, maxY]`.
* `smoothExtentConstraint` (`boolean` = `true`)
* `enableRotation` (`boolean` = `true`)

### Key Methods:
* `getCenter(): Coordinate` / `setCenter(center: Coordinate)`
* `getZoom(): number` / `setZoom(zoom: number)`
* `getResolution(): number` / `setResolution(resolution: number)`
* `getRotation(): number` / `setRotation(rotation: number)`
* `getProjection(): Projection`
* `calculateExtent(size?: Size): Extent` — Returns visible bounding box in view coordinates.
* `fit(geometryOrExtent: SimpleGeometry | Extent, options?: FitOptions)` — Fits the view to show given extent.
  * Options: `padding: [top, right, bottom, left]`, `duration: 1000`, `maxZoom: 18`, `easing: easeOut`.
* `animate(...animations: Array<AnimationOptions>)` — Smooth animated transition.
  ```javascript
  view.animate({
    center: fromLonLat([14.4378, 50.0755]),
    zoom: 15,
    duration: 1200
  });
  ```

---

## 3. `ol/Overlay` (Popups & HTML Elements)

Renders custom DOM HTML elements pinned to geographical coordinates.

### Import:
```javascript
import Overlay from "ol/Overlay.js";
```

### Example:
```javascript
const popupElement = document.getElementById("popup");
const popupOverlay = new Overlay({
  element: popupElement,
  positioning: "bottom-center",
  stopEvent: false,
  autoPan: {
    animation: { duration: 250 }
  }
});
map.addOverlay(popupOverlay);

map.on("click", (evt) => {
  const coordinate = evt.coordinate;
  popupOverlay.setPosition(coordinate);
  popupElement.innerHTML = `<b>Clicked Coordinate:</b><br>${coordinate[0].toFixed(2)}, ${coordinate[1].toFixed(2)}`;
});
```
