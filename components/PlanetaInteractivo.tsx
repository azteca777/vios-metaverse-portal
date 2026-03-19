'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Importamos dinámicamente react-globe.gl para evitar errores en Next.js
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export const PlanetaInteractivo = () => {
  const globeRef = useRef<any>(null);
  const [dimensiones, setDimensiones] = useState({ width: 0, height: 0 });
  const [paises, setPaises] = useState<any[]>([]);
  const [hoverD, setHoverD] = useState<any | null>(null);

  // 1. Efecto para ajustar el tamaño de la pantalla
  useEffect(() => {
    setDimensiones({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const manejarResize = () => {
      setDimensiones({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', manejarResize);
    return () => window.removeEventListener('resize', manejarResize);
  }, []);

  // 2. Cargar los datos GeoJSON de internet
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(datos => setPaises(datos.features));
  }, []);

  // 3. Configurar la cámara y el giro automático
  useEffect(() => {
    if (globeRef.current) {
      const controles = globeRef.current.controls();
      controles.autoRotate = true; 
      controles.autoRotateSpeed = 0.8; 
      controles.enableZoom = false; // Desactivamos el zoom con la rueda
    }
  }, [dimensiones]);

  if (dimensiones.width === 0) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Globe
        ref={globeRef}
        width={dimensiones.width}
        height={dimensiones.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#00f0ff"
        atmosphereAltitude={0.15}
        
        polygonsData={paises}
        polygonAltitude={0.01}
        polygonCapColor={() => 'rgba(0, 240, 255, 0.0)'}
        polygonSideColor={() => 'rgba(0, 240, 255, 0.1)'}
        polygonStrokeColor={() => '#00f0ff'}
        
        onPolygonHover={setHoverD}
        polygonLabel={(d: any) => `
          <div style="background: rgba(0,0,0,0.8); color: #00f0ff; border: 1px solid rgba(0,240,255,0.3); padding: 5px 10px; border-radius: 4px; font-family: sans-serif; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; backdrop-blur: 5px;">
            ${d.properties.ADMIN}
          </div>
        `}
        
        // ---> AQUÍ ESTÁ LA MAGIA DE LA CONEXIÓN <---
        onPolygonClick={(d: any) => {
          const nombrePais = d.properties.ADMIN;
          console.log("Iniciando viaje cuántico hacia:", nombrePais);
          
          // Usamos encodeURIComponent por si el país tiene espacios (ej. "United States")
          // Y enviamos al usuario a la ruta dinámica que acabamos de crear
          window.location.href = `/paises/${encodeURIComponent(nombrePais)}`;
        }}
      />
    </div>
  );
};