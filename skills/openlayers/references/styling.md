# OpenLayers Styling — Reference

OpenLayers styles are JavaScript objects (not CSS). Every visible vector feature needs a style.

> [ol.style API](https://openlayers.org/en/latest/apidoc/module-ol_style_Style.html)

---

## Style Architecture

```
ol.style.Style({
  image:  → for Point geometries (Circle, Icon, RegularShape)
  fill:   → for Polygon/Circle fill
  stroke: → for LineString/Polygon/Circle border
  text:   → for labels
})
```

A single `ol.style.Style` can contain all four. Apply to layers or individual features.

---

## Basic Styles

### Point (Circle)

```js
new ol.style.Style({
  image: new ol.style.Circle({
    radius: 8,
    fill: new ol.style.Fill({ color: '#FF0000' }),
    stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
  })
})
```

### Point (Icon)

```js
new ol.style.Style({
  image: new ol.style.Icon({
    src: 'https://example.com/marker.png',
    scale: 0.5,
    anchor: [0.5, 1],        // anchor point [x, y] from 0-1
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction'
  })
})
```

### Point (RegularShape — triangle, square, star)

```js
// Star
new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({ color: '#FFD700' }),
    stroke: new ol.style.Stroke({ color: '#333', width: 1 }),
    points: 5,
    radius: 12,
    radius2: 6,  // inner radius for star
    angle: 0
  })
})

// Triangle
new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({ color: '#FF6600' }),
    points: 3,
    radius: 10,
    angle: 0
  })
})

// Square
new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({ color: '#0066FF' }),
    points: 4,
    radius: 8,
    angle: Math.PI / 4  // rotate 45 degrees
  })
})
```

### LineString

```js
new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: '#0066FF',
    width: 3,
    lineDash: [10, 5],  // optional dashed line
    lineCap: 'round',
    lineJoin: 'round'
  })
})
```

### Polygon

```js
new ol.style.Style({
  fill: new ol.style.Fill({ color: 'rgba(0, 102, 255, 0.3)' }),
  stroke: new ol.style.Stroke({ color: '#0066FF', width: 2 })
})
```

### Text Label

```js
new ol.style.Style({
  text: new ol.style.Text({
    text: 'Prague',
    font: '14px sans-serif',
    fill: new ol.style.Fill({ color: '#333' }),
    stroke: new ol.style.Stroke({ color: '#fff', width: 3 }),  // halo
    offsetY: -20,           // offset above point
    textAlign: 'center',
    textBaseline: 'bottom',
    overflow: true          // allow text to overflow feature extent
  })
})
```

---

## Applying Styles

### On Layer (all features)

```js
const vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({ color: '#0891b2' })
    })
  })
});
```

### On Individual Feature

```js
feature.setStyle(new ol.style.Style({
  image: new ol.style.Circle({
    radius: 10,
    fill: new ol.style.Fill({ color: '#FF0000' })
  })
}));
```

### Style Function (data-driven)

The most powerful approach — style based on feature properties or resolution:

```js
const vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: (feature, resolution) => {
    const magnitude = feature.get('magnitude');
    return new ol.style.Style({
      image: new ol.style.Circle({
        radius: 3 + magnitude * 3,
        fill: new ol.style.Fill({
          color: magnitude > 5 ? '#FF0000' : magnitude > 3 ? '#FF8800' : '#FFD700'
        }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 1 })
      })
    });
  }
});
```

### Style Array (multiple styles per feature)

```js
// Line with casing (outline effect)
const roadStyle = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({ color: '#333', width: 8 })  // casing
  }),
  new ol.style.Style({
    stroke: new ol.style.Stroke({ color: '#fff', width: 4 })  // inner
  })
];

feature.setStyle(roadStyle);
```

### Point + Label Combined

```js
new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({ color: '#0891b2' }),
    stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
  }),
  text: new ol.style.Text({
    text: feature.get('name'),
    font: '12px sans-serif',
    fill: new ol.style.Fill({ color: '#333' }),
    stroke: new ol.style.Stroke({ color: '#fff', width: 3 }),
    offsetY: -18
  })
})
```

---

## Resolution-Dependent Styles

Show different styles at different zoom levels:

```js
style: (feature, resolution) => {
  // resolution is meters/pixel — lower = more zoomed in
  if (resolution > 100) {
    // Zoomed out: small dots, no labels
    return new ol.style.Style({
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({ color: '#0891b2' })
      })
    });
  } else {
    // Zoomed in: larger dots with labels
    return new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8,
        fill: new ol.style.Fill({ color: '#0891b2' }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
      }),
      text: new ol.style.Text({
        text: feature.get('name'),
        font: '12px sans-serif',
        offsetY: -15
      })
    });
  }
}
```

---

## Style Cache Pattern

Creating new style objects on every render call is expensive. Cache them:

```js
const styleCache = {};

function getClusterStyle(size) {
  if (!styleCache[size]) {
    styleCache[size] = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 10 + Math.min(size, 20),
        fill: new ol.style.Fill({
          color: size > 10 ? '#f28cb1' : size > 5 ? '#f1f075' : '#51bbd6'
        }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
      }),
      text: new ol.style.Text({
        text: size.toString(),
        fill: new ol.style.Fill({ color: '#333' }),
        font: 'bold 12px sans-serif'
      })
    });
  }
  return styleCache[size];
}
```

---

## Color Formats

OpenLayers accepts:
- Named colors: `'red'`, `'blue'`, `'transparent'`
- Hex: `'#FF0000'`, `'#f00'`
- RGB: `'rgb(255, 0, 0)'`
- RGBA: `'rgba(255, 0, 0, 0.5)'`
- Array: `[255, 0, 0, 0.5]` — `[r, g, b, a]` with a in 0-1

---

## Choropleth Style Function

```js
function choroplethStyle(feature) {
  const value = feature.get('density');
  const color = value > 1000 ? '#800026' :
                value > 500  ? '#BD0026' :
                value > 200  ? '#E31A1C' :
                value > 100  ? '#FC4E2A' :
                value > 50   ? '#FD8D3C' :
                value > 20   ? '#FEB24C' :
                value > 10   ? '#FED976' :
                               '#FFEDA0';

  return new ol.style.Style({
    fill: new ol.style.Fill({ color }),
    stroke: new ol.style.Stroke({ color: '#fff', width: 1 })
  });
}
```

---

## ol.style Class Reference

| Class | Purpose | Key Options |
|-------|---------|-------------|
| `ol.style.Style` | Container for all style components | `image`, `fill`, `stroke`, `text`, `zIndex` |
| `ol.style.Fill` | Fill color/pattern | `color` |
| `ol.style.Stroke` | Line/border style | `color`, `width`, `lineDash`, `lineCap`, `lineJoin` |
| `ol.style.Circle` | Circle point marker | `radius`, `fill`, `stroke` |
| `ol.style.Icon` | Image-based point marker | `src`, `scale`, `anchor`, `rotation`, `opacity` |
| `ol.style.RegularShape` | Geometric shape marker | `points`, `radius`, `radius2`, `angle`, `fill`, `stroke` |
| `ol.style.Text` | Text label | `text`, `font`, `fill`, `stroke`, `offsetX/Y`, `textAlign`, `rotation` |
