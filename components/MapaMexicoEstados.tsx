'use client';

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const GEOJSON_MEXICO_ESTADOS = 'https://raw.githubusercontent.com/strotgen/mexico-leaflet/master/states.geojson';

export const MapaMexicoEstados = () => {
  const [nombreEstado, setNombreEstado] = useState('');

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      
      {/* Etiqueta flotante del estado */}
      {nombreEstado && (
        <div className="absolute top-0 bg-black/80 backdrop-blur-md text-cyan-400 border border-cyan-400/50 px-6 py-2 rounded-full uppercase tracking-widest text-sm z-50 shadow-[0_0_20px_rgba(0,240,255,0.4)] pointer-events-none">
          {nombreEstado}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1700, // <--- AQUÍ ESTÁ LA CORRECCIÓN: Le bajamos el zoom de 1800 a 1200
          center: [-102, 24] // Coordenadas para mantenerlo centrado
        }}
        className="w-full h-full max-h-[70vh] object-contain" // Agregamos max-h para asegurar que no se desborde
      >
        <Geographies geography={GEOJSON_MEXICO_ESTADOS}>
          {({ geographies }: any) =>
            geographies.map((geo: any) => {
              const nombre = geo.properties.state_name || geo.properties.nom_ent || geo.properties.name || "Estado de México";
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setNombreEstado(nombre)}
                  onMouseLeave={() => setNombreEstado('')}
                  style={{
                    default: {
                      fill: "rgba(0, 0, 0, 0.4)",
                      stroke: "#00f0ff",
                      strokeWidth: 0.8,
                      outline: "none",
                      transition: "all 0.3s ease",
                    },
                    hover: {
                      fill: "rgba(0, 240, 255, 0.2)",
                      stroke: "#00f0ff",
                      strokeWidth: 1.5,
                      outline: "none",
                      cursor: "pointer",
                      filter: "drop-shadow(0 0 10px rgba(0, 240, 255, 0.7))",
                    },
                    pressed: {
                      fill: "rgba(0, 240, 255, 0.4)",
                      stroke: "#00f0ff",
                      strokeWidth: 1.5,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};