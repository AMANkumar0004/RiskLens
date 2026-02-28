
import React, { useEffect, useRef } from 'react';
import { LayerState, SearchResult } from '../types';

declare var L: any;

interface Map2DProps {
  layers: LayerState;
  searchTarget: SearchResult | null;
  onMapClick?: (lat: number, lon: number) => void;
}

const Map2D: React.FC<Map2DProps> = ({ layers, searchTarget, onMapClick }) => {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wmsLayersRef = useRef<{ [key: string]: any }>({});
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Fixed: The map turns black if the base layer is treated as dynamic. 
    // We initialize it as a persistent base layer.
    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
      backgroundColor: '#0f172a' // Slate-900 fallback
    }).setView([28.6139, 77.2090], 12);

    // Using a reliable dark base layer that stays permanently
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      zIndex: 1
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Add map click listener for pointer analysis
    map.on('click', (e: any) => {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    });

    mapRef.current = map;

    return () => {
      if (map) {
        map.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update pointer marker and fly to location
  useEffect(() => {
    if (mapRef.current && searchTarget) {
      const map = mapRef.current;
      map.flyTo([searchTarget.lat, searchTarget.lon], 14, { duration: 1.5 });
      
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      // Create a visually distinct pointer for analysis
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      markerRef.current = L.marker([searchTarget.lat, searchTarget.lon], { icon: customIcon }).addTo(map);
    }
  }, [searchTarget]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const updateWms = (name: string, active: boolean, layerName: string, opacity: number, zIndex: number) => {
      if (active) {
        if (!wmsLayersRef.current[name]) {
          // Restoring to previous visually distinct WMS styles
          wmsLayersRef.current[name] = L.tileLayer.wms("https://ows.terrestris.de/osm/service?", {
            layers: layerName,
            format: 'image/png',
            transparent: true,
            opacity: opacity,
            zIndex: zIndex
          }).addTo(map);
        }
      } else {
        if (wmsLayersRef.current[name]) {
          map.removeLayer(wmsLayersRef.current[name]);
          delete wmsLayersRef.current[name];
        }
      }
    };

    // Layer stack management with specific z-indices to prevent overlapping issues
    updateWms('flood', layers.floodRisk, 'OSM-WMS', 0.6, 10);
    updateWms('terrain', layers.terrain, 'SRTM30-Hillshade', 0.5, 5);
    updateWms('construction', layers.constructionZones, 'SRTM30-Contour', 0.7, 15);
    updateWms('land_use', layers.landUse, 'TOPO-WMS', 0.6, 20);

  }, [layers]);

  return <div ref={containerRef} className="w-full h-full z-0" />;
};

export default Map2D;
