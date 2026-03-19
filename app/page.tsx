'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapaMundiInteractivo } from '../components/MapaMundiInteractivo';

const RUTA_LOGO = '/logo_vios.jpeg'; 
const RUTA_IMAGEN_SELECCIONA = '/selecciona.jpg'; 

export default function GlobalGateway() {
  const [videoTerminado, setVideoTerminado] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // --- ¡ACTUALIZADO: Enlace de Norte Americano modificado! ---
  const continentes = [
    { nombre: 'Norte Americano', href: 'https://virtualuniverse.com' },
    { nombre: 'Sudamericano', href: '/sudamerica' },
    { nombre: 'Europeo', href: '#' },
    { nombre: 'Africano', href: '#' },
    { nombre: 'Asiático', href: '#' },
    { nombre: 'Oceanía', href: '#' },
  ];

  useEffect(() => {
    if (videoRef.current) {
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
      
      {/* --- 1. LOGOTIPO FLOTANTE --- */}
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

      {/* --- 2. EL VIDEO DE FONDO --- */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={manejarFinalVideo}
        className="fixed inset-0 w-full h-full object-cover"
      >
        <source src="/videos/mapa_mundi.mp4" type="video/mp4" />
      </video>

      {/* --- 3. EL MAPA SVG INTERACTIVO --- */}
      {videoTerminado && <MapaMundiInteractivo />}

      {/* --- 4. BARRA DE INSTRUCCIONES INFERIOR CON TU IMAGEN --- */}
      {videoTerminado && (
        <div className="fixed bottom-0 left-0 w-full bg-black border-t border-cyan-500/20 py-6 z-90 px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex justify-center items-center pointer-events-none">
            <Image 
              src={RUTA_IMAGEN_SELECCIONA}
              alt="Selecciona un continente"
              width={1000} 
              height={120} 
              className="object-contain max-w-[90%] md:max-w-none pointer-events-auto" 
              priority
            />
        </div>
      )}

      {/* --- 5. BOTÓN Y MENÚ DE NAVEGACIÓN GLOBAL --- */}
      {videoTerminado && (
        <div className="fixed bottom-24 right-6 z-[9998] pointer-events-auto flex flex-col items-end gap-4 transition-all">
          
          <div className={`transition-all duration-300 ${menuAbierto ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 min-w-[280px]">
              <h2 className="text-gray-600 text-sm uppercase tracking-widest mb-6 px-3">Explora el Portal</h2>
              <ul className="flex flex-col gap-3 w-full">
                {continentes.map((continente, index) => (
                  <li key={index} className="w-full">
                    <Link 
                      href={continente.href}
                      // Agregamos target="_blank" si el enlace no es "#"
                      target={continente.href !== '#' ? '_blank' : undefined}
                      rel={continente.href !== '#' ? 'noopener noreferrer' : undefined}
                      className="w-full flex justify-center p-3 rounded-xl text-xl font-light text-gray-900 hover:bg-cyan-50 hover:text-cyan-600 transition-colors border border-gray-100 hover:border-cyan-200/50"
                      onClick={() => setMenuAbierto(false)} 
                    >
                      <span className="flex items-center justify-center leading-none">{continente.nombre}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button 
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="bg-white/90 backdrop-blur-md rounded-full p-4 shadow-2xl hover:scale-110 transition-all border border-gray-200 relative group flex items-center justify-center w-16 h-16"
            aria-label="Abrir menú"
          >
            <div className="flex flex-col gap-1.5 w-7">
                <span className={`block h-0.5 w-full bg-gray-900 rounded-full transition-all duration-300 ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-gray-900 rounded-full transition-all duration-300 ${menuAbierto ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-gray-900 rounded-full transition-all duration-300 ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      )}
    </main>
  );
}