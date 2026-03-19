'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Ruta a tu logo
const RUTA_LOGO = '/logo_vios.jpeg'; 
const NOMBRE_EMPRESA = 'ViOs Code';

export const Navbar = () => {
  // Menú con Emojis
  const menuItems = [
    { name: 'Portal Global / Inicio', emoji: '🌐', href: '#', active: true },
    { name: 'Norte América', emoji: '🗽', href: 'https://virtualuniverseamerica.com' },
    { name: 'Sud América', emoji: '🌴', href: '#', disabled: true },
    { name: 'Europa', emoji: '🏰', href: '#', disabled: true },
    { name: 'Contacto', emoji: '✉️', href: '#vios-contacto' },
  ];

  return (
    // BARRA DERECHA: fixed top-0 right-0
    // COLOR SÓLIDO BLANCO: bg-white (sin transparencias)
    // Le di un ancho de w-24 (un poco más ancha) para que tu logo quepa perfecto.
    <nav className="fixed top-0 right-0 h-screen w-24 bg-white border-l border-gray-200 py-6 z-[100] flex flex-col items-center shadow-2xl pointer-events-auto">
      
      {/* 1. LOGOTIPO EN LA ESQUINA SUPERIOR DERECHA */}
      <div className="flex items-center justify-center mb-10 px-2 w-full">
        <Link href="/" className="hover:scale-105 transition-transform block">
          {/* Como la barra es blanca, el fondo de tu jpeg se fundirá perfecto */}
          <Image 
            src={RUTA_LOGO}
            alt={`Logotipo de ${NOMBRE_EMPRESA}`}
            width={85} 
            height={85}
            priority 
            className="object-contain"
          />
        </Link>
      </div>

      {/* Separador oscuro sutil */}
      <div className="border-t border-gray-200 mb-8 w-16"></div>

      {/* 2. MENÚ VERTICAL DE EMOJIS */}
      <div className="flex flex-col gap-6 w-full items-center">
        <ul className="flex flex-col gap-6 items-center w-full">
          {menuItems.map((item, index) => (
            <li key={index} className="flex justify-center">
              <Link 
                href={item.href}
                title={item.name} 
                className={`flex items-center justify-center p-3 rounded-2xl text-3xl transition-all duration-300 w-14 h-14 
                  ${item.active 
                    ? 'bg-gray-100 shadow-inner transform scale-110 border border-gray-200' // Gris clarito si es la página actual
                    : item.disabled 
                      ? 'cursor-not-allowed opacity-30 grayscale' // Apagado si no está disponible
                      : 'hover:bg-gray-50 hover:shadow-md hover:scale-110' // Efecto al pasar el mouse
                  }`}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={(e) => item.disabled && e.preventDefault()}
              >
                <span className="flex items-center justify-center leading-none">{item.emoji}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Pie de página pequeño */}
      <div className="mt-auto border-t border-gray-200 pt-4 w-16 text-center">
        <span className="text-[10px] font-bold tracking-widest text-gray-400">VIOS</span>
      </div>

    </nav>
  );
};