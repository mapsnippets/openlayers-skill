import React, { useEffect, useRef } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import { fromLonLat } from "ol/proj.js";
import "ol/ol.css";

interface MapProps {
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  apiKey?: string;
}

export const OpenLayersMapView: React.FC<MapProps> = ({
  center = [14.4378, 50.0755],
  zoom = 13,
  apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY || "YOUR_API_KEY"
}) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    // Initialize map
    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=${apiKey}`,
            tileSize: 512,
            maxZoom: 22,
            attributions: '<a href="https://www.maptiler.com/copyright/">&copy; MapTiler</a>'
          })
        })
      ],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom
      })
    });

    mapRef.current = map;

    // Handle container resize
    const resizeObserver = new ResizeObserver(() => {
      map.updateSize();
    });
    resizeObserver.observe(mapElement.current);

    // Lifecycle cleanup
    return () => {
      resizeObserver.disconnect();
      map.setTarget(null);
      mapRef.current = null;
    };
  }, [center, zoom, apiKey]);

  return (
    <div
      ref={mapElement}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative"
      }}
    />
  );
};

export default OpenLayersMapView;
