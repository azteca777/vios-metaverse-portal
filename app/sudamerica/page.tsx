import Link from 'next/link';

export default function SudamericaPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
      {/* Título brillante */}
      <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
        SUDAMÉRICA
      </h1>
      
      {/* Texto de Próximamente */}
      <p className="text-xl md:text-2xl font-light tracking-widest text-white/70 mb-12 uppercase">
        Próximamente...
      </p>
      
      {/* Botón para regresar al portal principal */}
      <Link 
        href="/"
        className="px-8 py-3 rounded-full border border-white/20 text-white font-light tracking-widest hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300"
      >
        Volver al Portal Global
      </Link>
    </main>
  );
}