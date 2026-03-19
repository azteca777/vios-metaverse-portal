'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlanetaInteractivo } from '../components/PlanetaInteractivo';

const RUTA_LOGO = '/logo_vios.jpeg'; 

export default function GlobalGateway() {
  const [videoTerminado, setVideoTerminado] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Esperando interacción", error);
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
      
      {/* --- 1. LOGOTIPO VIOS CODE FLOTANTE --- */}
      {/* Lo regresamos a la esquina superior derecha, con su fondo de cristal */}
      <div className="absolute top-6 right-6 z-[9999] pointer-events-auto">
        <Link 
          href="https://vioscode.io" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg hover:scale-105 transition-transform block cursor-pointer"
        >
          <Image 
            src={RUTA_LOGO}
            alt="ViOs Code Logo"
            width={120} 
            height={50} 
            priority 
            className="object-contain rounded-lg"
          />
        </Link>
      </div>

      {/* --- 2. LETRERO INFERIOR (selecciona_pais.jpg) --- */}
      {/* Aparece en la parte de abajo, centrado, solo cuando termina el video */}
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

      {/* --- 3. EL VIDEO DE FONDO --- */}
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

      {/* --- 4. EL MUNDO 3D INTERACTIVO --- */}
      {videoTerminado && (
        <div className="absolute inset-0 z-10">
          <PlanetaInteractivo />
        </div>
      )}

    </main>
  );
}