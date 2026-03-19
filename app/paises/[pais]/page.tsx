'use client';

import Link from 'next/link';
import { use } from 'react';
import { MapaMexicoEstados } from '../../../components/MapaMexicoEstados';

export default function PaisDestino({ params }: { params: Promise<{ pais: string }> }) {
  const parametros = use(params);
  const paisSeleccionado = decodeURIComponent(parametros.pais);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start font-sans relative overflow-hidden p-6 md:p-10">
      
      {/* --- TÍTULO GIGANTE Y SUBTÍTULO (Arriba al Centro) --- */}
      <div className="flex flex-col items-center justify-center mt-8 md:mt-2 mb-4 w-full text-center z-40 relative">
        <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif font-light text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#8c7324] leading-none tracking-tight">
          {paisSeleccionado}
        </h1>
        
        <p className="text-cyan-400 uppercase tracking-[0.4em] text-sm md:text-base font-medium mt-2 opacity-90 shadow-neon">
          SELECCIONA UN ESTADO
        </p>
      </div>

      {/* --- CONTENEDOR DEL MAPA (Ocupa todo el espacio central) --- */}
      {paisSeleccionado === 'Mexico' ? (
        <div className="flex-1 w-full max-w-7xl h-full flex items-center justify-center relative z-10 md:-mt-10 lg:-mt-20">
          <MapaMexicoEstados />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center mt-12 w-full max-w-4xl">
          <div className="border border-cyan-500/20 rounded-2xl flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm gap-4 p-8">
            <p className="text-gray-400 tracking-wide text-center">
              Estamos conectando con los servidores locales de {paisSeleccionado}...
            </p>
            <span className="text-cyan-500/50 uppercase tracking-widest animate-pulse">
              Módulo ADM1 en Construcción
            </span>
          </div>
        </div>
      )}

      {/* --- BOTÓN DE VOLVER (Abajo al Centro) --- */}
      <div className="z-50 mt-10 mb-6 w-full flex justify-center">
        <Link 
          href="/" 
          // bg-white: Fondo blanco
          // text-[#D4AF37]: Letras color dorado OsorioLabs
          // font-bold: Letras más gruesas para que resalte el dorado
          // hover:bg-[#D4AF37] hover:text-white: Al pasar el mouse se invierten los colores de forma elegante
          className="flex items-center gap-3 bg-white text-[#D4AF37] font-bold rounded-full px-8 py-3.5 transition-all text-sm uppercase tracking-[0.2em] shadow-lg shadow-white/10 hover:bg-[#D4AF37] hover:text-white hover:scale-105 active:scale-95"
        >
          <span className="text-lg">←</span>
          <span>Volver al Mundo</span>
        </Link>
      </div>

    </main>
  );
}