'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Importamos dinámicamente react-globe.gl para evitar el error de "window is not defined" en Next.js
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

  // ---> NUEVO: Efecto 2. Cargar los datos GeoJSON de internet (público y confiable)
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(datos => setPaises(datos.features));
  }, []); // Se ejecuta solo una vez al cargar

  // 3. Efecto para configurar la cámara y el giro automático
  useEffect(() => {
    if (globeRef.current) {
      const controles = globeRef.current.controls();
      controles.autoRotate = true; // El mundo gira solo
      controles.autoRotateSpeed = 0.8; // Velocidad del giro
      controles.enableZoom = false; // Desactivamos el zoom con la rueda del mouse
    }
  }, [dimensiones]);

  // Evitamos renderizar hasta tener las dimensiones del cliente
  if (dimensiones.width === 0) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Globe
        ref={globeRef}
        width={dimensiones.width}
        height={dimensiones.height}
        
        // ---> TEXTURAS FIJAS (Sin errores): Usamos earth-night como base
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        
        // Mapa de relieve para volumen en montañas
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(0,0,0,0)" // Fondo transparente
        
        showAtmosphere={true}
        atmosphereColor="#00f0ff" // Mantenemos tu azul neón
        atmosphereAltitude={0.15}
        
        // ---> NUEVO: Aquí empieza la magia interactiva
        polygonsData={paises} // Le pasamos los datos que descargamos
        polygonAltitude={0.01} // Qué tan "altos" son los continentes sobre el mar
        
        // ---> NUEVO: Estilos Neón Cyberpunk para los bordes
        polygonCapColor={() => 'rgba(0, 240, 255, 0.0)'} // Color normal (transparente para ver la textura debajo)
        polygonSideColor={() => 'rgba(0, 240, 255, 0.1)'} // Color del borde de los continentes
        polygonStrokeColor={() => '#00f0ff'} // Borde neón
        
        // ---> NUEVO: Lógica del pasar el mouse (Hover)
        onPolygonHover={setHoverD} // Detecta qué país tocas
        
        // Etiquetas que flotan (Tooltip)
        polygonLabel={(d: any) => `
          <div style="background: rgba(0,0,0,0.8); color: #00f0ff; border: 1px solid rgba(0,240,255,0.3); padding: 5px 10px; border-radius: 4px; font-family: sans-serif; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; backdrop-blur: 5px;">
            ${d.properties.ADMIN}
          </div>
        `}
        
        // ---> NUEVO: Lógica del clic (para después)
        onPolygonClick={(d: any) => {
          console.log("Hiciste clic en:", d.properties.ADMIN, "en", d.properties.CONTINENT);
          // Emmanuel: Aquí pondremos los enlaces reales en el siguiente paso.
        }}
      />
    </div>
  );
};