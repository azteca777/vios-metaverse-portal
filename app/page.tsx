'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PlanetaInteractivo } from '../components/PlanetaInteractivo';

export default function GlobalGateway() {
  const [videoTerminado, setVideoTerminado] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Intentar reproducir automáticamente el video
      videoRef.current.play().catch(error => {
        console.log("Esperando interacción del usuario", error);
      });
    }
  }, []);

  const manejarFinalVideo = () => {
    setVideoTerminado(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col antialiased">
      
      {/* ELIMINADO: El logotipo flotante de la esquina superior derecha */}

      {/* --- 1. LETRERO INFERIOR (selecciona.jpg) --- */}
      {/* Centrado en la parte inferior, aparece solo cuando termina el video */}
      {videoTerminado && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[9999] pointer-events-none">
          <Image 
            src="/selecciona_pais.jpg" 
            alt="Selecciona un destino" 
            width={500} 
            height={100} 
            priority
            className="object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]" 
          />
        </div>
      )}

      {/* --- 2. EL VIDEO DE FONDO (Mapa Mundi) --- */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={manejarFinalVideo}
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/mapa_mundi.mp4" type="video/mp4" />
      </video>

      {/* --- 3. EL MUNDO 3D INTERACTIVO (Cyberpunk Globe) --- */}
      {videoTerminado && (
        <div className="absolute inset-0 z-10">
          <PlanetaInteractivo />
        </div>
      )}

    </main>
  );
}